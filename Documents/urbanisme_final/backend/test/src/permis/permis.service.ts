import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermiDto } from './dto/create-permi.dto';
import { UpdatePermiDto } from './dto/update-permi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permi } from './entities/permi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisService {
  constructor(
    @InjectRepository(Permi)
    private readonly permiRepository: Repository<Permi>
  ){
   
  }

  //creer un permis de construction
  async create(createPermiDto: CreatePermiDto) {
    const permi = this.permiRepository.create(createPermiDto);
    await this.permiRepository.save(permi)

     return {message: "enregistrement avec succées"}
  }


  async findAll() {
    return this.permiRepository.find()
  }

  async findOne(id_utilisateur: number) {
    return await this.permiRepository.find({
      where: { id_utilisateur },
      select: {
        piece_joint: true,
        permi: true,
        statut: true,
      }
    })
  }

  async findAllWithUsers() {
  return await this.permiRepository
    .createQueryBuilder("permi")
    // Ici on fait un JOIN manuel sur la table 'users' (table et colonnes)
    .leftJoin("users", "user", "user.id = permi.id_utilisateur")
    .select([
      "permi.piece_joint",
      "permi.permi",
      "permi.statut",
      "user.id",
      "user.nom",
      "user.prenom",
      "user.adresse",
      "user.email",
      "user.telephone",
      "user.cin"
    ])
    .getRawMany(); // getRawMany car on récupère des champs de plusieurs tables
}




  async update(id: number, updatePermiDto: UpdatePermiDto) {
    const permi = await this.permiRepository.findOneBy({id})

    if(!permi)
      return{message: 'permi introvable'}

    Object.assign(permi, updatePermiDto )

    const updatedPermi = await this.permiRepository.save(permi)

    return {
      message: 'Modification avec succès',
      user: updatedPermi,
    }
  }

  async remove(id: number) {
    const permi = await this.findOne(id)

     if(! permi){
      throw new NotFoundException()
    }

    return await this.permiRepository.delete(permi)

  }
}
