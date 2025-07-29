import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from 'src/user/entities/user.entity';
import { Permi } from 'src/permis/entities/permi.entity';
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly userRepository;
    constructor(notificationRepository: Repository<Notification>, userRepository: Repository<User>);
    create(dto: CreateNotificationDto): Promise<Notification>;
    notifyAdminOnNewPermis(permi: Permi): Promise<void>;
    notifyClientOnPermisUpdate(permi: Permi, statut: string): Promise<void>;
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification>;
    remove(id: number): Promise<void>;
}
