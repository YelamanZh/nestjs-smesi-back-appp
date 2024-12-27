"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
var common_1 = require("@nestjs/common");
var AWS = require("aws-sdk");
var path = require("path");
var uuid_1 = require("uuid");
var CatalogService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CatalogService = _classThis = /** @class */ (function () {
        function CatalogService_1(categoryRepository, productRepository) {
            this.categoryRepository = categoryRepository;
            this.productRepository = productRepository;
            this.s3 = new AWS.S3({
                region: process.env.AWS_REGION,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });
        }
        // Создание категории
        CatalogService_1.prototype.createCategory = function (createCategoryDto) {
            return __awaiter(this, void 0, void 0, function () {
                var category;
                return __generator(this, function (_a) {
                    category = this.categoryRepository.create(createCategoryDto);
                    return [2 /*return*/, this.categoryRepository.save(category)];
                });
            });
        };
        // Обновление категории
        CatalogService_1.prototype.updateCategory = function (id, updateCategoryDto) {
            return __awaiter(this, void 0, void 0, function () {
                var category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.categoryRepository.findOneBy({ id: id })];
                        case 1:
                            category = _a.sent();
                            if (!category) {
                                throw new common_1.NotFoundException('Категория не найдена');
                            }
                            Object.assign(category, updateCategoryDto);
                            return [2 /*return*/, this.categoryRepository.save(category)];
                    }
                });
            });
        };
        // Удаление категории
        CatalogService_1.prototype.deleteCategory = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.categoryRepository.findOneBy({ id: id })];
                        case 1:
                            category = _a.sent();
                            if (!category) {
                                throw new common_1.NotFoundException('Категория не найдена');
                            }
                            return [4 /*yield*/, this.categoryRepository.remove(category)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Создание продукта
        CatalogService_1.prototype.createProduct = function (createProductDto, file) {
            return __awaiter(this, void 0, void 0, function () {
                var categoryId, specifications, productData, category, parsedSpecifications, imageUrl, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            categoryId = createProductDto.categoryId, specifications = createProductDto.specifications, productData = __rest(createProductDto, ["categoryId", "specifications"]);
                            return [4 /*yield*/, this.categoryRepository.findOne({ where: { id: categoryId } })];
                        case 1:
                            category = _a.sent();
                            if (!category) {
                                throw new common_1.NotFoundException('Категория не найдена');
                            }
                            if (specifications && typeof specifications === 'string') {
                                try {
                                    parsedSpecifications = JSON.parse(specifications);
                                }
                                catch (error) {
                                    throw new common_1.BadRequestException('Неверный формат спецификаций');
                                }
                            }
                            return [4 /*yield*/, this.uploadImageToS3(file)];
                        case 2:
                            imageUrl = _a.sent();
                            product = this.productRepository.create(__assign(__assign({}, productData), { specifications: parsedSpecifications, imageUrl: imageUrl, category: category }));
                            return [2 /*return*/, this.productRepository.save(product)];
                    }
                });
            });
        };
        // Обновление продукта
        CatalogService_1.prototype.updateProduct = function (id, updateProductDto, file) {
            return __awaiter(this, void 0, void 0, function () {
                var categoryId, specifications, productData, product, category, parsedSpecifications, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            categoryId = updateProductDto.categoryId, specifications = updateProductDto.specifications, productData = __rest(updateProductDto, ["categoryId", "specifications"]);
                            return [4 /*yield*/, this.productRepository.findOne({ where: { id: id } })];
                        case 1:
                            product = _b.sent();
                            if (!product) {
                                throw new common_1.NotFoundException('Продукт не найден');
                            }
                            if (!categoryId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.categoryRepository.findOne({ where: { id: categoryId } })];
                        case 2:
                            category = _b.sent();
                            if (!category) {
                                throw new common_1.NotFoundException('Категория не найдена');
                            }
                            product.category = category;
                            _b.label = 3;
                        case 3:
                            if (specifications && typeof specifications === 'string') {
                                try {
                                    parsedSpecifications = JSON.parse(specifications);
                                }
                                catch (error) {
                                    throw new common_1.BadRequestException('Неверный формат спецификаций');
                                }
                            }
                            else if (specifications) {
                                parsedSpecifications = specifications;
                            }
                            if (!file) return [3 /*break*/, 5];
                            _a = product;
                            return [4 /*yield*/, this.uploadImageToS3(file)];
                        case 4:
                            _a.imageUrl = _b.sent();
                            _b.label = 5;
                        case 5:
                            Object.assign(product, productData);
                            product.specifications = parsedSpecifications;
                            return [2 /*return*/, this.productRepository.save(product)];
                    }
                });
            });
        };
        // Удаление продукта
        CatalogService_1.prototype.deleteProduct = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productRepository.findOneBy({ id: id })];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                throw new common_1.NotFoundException('Продукт не найден');
                            }
                            return [4 /*yield*/, this.productRepository.remove(product)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Загрузка изображения в S3
        CatalogService_1.prototype.uploadImageToS3 = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var bucketName, key, Location;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;
                            if (!bucketName) {
                                throw new Error('S3 Bucket name not defined in environment variables');
                            }
                            key = "products/".concat((0, uuid_1.v4)()).concat(path.extname(file.originalname));
                            return [4 /*yield*/, this.s3
                                    .upload({
                                    Bucket: bucketName,
                                    Key: key,
                                    Body: file.buffer,
                                    ContentType: file.mimetype,
                                    ACL: 'public-read',
                                })
                                    .promise()];
                        case 1:
                            Location = (_a.sent()).Location;
                            return [2 /*return*/, Location];
                    }
                });
            });
        };
        return CatalogService_1;
    }());
    __setFunctionName(_classThis, "CatalogService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CatalogService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CatalogService = _classThis;
}();
exports.CatalogService = CatalogService;
