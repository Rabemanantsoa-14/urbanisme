import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { User } from 'src/user/entities/user.entity';
import { Permi } from 'src/permis/entities/permi.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //  Créer une notification générique (appelé manuellement ou par le service Permis)
  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create(dto);
    return await this.notificationRepository.save(notification);
  }

  //  Notification automatique à l'admin à la création d'une nouvelle demande
  async notifyAdminOnNewPermis(permi: Permi): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: permi.id_utilisateur });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé pour la demande de permis');
    }

    const contenu = `Nouvelle demande de permis de construction par ${user.nom} ${user.prenom}`;
    const email_destinataire = 'admin@gmail.com'; // Email fixe de l'admin
    const email_envoyeur = user.email;

    const notification = this.notificationRepository.create({
      contenu,
      email_destinataire,
      email_envoyeur,
      id_permis: permi.id,
    });

    await this.notificationRepository.save(notification);
  }

  // Notification au client (utilisé quand un permis est validé ou refusé)
  async notifyClientOnPermisUpdate(permi: Permi, statut: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: permi.id_utilisateur });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé pour la notification client');
    }

    let contenu = '';
    if (statut === 'valide') {
      contenu = 'Votre demande de permis a été validée.';
    } else if (statut === 'refusé') {
      contenu = 'Votre demande de permis a été refusée.';
    } else {
      contenu = `Votre demande de permis est désormais : ${statut}`;
    }

    const notification = this.notificationRepository.create({
      contenu,
      email_destinataire: user.email,
      email_envoyeur: 'admin@gmail.com',
      id_permis: permi.id,
    });

    await this.notificationRepository.save(notification);
  }

  // Liste de toutes les notifications
  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find();
  }

  // Une seule notification par id
  async findOne(id: number): Promise<Notification> {
    const notif = await this.notificationRepository.findOneBy({ id });
    if (!notif) throw new NotFoundException('Notification non trouvée');
    return notif;
  }
  
  // Suppression
  async remove(id: number): Promise<void> {
    const notif = await this.findOne(id);
    await this.notificationRepository.remove(notif);
  }
}
