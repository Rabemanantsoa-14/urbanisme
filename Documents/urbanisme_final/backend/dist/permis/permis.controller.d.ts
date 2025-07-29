import { PermisService } from './permis.service';
import { CreatePermiDto } from './dto/create-permi.dto';
import { UpdatePermiDto } from './dto/update-permi.dto';
export declare class PermisController {
    private readonly permisService;
    constructor(permisService: PermisService);
    create(createPermiDto: CreatePermiDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<any[]>;
    getPermi(): Promise<number>;
    getPermiByStatut(statut: string): Promise<number>;
    update(id: string, updatePermiDto: UpdatePermiDto): Promise<import("./entities/permi.entity").Permi>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
