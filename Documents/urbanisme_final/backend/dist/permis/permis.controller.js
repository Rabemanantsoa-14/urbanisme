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
exports.PermisController = void 0;
const common_1 = require("@nestjs/common");
const permis_service_1 = require("./permis.service");
const create_permi_dto_1 = require("./dto/create-permi.dto");
const update_permi_dto_1 = require("./dto/update-permi.dto");
let PermisController = class PermisController {
    permisService;
    constructor(permisService) {
        this.permisService = permisService;
    }
    create(createPermiDto) {
        return this.permisService.create(createPermiDto);
    }
    async findAll() {
        return await this.permisService.findAllWithUsers();
    }
    async getPermi() {
        return await this.permisService.getPermi();
    }
    async getPermiByStatut(statut) {
        return this.permisService.getStatusPermi(statut);
    }
    update(id, updatePermiDto) {
        return this.permisService.update(+id, updatePermiDto);
    }
    remove(id) {
        return this.permisService.remove(+id);
    }
};
exports.PermisController = PermisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permi_dto_1.CreatePermiDto]),
    __metadata("design:returntype", void 0)
], PermisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/nombre_permi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermisController.prototype, "getPermi", null);
__decorate([
    (0, common_1.Get)('statut/:statut'),
    __param(0, (0, common_1.Param)('statut')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermisController.prototype, "getPermiByStatut", null);
__decorate([
    (0, common_1.Patch)('updatestatut/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permi_dto_1.UpdatePermiDto]),
    __metadata("design:returntype", void 0)
], PermisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermisController.prototype, "remove", null);
exports.PermisController = PermisController = __decorate([
    (0, common_1.Controller)('permis'),
    __metadata("design:paramtypes", [permis_service_1.PermisService])
], PermisController);
//# sourceMappingURL=permis.controller.js.map