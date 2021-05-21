import { applyMiddleware, createStore, combineReducers, Store, compose, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createPromiseMiddleware from './middleware/promise';
import loadingPlugin, { ILoading } from './plugins/loading';
import getSagas from './getSagas';
import getReducers from './getReducer';
import easyConnect from './connect';
import { IModel, IPlugin } from './types';
import { composeWithDevTools, EnhancerOptions } from 'redux-devtools-extension';

export interface IRootState {
  loading: ILoading;
}

/**
 * 初始化的时候调用此方法获取provider需要的store
 * @param models
 */
export const getStore = <T>(
  models: Array<IModel<any>>,
  plugins?: Array<IPlugin<any>>,
  midllewares?: Array<Middleware>,
  devtoolsOptions?: EnhancerOptions,
): Store => {
  const allPlugins = plugins
    ? [...[loadingPlugin], ...plugins]
    : [loadingPlugin];

  const rootSaga = getSagas.bind(
    null,
    models,
    allPlugins.map(item => item.onEffect)
  );
  const rootReducers = getReducers(models, allPlugins);

  const sagaMiddleware = createSagaMiddleware();

  const promiseMiddleware = createPromiseMiddleware(models);

  let storeEnhancers = compose(applyMiddleware(promiseMiddleware, sagaMiddleware, ...midllewares));

  if(devtoolsOptions) {
    storeEnhancers = composeWithDevTools(devtoolsOptions)(applyMiddleware(promiseMiddleware, sagaMiddleware, ...midllewares));
  }

  const store = createStore(
    combineReducers<T>(rootReducers),
    storeEnhancers
  );

  sagaMiddleware.run(rootSaga as any);
  return store;
};

export { Provider } from 'react-redux';

/**
 * 把组件关联到redux
 */
export const connect = easyConnect;
