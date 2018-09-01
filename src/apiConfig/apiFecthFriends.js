import { usersss } from "@login/components/LoginScreen";
export const fetchData = async () => {
  try {
    // const response = await fetch("http://192.168.88.105:3000/api/getFriend", {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_name: usersss
    //   }),
    // });
    // const data = await response.json();
    // console.log(data)
    // return data
    fetch('http://192.168.88.105:3000/api/getFriend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: usersss
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        const data = responseJson.data
        console.log(responseJson.data)
        console.log(data)
        return data
      })
  } catch (e) {
    console.log(e);
  }
};
