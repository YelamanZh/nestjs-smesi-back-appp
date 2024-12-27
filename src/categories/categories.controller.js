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
exports.CategoriesController = void 0;
var common_1 = require("@nestjs/common");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var userRole_enum_1 = require("../users/enums/userRole.enum");
var public_decorator_1 = require("../auth/decorators/public.decorator");
var swagger_1 = require("@nestjs/swagger");
var CategoriesController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Категории'), (0, common_1.Controller)('categories')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAllCategories_decorators;
    var _createCategory_decorators;
    var _updateCategory_decorators;
    var _deleteCategory_decorators;
    var CategoriesController = _classThis = /** @class */ (function () {
        function CategoriesController_1(categoriesService) {
            this.categoriesService = (__runInitializers(this, _instanceExtraInitializers), categoriesService);
        }
        CategoriesController_1.prototype.getAllCategories = function () {
            return this.categoriesService.findAll();
        };
        CategoriesController_1.prototype.createCategory = function (createCategoryDto) {
            return this.categoriesService.create(createCategoryDto);
        };
        CategoriesController_1.prototype.updateCategory = function (id, updateCategoryDto) {
            return this.categoriesService.update(id, updateCategoryDto);
        };
        CategoriesController_1.prototype.deleteCategory = function (id) {
            return this.categoriesService.remove(id);
        };
        return CategoriesController_1;
    }());
    __setFunctionName(_classThis, "CategoriesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllCategories_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Получить все категории (доступно всем)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Список категорий' }), (0, public_decorator_1.Public)(), (0, common_1.Get)()];
        _createCategory_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Создать категорию (только админ)' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Категория успешно создана' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Post)()];
        _updateCategory_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Обновить категорию (только админ)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Категория успешно обновлена' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Patch)(':id')];
        _deleteCategory_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Удалить категорию (только админ)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Категория успешно удалена' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _getAllCategories_decorators, { kind: "method", name: "getAllCategories", static: false, private: false, access: { has: function (obj) { return "getAllCategories" in obj; }, get: function (obj) { return obj.getAllCategories; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createCategory_decorators, { kind: "method", name: "createCategory", static: false, private: false, access: { has: function (obj) { return "createCategory" in obj; }, get: function (obj) { return obj.createCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateCategory_decorators, { kind: "method", name: "updateCategory", static: false, private: false, access: { has: function (obj) { return "updateCategory" in obj; }, get: function (obj) { return obj.updateCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteCategory_decorators, { kind: "method", name: "deleteCategory", static: false, private: false, access: { has: function (obj) { return "deleteCategory" in obj; }, get: function (obj) { return obj.deleteCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CategoriesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CategoriesController = _classThis;
}();
exports.CategoriesController = CategoriesController;
