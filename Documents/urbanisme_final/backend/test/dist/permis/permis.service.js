"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permi_entity_1 = require("./entities/permi.entity");
const typeorm_2 = require("typeorm");
let PermisService = class PermisService {
    permiRepository;
    constructor(permiRepository) {
        this.permiRepository = permiRepository;
    }
    async create(createPermiDto) {
        const permi = this.permiRepository.create(createPermiDto);
        await this.permiRepository.save(permi);
        return { message: "enregistrement avec succées" };
    }
    async findAll() {
        return this.permiRepository.find();
    }
    async findOne(id_utilisateur) {
        return await this.permiRepository.find({
            where: { id_utilisateur },
            select: {
                piece_joint: true,
                permi: true,
                statut: true,
            }
        });
    }
    async findAllWithUsers() {
        return await this.permiRepository
            .createQueryBuilder("permi")
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
            .getRawMany();
    }
    async update(id, updatePermiDto) {
        const permi = await this.permiRepository.findOneBy({ id });
        if (!permi)
            return { message: 'permi introvable' };
        Object.assign(permi, updatePermiDto);
        const updatedPermi = await this.permiRepository.save(permi);
        return {
            message: 'Modification avec succès',
            user: updatedPermi,
        };
    }
    async remove(id) {
        const permi = await this.findOne(id);
        if (!permi) {
            throw new common_1.NotFoundException();
        }
        return await this.permiRepository.delete(permi);
    }
};
exports.PermisService = PermisService;
exports.PermisService = PermisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permi_entity_1.Permi)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermisService);
//# sourceMappingURL=permis.service.js.map