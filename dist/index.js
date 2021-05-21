"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.Provider = exports.getStore = void 0;
var redux_1 = require("redux");
var redux_saga_1 = __importDefault(require("redux-saga"));
var promise_1 = __importDefault(require("./middleware/promise"));
var loading_1 = __importDefault(require("./plugins/loading"));
var getSagas_1 = __importDefault(require("./getSagas"));
var getReducer_1 = __importDefault(require("./getReducer"));
var connect_1 = __importDefault(require("./connect"));
var redux_devtools_extension_1 = require("redux-devtools-extension");
/**
 * 初始化的时候调用此方法获取provider需要的store
 * @param models
 */
var getStore = function (models, options) {
    if (options === void 0) { options = {}; }
    var _a = options.plugins, plugins = _a === void 0 ? [] : _a, _b = options.midllewares, midllewares = _b === void 0 ? [] : _b, devtools = options.devtools;
    var allPlugins = __spreadArray(__spreadArray([], [loading_1.default]), plugins);
    var rootSaga = getSagas_1.default.bind(null, models, allPlugins.map(function (item) { return item.onEffect; }));
    var rootReducers = getReducer_1.default(models, allPlugins);
    var sagaMiddleware = redux_saga_1.default();
    var promiseMiddleware = promise_1.default(models);
    var storeEnhancers = redux_1.compose(redux_1.applyMiddleware.apply(void 0, __spreadArray([promiseMiddleware, sagaMiddleware], midllewares)));
    if (devtools) {
        var devtoolsOptions = {};
        if (devtools instanceof Object) {
            devtoolsOptions = devtools.options;
        }
        storeEnhancers = redux_devtools_extension_1.composeWithDevTools(devtoolsOptions)(redux_1.applyMiddleware.apply(void 0, __spreadArray([promiseMiddleware, sagaMiddleware], midllewares)));
    }
    var store = redux_1.createStore(redux_1.combineReducers(rootReducers), storeEnhancers);
    sagaMiddleware.run(rootSaga);
    return store;
};
exports.getStore = getStore;
var react_redux_1 = require("react-redux");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return react_redux_1.Provider; } });
/**
 * 把组件关联到redux
 */
exports.connect = connect_1.default;
