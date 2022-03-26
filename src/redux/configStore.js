import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import bucket from "./modules/bucket";

const middlewares = [thunk] // 쓸 미들웨어를 넣어주면 된다.
const rootReducer = combineReducers({ bucket });
const enhancer = applyMiddleware(...middlewares) //미들웨어를 묶어주는 애.(애들의 모음)
// const enhancer = applyMiddleware(thunk, thunk2, ...) // 더 많으면 이런식으로 작성해준다


const store = createStore(rootReducer, enhancer); // 스토어에 미들웨어 적용하는거 끝~!
// 스토어를 만들때, 리듀서와 욥셔널한걸 엮어서 만든다. "⬆️"

export default store;
