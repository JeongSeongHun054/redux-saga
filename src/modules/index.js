import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
import counter, { counterSaga } from "./counter";

const rootReducer = combineReducers({
  sample,
  counter,
  loading,
});

export function* rootSaga() {
  // all 함수는 여러 사가를 합쳐 주는 역할
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
