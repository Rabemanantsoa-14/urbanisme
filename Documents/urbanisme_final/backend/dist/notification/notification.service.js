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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const user_entity_1 = require("../user/entities/user.entity");
let NotificationService = class NotificationService {
    notificationRepository;
    userRepository;
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const notification = this.notificationRepository.create(dto);
        return await this.notificationRepository.save(notification);
    }
    async notifyAdminOnNewPermis(permi) {
        const user = await this.userRepository.findOneBy({ id: permi.id_utilisateur });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé pour la demande de permis');
        }
        const contenu = `Nouvelle demande de permis de construction par ${user.nom} ${user.prenom}`;
        const email_destinataire = 'admin@gmail.com';
        const email_envoyeur = user.email;
        const notification = this.notificationRepository.create({
            contenu,
            email_destinataire,
            email_envoyeur,
            id_permis: permi.id,
        });
        await this.notificationRepository.save(notification);
    }
    async notifyClientOnPermisUpdate(permi, statut) {
        const user = await this.userRepository.findOneBy({ id: permi.id_utilisateur });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé pour la notification client');
        }
        let contenu = '';
        if (statut === 'valide') {
            contenu = 'Votre demande de permis a été validée.';
        }
        else if (statut === 'refusé') {
            contenu = 'Votre demande de permis a été refusée.';
        }
        else {
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
    async findAll() {
        return await this.notificationRepository.find();
    }
    async findOne(id) {
        const notif = await this.notificationRepository.findOneBy({ id });
        if (!notif)
            throw new common_1.NotFoundException('Notification non trouvée');
        return notif;
    }
    async remove(id) {
        const notif = await this.findOne(id);
        await this.notificationRepository.remove(notif);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map