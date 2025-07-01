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
exports.Building = void 0;
// src/entities/building.entity.ts
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let Building = class Building extends base_entity_1.BaseEntity {
};
exports.Building = Building;
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Building.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Building.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'point', nullable: true }),
    (0, typeorm_1.Index)({ spatial: true }),
    __metadata("design:type", String)
], Building.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Building.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_email', length: 100, nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_phone', length: 20, nullable: true }),
    __metadata("design:type", String)
], Building.prototype, "contactPhone", void 0);
exports.Building = Building = __decorate([
    (0, typeorm_1.Entity)('buildings')
], Building);
