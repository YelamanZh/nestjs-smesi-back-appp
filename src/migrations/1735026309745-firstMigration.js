"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstMigration1735026309745 = void 0;
var FirstMigration1735026309745 = /** @class */ (function () {
    function FirstMigration1735026309745() {
        this.name = 'FirstMigration1735026309745';
    }
    FirstMigration1735026309745.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"categories\" (\"id\" SERIAL NOT NULL, \"name\" character varying(96) NOT NULL, \"description\" text, CONSTRAINT \"PK_24dbc6126a28ff948da33e97d3b\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"products_status_enum\" AS ENUM('\u043D\u043E\u0432\u0438\u043D\u043A\u0430', '\u0430\u043A\u0446\u0438\u044F', '\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C', '\u0445\u0438\u0442', '\u043E\u0431\u044B\u0447\u043D\u044B\u0439')")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"products\" (\"id\" SERIAL NOT NULL, \"name\" character varying(255) NOT NULL, \"imageUrl\" character varying, \"description\" text, \"inStock\" boolean NOT NULL DEFAULT true, \"status\" \"public\".\"products_status_enum\" NOT NULL DEFAULT '\u043E\u0431\u044B\u0447\u043D\u044B\u0439', \"specifications\" jsonb, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"category_id\" integer, CONSTRAINT \"PK_0806c755e0aca124e67c0cf6d7d\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"posts\" (\"id\" SERIAL NOT NULL, \"title\" character varying(255) NOT NULL, \"content\" text NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"images\" jsonb, CONSTRAINT \"PK_2829ac61eff60fcec60d7274b9e\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"comments\" (\"id\" SERIAL NOT NULL, \"content\" text NOT NULL, \"username\" character varying(96) NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"productId\" integer, \"postId\" integer, \"userId\" integer, CONSTRAINT \"PK_8bf68bc960f2b69e818bdb90dcb\" PRIMARY KEY (\"id\"))")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"cart_items\" (\"id\" SERIAL NOT NULL, \"productId\" integer NOT NULL, \"quantity\" integer NOT NULL, \"userId\" integer, CONSTRAINT \"PK_6fccf5ec03c172d27a28a82928b\" PRIMARY KEY (\"id\"))")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"user_role_enum\" AS ENUM('admin', 'user')")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"user\" (\"id\" SERIAL NOT NULL, \"firstName\" character varying(96) NOT NULL, \"lastName\" character varying(96), \"email\" character varying(96) NOT NULL, \"password\" character varying(96), \"googleId\" character varying, \"role\" \"public\".\"user_role_enum\" NOT NULL DEFAULT 'user', CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"upload_type_enum\" AS ENUM('image')")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"upload\" (\"id\" SERIAL NOT NULL, \"name\" character varying(1024) NOT NULL, \"path\" character varying(1024) NOT NULL, \"type\" \"public\".\"upload_type_enum\" NOT NULL DEFAULT 'image', \"mime\" character varying(128) NOT NULL, \"size\" character varying(1024) NOT NULL, \"createDate\" TIMESTAMP NOT NULL DEFAULT now(), \"updateDate\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_1fe8db121b3de4ddfa677fc51f3\" PRIMARY KEY (\"id\"))")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"tag\" (\"id\" SERIAL NOT NULL, \"name\" character varying(256) NOT NULL, \"slug\" character varying(256) NOT NULL, \"description\" text, \"schema\" text, \"featuredImageUrl\" character varying(1024), \"createDate\" TIMESTAMP NOT NULL DEFAULT now(), \"updateDate\" TIMESTAMP NOT NULL DEFAULT now(), \"deletedAt\" TIMESTAMP, CONSTRAINT \"UQ_6a9775008add570dc3e5a0bab7b\" UNIQUE (\"name\"), CONSTRAINT \"UQ_3413aed3ecde54f832c4f44f045\" UNIQUE (\"slug\"), CONSTRAINT \"PK_8e4052373c579afc1471f526760\" PRIMARY KEY (\"id\"))")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"meta_option\" (\"id\" SERIAL NOT NULL, \"metaValue\" json NOT NULL, \"createDate\" TIMESTAMP NOT NULL DEFAULT now(), \"updateDate\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_59e834d6ba39bd9bd7c99b8805d\" PRIMARY KEY (\"id\"))")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"products\" ADD CONSTRAINT \"FK_9a5f6868c96e0069e699f33e124\" FOREIGN KEY (\"category_id\") REFERENCES \"categories\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comments\" ADD CONSTRAINT \"FK_9f8304787dd13d61bc94afd07b0\" FOREIGN KEY (\"productId\") REFERENCES \"products\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comments\" ADD CONSTRAINT \"FK_e44ddaaa6d058cb4092f83ad61f\" FOREIGN KEY (\"postId\") REFERENCES \"posts\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comments\" ADD CONSTRAINT \"FK_7e8d7c49f218ebb14314fdb3749\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"cart_items\" ADD CONSTRAINT \"FK_84e765378a5f03ad9900df3a9ba\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FirstMigration1735026309745.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"cart_items\" DROP CONSTRAINT \"FK_84e765378a5f03ad9900df3a9ba\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comments\" DROP CONSTRAINT \"FK_7e8d7c49f218ebb14314fdb3749\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comments\" DROP CONSTRAINT \"FK_e44ddaaa6d058cb4092f83ad61f\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comments\" DROP CONSTRAINT \"FK_9f8304787dd13d61bc94afd07b0\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"products\" DROP CONSTRAINT \"FK_9a5f6868c96e0069e699f33e124\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"meta_option\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"tag\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"upload\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"upload_type_enum\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"user\"")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"user_role_enum\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"cart_items\"")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"comments\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"posts\"")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"products\"")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"products_status_enum\"")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"categories\"")];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FirstMigration1735026309745;
}());
exports.FirstMigration1735026309745 = FirstMigration1735026309745;
