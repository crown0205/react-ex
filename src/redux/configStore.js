import { createStore, combineReducers } from "redux";
import bucket from "./modules/bucket";

const rootReducer = combineReducers({ bucket }); // 여기에 리듀서가 더 생길시 "bucket" 자리에 더 추가 해주면 리듀서를 묶을수 있다.

const store = createStore(rootReducer);

export default store;
