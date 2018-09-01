import { RECEIVEFriend_API_DATA } from "@action/actions";

export default (state = {}, { type, data }) => {
  switch (type) {
    case RECEIVEFriend_API_DATA:
      return data;
    default:
      return state;
  }
};
