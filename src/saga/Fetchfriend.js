import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUESTFriend_API_DATA, receiveFirendApiData } from "@action/actions";
import { fetchData } from "@apiConfig/apiFecthFriends";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  try {
    // do api call
    const data = yield call(fetchData);
    yield put(receiveFirendApiData(data));
  } catch (e) {
    console.log(e);
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(REQUESTFriend_API_DATA, getApiData);
}
