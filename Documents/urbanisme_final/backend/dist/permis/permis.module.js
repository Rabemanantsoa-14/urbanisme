"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisModule = void 0;
const common_1 = require("@nestjs/common");
const permis_service_1 = require("./permis.service");
const permis_controller_1 = require("./permis.controller");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const permi_entity_1 = require("./entities/permi.entity");
const notification_module_1 = require("../notification/notification.module");
let PermisModule = class PermisModule {
};
exports.PermisModule = PermisModule;
exports.PermisModule = PermisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([permi_entity_1.Permi]),
            notification_module_1.NotificationModule
        ],
        controllers: [permis_controller_1.PermisController],
        providers: [permis_service_1.PermisService],
    })
], PermisModule);
//# sourceMappingURL=permis.module.js.map