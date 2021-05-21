"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixType = void 0;
/**
 * 格式化type
 * @param model model
 * @param type dispatch的type
 */
var prefixType = function (model, type) {
    var typeArr = type.split('/');
    if (typeArr.length > 1) {
        return type;
    }
    else {
        return model.namespace + "/" + type;
    }
};
exports.prefixType = prefixType;
