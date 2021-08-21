import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../_reducer/index';
import thunk from 'redux-thunk';
import reduxPromise from "redux-promise";


export const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxPromise,thunk)
);


// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
