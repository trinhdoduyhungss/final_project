import { call, put, takeLatest } from "redux-saga/effects";

import { REQUESTFriend_API_DATA, receiveFirendApiData } from "@action/actions";
import { fetchData } from "@apiConfig/apis";
function* getApiData(action) {
  try {
    // do api call
    const data = yield call(fetchData);
    if(data != null && data != '' ){
      console.log(data)
      console.log('success')
      yield put(receiveFirendApiData(data));
    }else{
      console.log(data)
      console.log('failed')
    }
  } catch (e) {
    console.log(e);
  }
}
export default function* mySaga() {
  yield takeLatest(REQUESTFriend_API_DATA, getApiData);
}
