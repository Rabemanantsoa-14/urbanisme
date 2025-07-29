import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<import("./entities/notification.entity").Notification>;
    findAll(): Promise<import("./entities/notification.entity").Notification[]>;
    findOne(id: string): Promise<import("./entities/notification.entity").Notification>;
    remove(id: string): Promise<void>;
}
