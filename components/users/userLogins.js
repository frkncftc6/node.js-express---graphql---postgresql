import "dotenv/config";
import { GraphQLError } from "graphql";

import { getUserWithId } from "../../supports/globalFunctions.js";

import { UserLogins } from "../../models/userLogins.js";

export const userLogins = async () => {
  try {
    const userLoginIds = await UserLogins.findAll();
    let userLogins = [];

    async function getUsername(id) {
      const user = await getUserWithId(id);
      return user.kullanici_adi;
    }

    await userLoginIds.map((userLogin) => {
      userLogins.push({
        id: userLogin.kullanici_giris_id,
        username: getUsername(userLogin.kullanici_id),
        time: new Date(parseInt(userLogin.zaman)).toLocaleString(),
        explorer: `${userLogin.tarayici} ${userLogin.versiyon}`,
        system: userLogin.sistem,
        ipAddress: userLogin.ip,
      });
    });

    return userLogins;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
