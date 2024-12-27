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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
var typeorm_1 = require("typeorm");
var Tag = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _schema_decorators;
    var _schema_initializers = [];
    var _schema_extraInitializers = [];
    var _featuredImageUrl_decorators;
    var _featuredImageUrl_initializers = [];
    var _featuredImageUrl_extraInitializers = [];
    var _createDate_decorators;
    var _createDate_initializers = [];
    var _createDate_extraInitializers = [];
    var _updateDate_decorators;
    var _updateDate_initializers = [];
    var _updateDate_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var Tag = _classThis = /** @class */ (function () {
        function Tag_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.schema = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _schema_initializers, void 0));
            this.featuredImageUrl = (__runInitializers(this, _schema_extraInitializers), __runInitializers(this, _featuredImageUrl_initializers, void 0));
            this.createDate = (__runInitializers(this, _featuredImageUrl_extraInitializers), __runInitializers(this, _createDate_initializers, void 0));
            this.updateDate = (__runInitializers(this, _createDate_extraInitializers), __runInitializers(this, _updateDate_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updateDate_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        return Tag_1;
    }());
    __setFunctionName(_classThis, "Tag");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _name_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 256,
                nullable: false,
                unique: true,
            })];
        _slug_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 256,
                nullable: false,
                unique: true,
            })];
        _description_decorators = [(0, typeorm_1.Column)({
                type: 'text',
                nullable: true,
            })];
        _schema_decorators = [(0, typeorm_1.Column)({
                type: 'text',
                nullable: true,
            })];
        _featuredImageUrl_decorators = [(0, typeorm_1.Column)({
                type: 'varchar',
                length: 1024,
                nullable: true,
            })];
        _createDate_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updateDate_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _schema_decorators, { kind: "field", name: "schema", static: false, private: false, access: { has: function (obj) { return "schema" in obj; }, get: function (obj) { return obj.schema; }, set: function (obj, value) { obj.schema = value; } }, metadata: _metadata }, _schema_initializers, _schema_extraInitializers);
        __esDecorate(null, null, _featuredImageUrl_decorators, { kind: "field", name: "featuredImageUrl", static: false, private: false, access: { has: function (obj) { return "featuredImageUrl" in obj; }, get: function (obj) { return obj.featuredImageUrl; }, set: function (obj, value) { obj.featuredImageUrl = value; } }, metadata: _metadata }, _featuredImageUrl_initializers, _featuredImageUrl_extraInitializers);
        __esDecorate(null, null, _createDate_decorators, { kind: "field", name: "createDate", static: false, private: false, access: { has: function (obj) { return "createDate" in obj; }, get: function (obj) { return obj.createDate; }, set: function (obj, value) { obj.createDate = value; } }, metadata: _metadata }, _createDate_initializers, _createDate_extraInitializers);
        __esDecorate(null, null, _updateDate_decorators, { kind: "field", name: "updateDate", static: false, private: false, access: { has: function (obj) { return "updateDate" in obj; }, get: function (obj) { return obj.updateDate; }, set: function (obj, value) { obj.updateDate = value; } }, metadata: _metadata }, _updateDate_initializers, _updateDate_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tag = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tag = _classThis;
}();
exports.Tag = Tag;
