import { Users } from "../../models/users.js";

export const users = async () => {
  return await Users.findAll({ where: { genel_merkez: 1 } });
};
