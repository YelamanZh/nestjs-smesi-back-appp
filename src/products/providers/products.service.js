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
exports.ProductsService = void 0;
var common_1 = require("@nestjs/common");
var AWS = require("aws-sdk");
var ProductsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductsService = _classThis = /** @class */ (function () {
        function ProductsService_1(productsRepository, categoriesRepository) {
            this.productsRepository = productsRepository;
            this.categoriesRepository = categoriesRepository;
            this.s3 = new AWS.S3({
                region: process.env.AWS_REGION,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            });
        }
        ProductsService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.productsRepository.find({ relations: ['category'] })];
                });
            });
        };
        ProductsService_1.prototype.getProductsByCategory = function (categoryId) {
            return __awaiter(this, void 0, void 0, function () {
                var category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.categoriesRepository.findOne({ where: { id: categoryId } })];
                        case 1:
                            category = _a.sent();
                            if (!category) {
                                throw new common_1.NotFoundException("\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0441 ID ".concat(categoryId, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"));
                            }
                            return [2 /*return*/, this.productsRepository.find({
                                    where: { category: { id: categoryId } },
                                    relations: ['category'],
                                })];
                    }
                });
            });
        };
        ProductsService_1.prototype.createProduct = function (createProductDto, file) {
            return __awaiter(this, void 0, void 0, function () {
                var categoryId, productData, category, imageUrl, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            categoryId = createProductDto.categoryId, productData = __rest(createProductDto, ["categoryId"]);
                            return [4 /*yield*/, this.categoriesRepository.findOne({ where: { id: categoryId } })];
                        case 1:
                            category = _a.sent();
                            if (!category) {
                                throw new common_1.NotFoundException("\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0441 ID ".concat(categoryId, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"));
                            }
                            if (!file) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.uploadImageToS3(file)];
                        case 2:
                            imageUrl = _a.sent(); // Загрузка изображения в S3
                            _a.label = 3;
                        case 3:
                            product = this.productsRepository.create(__assign(__assign({}, productData), { imageUrl: imageUrl, category: category }));
                            return [2 /*return*/, this.productsRepository.save(product)];
                    }
                });
            });
        };
        ProductsService_1.prototype.update = function (id, updateProductDto, file) {
            return __awaiter(this, void 0, void 0, function () {
                var product, categoryId, specifications, productData, category, imageUrl, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.productsRepository.findOne({ where: { id: id } })];
                        case 1:
                            product = _b.sent();
                            if (!product) {
                                throw new common_1.NotFoundException('Продукт не найден');
                            }
                            categoryId = updateProductDto.categoryId, specifications = updateProductDto.specifications, productData = __rest(updateProductDto, ["categoryId", "specifications"]);
                            return [4 /*yield*/, this.categoriesRepository.findOne({ where: { id: categoryId } })];
                        case 2:
                            category = _b.sent();
                            if (!category) {
                                throw new common_1.NotFoundException('Категория не найдена');
                            }
                            if (!file) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.uploadImageToS3(file)];
                        case 3:
                            _a = _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _a = product.imageUrl;
                            _b.label = 5;
                        case 5:
                            imageUrl = _a;
                            Object.assign(product, __assign(__assign({}, productData), { specifications: specifications, imageUrl: imageUrl, category: category }));
                            return [2 /*return*/, this.productsRepository.save(product)];
                    }
                });
            });
        };
        ProductsService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.productsRepository.findOne({ where: { id: id } })];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                throw new common_1.NotFoundException('Продукт не найден');
                            }
                            return [4 /*yield*/, this.productsRepository.remove(product)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProductsService_1.prototype.uploadImageToS3 = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                var params, Location;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = {
                                Bucket: process.env.AWS_S3_BUCKET_NAME || 'your-default-bucket-name',
                                Key: "".concat(Date.now(), "-").concat(file.originalname),
                                Body: file.buffer,
                                ContentType: file.mimetype,
                                ACL: 'public-read',
                            };
                            return [4 /*yield*/, this.s3.upload(params).promise()];
                        case 1:
                            Location = (_a.sent()).Location;
                            return [2 /*return*/, Location];
                    }
                });
            });
        };
        return ProductsService_1;
    }());
    __setFunctionName(_classThis, "ProductsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductsService = _classThis;
}();
exports.ProductsService = ProductsService;