import { call, put, takeLatest} from "redux-saga/effects";
import {cancle_fetch_data_friend_acitve} from "@home/components/HomeScreen";
import { REQUESTFriend_API_DATA, receiveFirendApiData } from "@action/actions";
import { REQUESTFriendPending_API_DATA, receiveFirendPendingApiData } from "@action/actions";
import { REQUESTFriendReject_API_DATA, receiveFirendRejectApiData } from "@action/actions";
import { fetchData } from "@apiConfig/apis";
import { fetchDataPending } from "@apiConfig/apis";
import { fetchDataReject } from "@apiConfig/apis";
function* getApiData(action) {
  console.log("test_cacle "+cancle_fetch_data_friend_acitve)
  if(cancle_fetch_data_friend_acitve == false){
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
}
function* getPendingApiData(action) {
  try {
    // do api call
    const dataPending = yield call(fetchDataPending);
    if(dataPending != null && dataPending != '' ){
      console.log(dataPending)
      console.log('success')
      yield put(receiveFirendPendingApiData(dataPending));
    }else{
      console.log(dataPending)
      console.log('failed')
    }
  } catch (e) {
    console.log(e);
  }
}
function* getRejectApiData(action) {
  try {
    // do api call
    const dataReject = yield call(fetchDataReject);
    if(dataReject != null && dataReject != '' ){
      console.log(dataReject)
      console.log('success')
      yield put(receiveFirendRejectApiData(dataReject));
    }else{
      console.log(dataReject)
      console.log('failed')
    }
  } catch (e) {
    console.log(e);
  }
}
export default function* mySaga() {
  yield takeLatest(REQUESTFriend_API_DATA, getApiData);
  yield takeLatest(REQUESTFriendPending_API_DATA, getPendingApiData);
  yield takeLatest(REQUESTFriendReject_API_DATA, getRejectApiData);
}
