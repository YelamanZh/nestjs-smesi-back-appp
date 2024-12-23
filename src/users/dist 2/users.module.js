"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./providers/users.service");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./user.entity");
var config_1 = require("@nestjs/config");
var users_create_many_provider_1 = require("./providers/users-create-many.provider");
var create_user_provider_1 = require("./providers/create-user.provider");
var profile_config_1 = require("./config/profile.config");
var auth_module_1 = require("src/auth/auth.module");
var find_one_user_by_email_provider_1 = require("./providers/find-one-user-by-email.provider");
var find_one_by_google_id_provider_1 = require("./providers/find-one-by-google-id.provider");
var create_google_user_provider_1 = require("./providers/create-google-user.provider");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        common_1.Module({
            controllers: [users_controller_1.UsersController],
            providers: [
                users_service_1.UsersService,
                users_create_many_provider_1.UsersCreateManyProvider,
                create_user_provider_1.CreateUserProvider,
                find_one_user_by_email_provider_1.FindOneUserByEmailProvider,
                find_one_by_google_id_provider_1.FindOneByGoogleIdProvider,
                create_google_user_provider_1.CreateGoogleUserProvider,
            ],
            imports: [
                common_1.forwardRef(function () { return auth_module_1.AuthModule; }),
                typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
                config_1.ConfigModule.forFeature(profile_config_1["default"]),
            ],
            exports: [users_service_1.UsersService]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
