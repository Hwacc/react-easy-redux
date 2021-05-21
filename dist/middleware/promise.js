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
var createPromiseMiddleware = function (models) {
    var middleware = function () { return function (next) { return function (action) {
        var type = action.type;
        var typeArr = type.split('/');
        if (typeArr.length > 1) {
            var namespace_1 = typeArr[0], key = typeArr[1];
            var model = models.filter(function (m) { return m.namespace === namespace_1; })[0];
            if (model && model.effects && model.effects[key]) {
                return new Promise(function (resolve, reject) {
                    next(__assign({ __my_resolve: resolve, __my_reject: reject }, action));
                });
            }
            else {
                return next(action);
            }
        }
        else {
            return next(action);
        }
    }; }; };
    return middleware;
};
exports.default = createPromiseMiddleware;
