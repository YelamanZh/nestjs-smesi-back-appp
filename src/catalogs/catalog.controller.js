"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var userRole_enum_1 = require("../users/enums/userRole.enum");
var CatalogController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Каталог'), (0, common_1.Controller)('catalog')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createCategory_decorators;
    var _updateCategory_decorators;
    var _deleteCategory_decorators;
    var _createProduct_decorators;
    var _updateProduct_decorators;
    var _deleteProduct_decorators;
    var CatalogController = _classThis = /** @class */ (function () {
        function CatalogController_1(catalogService) {
            this.catalogService = (__runInitializers(this, _instanceExtraInitializers), catalogService);
        }
        CatalogController_1.prototype.createCategory = function (createCategoryDto) {
            return this.catalogService.createCategory(createCategoryDto);
        };
        CatalogController_1.prototype.updateCategory = function (id, updateCategoryDto) {
            return this.catalogService.updateCategory(id, updateCategoryDto);
        };
        CatalogController_1.prototype.deleteCategory = function (id) {
            return this.catalogService.deleteCategory(id);
        };
        CatalogController_1.prototype.createProduct = function (createProductDto, file) {
            return this.catalogService.createProduct(createProductDto, file);
        };
        CatalogController_1.prototype.updateProduct = function (id, updateProductDto, file) {
            return this.catalogService.updateProduct(id, updateProductDto, file);
        };
        CatalogController_1.prototype.deleteProduct = function (id) {
            return this.catalogService.deleteProduct(id);
        };
        return CatalogController_1;
    }());
    __setFunctionName(_classThis, "CatalogController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createCategory_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Создать новую категорию, только админ' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Категория успешно создана.' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Post)('categories')];
        _updateCategory_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Обновить категорию, только админ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Категория успешно обновлена.' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Patch)('categories/:id')];
        _deleteCategory_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Удалить категорию, только админ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Категория успешно удалена.' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Delete)('categories/:id')];
        _createProduct_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Добавить новый продукт, только админ' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Продукт успешно создан.' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Post)('products')];
        _updateProduct_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Обновить продукт, только админ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Продукт успешно обновлён.' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Patch)('products/:id')];
        _deleteProduct_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Удалить продукт, только админ' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Продукт успешно удалён.' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Delete)('products/:id')];
        __esDecorate(_classThis, null, _createCategory_decorators, { kind: "method", name: "createCategory", static: false, private: false, access: { has: function (obj) { return "createCategory" in obj; }, get: function (obj) { return obj.createCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateCategory_decorators, { kind: "method", name: "updateCategory", static: false, private: false, access: { has: function (obj) { return "updateCategory" in obj; }, get: function (obj) { return obj.updateCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteCategory_decorators, { kind: "method", name: "deleteCategory", static: false, private: false, access: { has: function (obj) { return "deleteCategory" in obj; }, get: function (obj) { return obj.deleteCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createProduct_decorators, { kind: "method", name: "createProduct", static: false, private: false, access: { has: function (obj) { return "createProduct" in obj; }, get: function (obj) { return obj.createProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProduct_decorators, { kind: "method", name: "updateProduct", static: false, private: false, access: { has: function (obj) { return "updateProduct" in obj; }, get: function (obj) { return obj.updateProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteProduct_decorators, { kind: "method", name: "deleteProduct", static: false, private: false, access: { has: function (obj) { return "deleteProduct" in obj; }, get: function (obj) { return obj.deleteProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CatalogController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CatalogController = _classThis;
}();
exports.CatalogController = CatalogController;
