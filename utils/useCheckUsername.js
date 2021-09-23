export const useCheckUsername = ({ list, username }) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].username == username) return true;
  }
};
