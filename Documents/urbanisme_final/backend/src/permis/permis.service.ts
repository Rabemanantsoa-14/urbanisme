import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermiDto } from './dto/create-permi.dto';
import { UpdatePermiDto } from './dto/update-permi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permi } from './entities/permi.entity';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class PermisService {
  constructor(
    @InjectRepository(Permi)
    private readonly permiRepository: Repository<Permi>,
    private readonly notificationService: NotificationService
  ){
   
  }

  //creer un permis de construction
  async create(createPermiDto: CreatePermiDto) {
    const permi = this.permiRepository.create(createPermiDto);
    const saved = await this.permiRepository.save(permi)

    await this.notificationService.notifyAdminOnNewPermis(saved)

    return {message: "enregistrement avec succées et notification envoyée"}
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

  async update(id: number, updatePermiDto: UpdatePermiDto): Promise<Permi> {
    const permi = await this.permiRepository.findOneBy({ id });

    if (!permi) {
      throw new NotFoundException('Permis introuvable');
    }

    Object.assign(permi, updatePermiDto);

    const updatedPermi = await this.permiRepository.save(permi);

    await this.notificationService.notifyClientOnPermisUpdate(updatedPermi, updatedPermi.statut);

    return updatedPermi;
  }

  async getStatusPermi(statut: string): Promise<number> {
    return this.permiRepository.count({
      where: { statut },
    })
  }

  async getPermi() {
    return this.permiRepository.count()
  }


  async remove(id: number) {
    const permi = await this.findOne(id)

     if(! permi){
      throw new NotFoundException()
    }

    return await this.permiRepository.delete(permi)

  }
}
