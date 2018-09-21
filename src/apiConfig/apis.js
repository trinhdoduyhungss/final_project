import { usersss } from "@login/components/LoginScreen";
export var totalfriendactive
export var totalfriendPending
export var totalfriendReject
export function* fetchData() {
  const response = yield fetch('http://192.168.88.105:3000/api/getFriend', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: usersss
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      const data = responseJson.data
      totalfriendactive = responseJson.totalActive
      totalfriendPending = responseJson.totalPending
      totalfriendReject = responseJson.totalReject
      console.log(responseJson.data)
      console.log(data)
      console.log(totalfriendPending)
      return data
    });
    return response
}
export function* fetchDataPending() {
  const response = yield fetch('http://192.168.88.105:3000/api/getFriendPending', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: usersss
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      const dataPending = responseJson.data
      totalfriendPending = responseJson.totalPending
      console.log(responseJson.data)
      console.log(dataPending)
      return dataPending
    });
    return response
}
export function* fetchDataReject() {
  const response = yield fetch('http://192.168.88.105:3000/api/getFriendReject', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: usersss
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      totalfriendPending=0
      const dataReject = responseJson.data
      totalfriendReject = responseJson.totalReject
      totalfriendPending = responseJson.totalPending
      console.log(responseJson.data)
      console.log(dataReject)
      console.log(totalfriendReject)
      return dataReject
    });
    return response
}