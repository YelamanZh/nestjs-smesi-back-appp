"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var userRole_enum_1 = require("./enums/userRole.enum");
var class_transformer_1 = require("class-transformer");
var comment_entity_1 = require("src/comments/comment.entity");
// src/users/user.entity.ts
var cart_entity_1 = require("src/cart/cart.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 96,
            nullable: false
        })
    ], User.prototype, "firstName");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 96,
            nullable: true
        })
    ], User.prototype, "lastName");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 96,
            nullable: false,
            unique: true
        })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 96,
            nullable: true
        }),
        class_transformer_1.Exclude()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            nullable: true
        }),
        class_transformer_1.Exclude()
    ], User.prototype, "googleId");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": userRole_enum_1.userRole,
            "default": userRole_enum_1.userRole.USER
        })
    ], User.prototype, "role");
    __decorate([
        typeorm_1.OneToMany(function () { return comment_entity_1.Comment; }, function (comment) { return comment.user; })
    ], User.prototype, "comments");
    __decorate([
        typeorm_1.OneToMany(function () { return cart_entity_1.CartItem; }, function (cartItem) { return cartItem.user; })
    ], User.prototype, "cartItems");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
