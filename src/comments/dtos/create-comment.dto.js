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
exports.CreateCommentDto = void 0;
var class_validator_1 = require("class-validator");
var CreateCommentDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _postId_decorators;
    var _postId_initializers = [];
    var _postId_extraInitializers = [];
    var _parentCommentId_decorators;
    var _parentCommentId_initializers = [];
    var _parentCommentId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateCommentDto() {
                this.content = __runInitializers(this, _content_initializers, void 0); // Текст комментария
                this.productId = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _productId_initializers, void 0)); // ID продукта (если комментарий к продукту)
                this.postId = (__runInitializers(this, _productId_extraInitializers), __runInitializers(this, _postId_initializers, void 0)); // ID поста (если комментарий к посту)
                this.parentCommentId = (__runInitializers(this, _postId_extraInitializers), __runInitializers(this, _parentCommentId_initializers, void 0)); // ID родительского комментария (для вложенных комментариев)
                __runInitializers(this, _parentCommentId_extraInitializers);
            }
            return CreateCommentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(500)];
            _productId_decorators = [(0, class_validator_1.IsOptional)()];
            _postId_decorators = [(0, class_validator_1.IsOptional)()];
            _parentCommentId_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
            __esDecorate(null, null, _postId_decorators, { kind: "field", name: "postId", static: false, private: false, access: { has: function (obj) { return "postId" in obj; }, get: function (obj) { return obj.postId; }, set: function (obj, value) { obj.postId = value; } }, metadata: _metadata }, _postId_initializers, _postId_extraInitializers);
            __esDecorate(null, null, _parentCommentId_decorators, { kind: "field", name: "parentCommentId", static: false, private: false, access: { has: function (obj) { return "parentCommentId" in obj; }, get: function (obj) { return obj.parentCommentId; }, set: function (obj, value) { obj.parentCommentId = value; } }, metadata: _metadata }, _parentCommentId_initializers, _parentCommentId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateCommentDto = CreateCommentDto;
