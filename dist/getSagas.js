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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var sagaEffects = __importStar(require("redux-saga/effects"));
var util_1 = require("./util");
/**
 * 所有effects触发的时候执行的方法
 * @param model 触发的effects所在的model
 * @param args action 传参
 */
var onEffectWitchCatch = function (model) {
    var _i, _a, reject, resolve, payload, type, _b, key, catchSelf, ret, e_1;
    var args = [];
    for (_i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = args[0], reject = _a.__my_reject, resolve = _a.__my_resolve, payload = _a.payload, type = _a.type;
                _b = type.split('/'), key = _b[1];
                catchSelf = payload && payload.catchSelf;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                if (!model.effects) return [3 /*break*/, 3];
                catchSelf && delete payload.catchSelf;
                return [4 /*yield*/, model.effects[key](payload, extSagaEffects(model))];
            case 2:
                ret = _c.sent();
                resolve(ret);
                _c.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _c.sent();
                if (catchSelf) {
                    reject(e_1);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
};
/**
 *  扩展saga的Effects方法
 * @param model IModel
 */
var extSagaEffects = function (model) {
    var put = function (action) {
        var type = action.type;
        return sagaEffects.put(__assign(__assign({}, action), { type: util_1.prefixType(model, type) }));
    };
    return __assign(__assign({}, sagaEffects), { put: put });
};
/**
 * 构建sagas
 * @param models models
 * @param pluginOnEffects 扩展saga的插件
 */
var getSagas = function (models, pluginOnEffects) {
    var _i, models_1, model, _a, _b, key, type, effectFn, _c, pluginOnEffects_1, fn;
    if (models === void 0) { models = []; }
    if (pluginOnEffects === void 0) { pluginOnEffects = []; }
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _i = 0, models_1 = models;
                _d.label = 1;
            case 1:
                if (!(_i < models_1.length)) return [3 /*break*/, 6];
                model = models_1[_i];
                if (!model.effects) return [3 /*break*/, 5];
                _a = 0, _b = Object.keys(model.effects);
                _d.label = 2;
            case 2:
                if (!(_a < _b.length)) return [3 /*break*/, 5];
                key = _b[_a];
                type = util_1.prefixType(model, key);
                effectFn = onEffectWitchCatch.bind(null, model);
                for (_c = 0, pluginOnEffects_1 = pluginOnEffects; _c < pluginOnEffects_1.length; _c++) {
                    fn = pluginOnEffects_1[_c];
                    effectFn = fn(effectFn, sagaEffects, type);
                }
                return [4 /*yield*/, sagaEffects.takeEvery(type, effectFn)];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
};
exports.default = getSagas;
