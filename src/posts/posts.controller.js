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
exports.PostsController = void 0;
var common_1 = require("@nestjs/common");
var public_decorator_1 = require("../auth/decorators/public.decorator");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var userRole_enum_1 = require("../users/enums/userRole.enum");
var swagger_1 = require("@nestjs/swagger");
var PostsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Посты'), (0, common_1.Controller)('posts')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAll_decorators;
    var _create_decorators;
    var _update_decorators;
    var _remove_decorators;
    var PostsController = _classThis = /** @class */ (function () {
        function PostsController_1(postsService) {
            this.postsService = (__runInitializers(this, _instanceExtraInitializers), postsService);
        }
        PostsController_1.prototype.getAll = function () {
            return this.postsService.findAll();
        };
        PostsController_1.prototype.create = function (createPostDto) {
            return this.postsService.create(createPostDto);
        };
        PostsController_1.prototype.update = function (id, updatePostDto) {
            return this.postsService.update(id, updatePostDto);
        };
        PostsController_1.prototype.remove = function (id) {
            return this.postsService.remove(id);
        };
        return PostsController_1;
    }());
    __setFunctionName(_classThis, "PostsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAll_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Получить все посты (доступно всем)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Список постов успешно получен' }), (0, public_decorator_1.Public)(), (0, common_1.Get)()];
        _create_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Создать новый пост (только админ)' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Пост успешно создан' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Post)()];
        _update_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Обновить пост (только админ)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Пост успешно обновлён' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Patch)(':id')];
        _remove_decorators = [(0, swagger_1.ApiOperation)({ summary: 'Удалить пост (только админ)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Пост успешно удалён' }), (0, roles_decorator_1.Roles)(userRole_enum_1.userRole.ADMIN), (0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false, access: { has: function (obj) { return "getAll" in obj; }, get: function (obj) { return obj.getAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PostsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PostsController = _classThis;
}();
exports.PostsController = PostsController;
