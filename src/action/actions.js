export const REQUESTFriend_API_DATA = "REQUESTFriend_API_DATA";
export const RECEIVEFriend_API_DATA = "RECEIVEFriend_API_DATA";

export const requestFriendApiData = () => ({ type: REQUESTFriend_API_DATA });
export const receiveFirendApiData = data => ({ type: RECEIVEFriend_API_DATA, data });
