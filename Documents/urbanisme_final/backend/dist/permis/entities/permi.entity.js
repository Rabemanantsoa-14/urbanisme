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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permi = void 0;
const typeorm_1 = require("typeorm");
let Permi = class Permi {
    id;
    piece_joint;
    latitude;
    longitude;
    statut;
    id_utilisateur;
    permi;
};
exports.Permi = Permi;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permi.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Permi.prototype, "piece_joint", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Permi.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Permi.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'en attente' }),
    __metadata("design:type", String)
], Permi.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Permi.prototype, "id_utilisateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Permi.prototype, "permi", void 0);
exports.Permi = Permi = __decorate([
    (0, typeorm_1.Entity)({ name: 'demande_permis' })
], Permi);
//# sourceMappingURL=permi.entity.js.map