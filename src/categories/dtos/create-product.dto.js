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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var product_entity_1 = require("../product.entity");
var CreateProductDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _inStock_decorators;
    var _inStock_initializers = [];
    var _inStock_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _specifications_decorators;
    var _specifications_initializers = [];
    var _specifications_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _file_decorators;
    var _file_initializers = [];
    var _file_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProductDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.inStock = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _inStock_initializers, void 0));
                this.status = (__runInitializers(this, _inStock_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.specifications = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _specifications_initializers, void 0));
                this.categoryId = (__runInitializers(this, _specifications_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
                this.file = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _file_initializers, void 0));
                __runInitializers(this, _file_extraInitializers);
            }
            return CreateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ description: 'Название продукта', example: 'Цемент' }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Описание продукта',
                    example: 'Качественный цемент для строительства',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _inStock_decorators = [(0, swagger_1.ApiProperty)({ description: 'Есть ли в наличии', example: true }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsBoolean)()];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Статус продукта',
                    example: 'новинка',
                    enum: product_entity_1.ProductStatus,
                }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsEnum)(product_entity_1.ProductStatus)];
            _specifications_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Характеристики продукта (JSON-объект)',
                    type: 'object',
                    properties: {
                        color: { type: 'string', example: 'белый' },
                        waterproof: { type: 'boolean', example: true },
                        maxGrainSize: { type: 'string', example: '2.5 мм' },
                        mixingRatio: { type: 'string', example: '1:3' },
                        materialConsumption: { type: 'string', example: '10 кг/м²' },
                        mobilityClass: { type: 'string', example: 'М100' },
                        applicationTemperature: { type: 'string', example: 'от +5 до +35' },
                        solutionViability: { type: 'string', example: '2 часа' },
                        materialClass: { type: 'string', example: 'Класс 1' },
                        effectiveActivity: { type: 'string', example: '50 Бк/кг' },
                        adhesionStrength: { type: 'string', example: '1.2 МПа' },
                        compressiveStrength: { type: 'string', example: '30 МПа' },
                        strengthGrade: { type: 'string', example: 'М300' },
                        dryingTime: { type: 'string', example: '24 часа' },
                        frostResistance: { type: 'string', example: '50 циклов' },
                    },
                    additionalProperties: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _categoryId_decorators = [(0, swagger_1.ApiProperty)({ description: 'ID категории', example: 1 }), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsNumber)()];
            _file_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Изображение продукта',
                    type: 'string',
                    format: 'binary',
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _inStock_decorators, { kind: "field", name: "inStock", static: false, private: false, access: { has: function (obj) { return "inStock" in obj; }, get: function (obj) { return obj.inStock; }, set: function (obj, value) { obj.inStock = value; } }, metadata: _metadata }, _inStock_initializers, _inStock_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _specifications_decorators, { kind: "field", name: "specifications", static: false, private: false, access: { has: function (obj) { return "specifications" in obj; }, get: function (obj) { return obj.specifications; }, set: function (obj, value) { obj.specifications = value; } }, metadata: _metadata }, _specifications_initializers, _specifications_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _file_decorators, { kind: "field", name: "file", static: false, private: false, access: { has: function (obj) { return "file" in obj; }, get: function (obj) { return obj.file; }, set: function (obj, value) { obj.file = value; } }, metadata: _metadata }, _file_initializers, _file_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProductDto = CreateProductDto;
