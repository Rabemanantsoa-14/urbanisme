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
    findOne(id: string): Promise<import("./entities/permi.entity").Permi[]>;
    update(id: string, updatePermiDto: UpdatePermiDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("./entities/permi.entity").Permi;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
