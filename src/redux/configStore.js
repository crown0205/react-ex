import { createStore, combineReducers } from "redux";
import bucket from "./modules/bucket";

const rootReducer = combineReducers({ bucket });

const store = createStore(rootReducer);

export default store;

//  스토어를 만드는거. 3-9강 "20분" 