import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto'
import * as nodemailer from 'nodemailer'

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private jwtService: JwtService
  ){
    
  }

  //creation d'un utilisateur
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({email: createUserDto.email})

    if (existingUser)
      return{ Message: "L'utilisateur existe déjà" }

    const hashed = await bcrypt.hash(createUserDto.mot_de_passe, 10)

    const user = this.userRepository.create({ 
      ...createUserDto, 
      mot_de_passe: hashed
    })

    await this.userRepository.save(user)

    return {message: 'Enregistrement avec succées'}
  }

  //login
  async login(loginUserDto: LoginUserDto){

    const {identifiant, mot_de_passe} = loginUserDto
    const userExiste = await this.userRepository.findOne
    ({
      where:[
        {email: identifiant},
        {telephone: identifiant }
      ]
    })

    if(!userExiste)
      throw new UnauthorizedException("Identifiant incorrect")

    const match = await bcrypt.compare(mot_de_passe, userExiste.mot_de_passe)
    if(!match)
      throw new UnauthorizedException("mot de passe incorrect")

    const payload = {sub: userExiste.id, email: userExiste.email}
    const token = await this.jwtService.signAsync(payload)

    return {access_token: token}
  }

  //forgot password
 async sendVerificationCode(createUserDto: CreateUserDto) {
    const email = createUserDto.email
    const emailExiste = await this.userRepository.findOneBy({email: createUserDto.email})

    if(!emailExiste)
      return {message: "Email introuvable"}

    const code = Math.floor(100000 + Math.random() * 900000) // 6 chiffres

    emailExiste.code = code.toString()
    emailExiste.codeCreatedAt = new Date()
    await this.userRepository.save(emailExiste)
    
    const token = this.jwtService.sign(
      { emailExiste, code }, 
      { secret: 'JWT_SECRET', expiresIn: '10m' }
    )

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '92a900001@smtp-brevo.com',
        pass: 'DImQjOUr9y4AT0bn',
      },
    })

    await transporter.sendMail({
      from: '"Urbanisme App" <andria.rabemanantsoa@gmail.com>',
      to: email,
      subject: 'Votre code de vérification',
      text: `Voici votre code de vérification : ${code}`,
    })

    return {
      message: 'Code envoyé par e-mail.',
      token, // le token contient le code chiffré
    }
  }

  //resset password
  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.userRepository.findOneBy({ email, code });

    if (!user) {
      throw new UnauthorizedException('Code invalide ou utilisateur introuvable');
    }

    const now = new Date().getTime();
    const codeTimestamp = user.codeCreatedAt?.getTime() ?? 0;
    const expired = now - codeTimestamp > 10 * 60 * 1000;

    if (expired) {
      throw new UnauthorizedException('Code expiré');
    }

    // Met à jour le mot de passe
    user.mot_de_passe = await bcrypt.hash(newPassword, 10);

    await this.userRepository.save(user);

    return { message: 'Mot de passe réinitialisé avec succès.' };
  }



  async findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      return { message: 'Utilisateur introuvable' }
    }

    Object.assign(user, updateUserDto)

    const updatedUser = await this.userRepository.save(user)

    return {
      message: 'Modification avec succès',
      user: updatedUser,
    }
}


  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  
}
