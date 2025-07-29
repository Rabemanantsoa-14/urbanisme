import { CreatePermiDto } from './dto/create-permi.dto';
import { UpdatePermiDto } from './dto/update-permi.dto';
import { Permi } from './entities/permi.entity';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';
export declare class PermisService {
    private readonly permiRepository;
    private readonly notificationService;
    constructor(permiRepository: Repository<Permi>, notificationService: NotificationService);
    create(createPermiDto: CreatePermiDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<Permi[]>;
    findOne(id_utilisateur: number): Promise<Permi[]>;
    findAllWithUsers(): Promise<any[]>;
    update(id: number, updatePermiDto: UpdatePermiDto): Promise<Permi>;
    getStatusPermi(statut: string): Promise<number>;
    getPermi(): Promise<number>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
