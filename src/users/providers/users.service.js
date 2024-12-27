"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
/**
 * Controller class for '/users' API endpoint
 */
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(usersRepository, profileConfiguration, 
        /**
         * Inject UsersCreateMany provider
         */
        usersCreateManyProvider, 
        /**
         * Inject Datasource
         */
        dataSource, 
        /**
         * Inject createUserProvider
         */
        createUserProvider, 
        /**
         * Inject findOneUserByEmailProvider
         */
        findOneUserByEmailProvider, 
        /**
         * Inject findOneByGoogleIdProvier
         */
        findOneByGoogleIdProvider, 
        /**
         * Inject createGoogleUserProvider
         */
        createGoogleUserProvider) {
            this.usersRepository = usersRepository;
            this.profileConfiguration = profileConfiguration;
            this.usersCreateManyProvider = usersCreateManyProvider;
            this.dataSource = dataSource;
            this.createUserProvider = createUserProvider;
            this.findOneUserByEmailProvider = findOneUserByEmailProvider;
            this.findOneByGoogleIdProvider = findOneByGoogleIdProvider;
            this.createGoogleUserProvider = createGoogleUserProvider;
        }
        UsersService_1.prototype.createUser = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.createUserProvider.createUser(createUserDto)];
                });
            });
        };
        /**
         * Public method responsible for handling GET request for '/users' endpoint
         */
        UsersService_1.prototype.findAll = function (getUseresParamDto, limit, page) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, users, total, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.usersRepository.findAndCount({
                                    take: limit, // Количество записей на одной странице
                                    skip: (page - 1) * limit, // Пропускаем записи на основе текущей страницы
                                    where: getUseresParamDto, // Фильтры из DTO, если они заданы
                                })];
                        case 1:
                            _a = _b.sent(), users = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: users,
                                    total: total, // Общее количество записей
                                    limit: limit, // Лимит записей на странице
                                    page: page,
                                }];
                        case 2:
                            error_1 = _b.sent();
                            // Обработка ошибок при выполнении запроса
                            throw new common_1.RequestTimeoutException('Unable to fetch users at the moment. Please try again later.');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Public method used to find one user using the ID of the user
         */
        UsersService_1.prototype.findOneById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = undefined;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.usersRepository.findOneBy({
                                    id: id,
                                })];
                        case 2:
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            throw new common_1.RequestTimeoutException('Unable to process your request at the moment please try later', {
                                description: 'Error connecting to the the datbase',
                            });
                        case 4:
                            /**
                             * Handle the user does not exist
                             */
                            if (!user) {
                                throw new common_1.BadRequestException('The user id does not exist');
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UsersService_1.prototype.createMany = function (createUsersDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersCreateManyProvider.createMany(createUsersDto)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.findOneByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOneUserByEmailProvider.findOneByEmail(email)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.findOneByGoogleId = function (googleId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOneByGoogleIdProvider.findOneByGoogleId(googleId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.createGoogleUser = function (googleUser) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.createGoogleUserProvider.createGoogleUser(googleUser)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UsersService_1.prototype.updateUser = function (patchUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { id: patchUserDto.id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('Пользователь не найден');
                            }
                            Object.assign(user, patchUserDto);
                            return [2 /*return*/, this.usersRepository.save(user)];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;