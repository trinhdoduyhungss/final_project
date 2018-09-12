import { usersss } from "@login/components/LoginScreen";
export var totalfriendactive
export function* fetchData() {
  const response = yield fetch('http://192.168.88.105:3000/api/getFriendActive', {
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
      console.log(responseJson.data)
      console.log(data)
      return data
    });
    return response
}