"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var mapDispatchToProps = function (dispatch) { return ({
    dispatch: dispatch,
}); };
/**
 * 导出redux组件
 */
exports.default = (function (WrappedComponent, mapStateToProps, mergeProps, options) {
    return react_redux_1.connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(WrappedComponent);
});
