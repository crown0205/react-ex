import { createStore, combineReducers } from "redux";
import bucket from "./modules/bucket";

const rootReducer = combineReducers({ bucket }); // 여기에 리듀서가 더 생길시 "bucket" 자리에 더 추가 해주면 리듀서를 묶을수 있다.
                                                 // "bucket"명이 데이터 값 앞에 붙어서 나옴.
                                                 // bucket : list (3) 이렇게 콘솔창에 initState 값이 들어가 있음.
const store = createStore(rootReducer);

export default store;
