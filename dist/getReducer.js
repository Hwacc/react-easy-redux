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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 构建models
 * @param models models
 * @param plugins 插件
 */
var getReducers = function (models, plugins) {
    var rootReducer = {};
    var _loop_1 = function (model) {
        if (model.state && model.reducers) {
            rootReducer[model.namespace] = function (state, action) {
                if (state === void 0) { state = model.state; }
                var _a = action.type.split('/'), namespace = _a[0], type = _a[1];
                var reducer = model.reducers && model.reducers[type];
                if (namespace === model.namespace &&
                    !(model.effects && model.effects[type]) &&
                    reducer) {
                    return reducer(state, __assign(__assign({}, action), { type: type }));
                }
                return state;
            };
        }
    };
    for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
        var model = models_1[_i];
        _loop_1(model);
    }
    plugins.forEach(function (item) {
        rootReducer[item.namespace] = item.reducer;
    });
    return rootReducer;
};
exports.default = getReducers;
