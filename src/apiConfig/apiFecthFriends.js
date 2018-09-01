import { usersss } from "@login/components/LoginScreen";
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
      console.log(responseJson.data)
      console.log(data)
      return data
    });
    return response
}