import { CreatePermiDto } from './dto/create-permi.dto';
import { UpdatePermiDto } from './dto/update-permi.dto';
import { Permi } from './entities/permi.entity';
import { Repository } from 'typeorm';
export declare class PermisService {
    private readonly permiRepository;
    constructor(permiRepository: Repository<Permi>);
    create(createPermiDto: CreatePermiDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<Permi[]>;
    findOne(id_utilisateur: number): Promise<Permi[]>;
    findAllWithUsers(): Promise<any[]>;
    update(id: number, updatePermiDto: UpdatePermiDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: Permi;
    }>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
