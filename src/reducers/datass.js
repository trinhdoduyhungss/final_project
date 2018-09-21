import { RECEIVEFriend_API_DATA } from "@action/actions";
import { RECEIVEFriendPending_API_DATA } from "@action/actions";
import { RECEIVEFriendReject_API_DATA } from "@action/actions";
export default (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVEFriend_API_DATA:
      return data;
    case RECEIVEFriendPending_API_DATA:
      return data;
    case RECEIVEFriendReject_API_DATA:
      return data;
    default:
      return state;
  }
};
