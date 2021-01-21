import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select } from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

// 숫자의 증감을 위한 액션 생성자
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 숫자의 증감을 1초 delay 시키도록 하는 액션 생성자
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초를 기다림
  yield put(increase()); // 특정 액션을 디스패치
  // Saga 내부에서 현재 상태를 조회할려고 할때 쓴다 => select
  const number = yield select((state) => {
    console.log(state);
    return state.counter.number;
  });
  console.log(`현재 값은 ${number}`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  //takeEvery는 들어오는 모든 액션에 대해 작업을 처리함.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  //takeLatest는 실행 중인 액션이 있다면 취소 처리하고 가장마지막으로 실행된 작업만 수행.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = {
  number: 0,
};

const counter = handleActions(
  {
    [INCREASE]: (state) => ({
      ...state,
      number: state.number + 1,
    }),
    [DECREASE]: (state) => ({
      ...state,
      number: state.number - 1,
    }),
  },
  initialState
);

export default counter;
