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
exports.UpdatePostsAndProducts1734890170059 = void 0;
var UpdatePostsAndProducts1734890170059 = /** @class */ (function () {
    function UpdatePostsAndProducts1734890170059() {
        this.name = 'UpdatePostsAndProducts1734890170059';
    }
    UpdatePostsAndProducts1734890170059.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comment\" DROP CONSTRAINT \"FK_94a85bb16d24033a2afdd5df060\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"public\".\"products_status_enum\" AS ENUM('\u043D\u043E\u0432\u0438\u043D\u043A\u0430', '\u0430\u043A\u0446\u0438\u044F', '\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C', '\u0445\u0438\u0442', '\u043E\u0431\u044B\u0447\u043D\u044B\u0439')")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"products\" (\"id\" SERIAL NOT NULL, \"name\" character varying(255) NOT NULL, \"description\" text NOT NULL, \"isAvailable\" boolean NOT NULL DEFAULT true, \"status\" \"public\".\"products_status_enum\" NOT NULL DEFAULT '\u043E\u0431\u044B\u0447\u043D\u044B\u0439', \"price\" numeric(10,2) NOT NULL, \"color\" character varying, \"waterResistance\" character varying, \"maxAggregateSize\" character varying, \"mixingRatio\" character varying, \"materialConsumption\" character varying, \"mobilityGrade\" character varying, \"applicationTemperature\" character varying, \"solutionLife\" character varying, \"materialClass\" character varying, \"specificEffectiveActivity\" character varying, \"adhesionStrength\" character varying, \"compressiveStrength\" character varying, \"strengthGrade\" character varying, \"dryingTime\" character varying, \"frostResistanceGrade\" character varying, CONSTRAINT \"PK_0806c755e0aca124e67c0cf6d7d\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comment\" DROP COLUMN \"postId\"")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UpdatePostsAndProducts1734890170059.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comment\" ADD \"postId\" integer")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"products\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"public\".\"products_status_enum\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"comment\" ADD CONSTRAINT \"FK_94a85bb16d24033a2afdd5df060\" FOREIGN KEY (\"postId\") REFERENCES \"post\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UpdatePostsAndProducts1734890170059;
}());
exports.UpdatePostsAndProducts1734890170059 = UpdatePostsAndProducts1734890170059;
