import "dotenv/config";
import { GraphQLError } from "graphql";

import { getMember } from "../../supports/globalFunctions.js";

import { MemberLogins } from "../../models/memberLogins.js";

export const memberLogins = async () => {
  try {
    const memberLoginIds = await MemberLogins.findAll();
    let memberLogins = [];

    async function getNameAndSurname(id) {
      const member = await getMember(id);
      return `${member.ad} ${member.soyad}`;
    }

    await memberLoginIds.map((memberLogin) => {
      memberLogins.push({
        id: memberLogin.uye_giris_id,
        nameAndSurname: getNameAndSurname(memberLogin.uye_id),
        time: new Date(parseInt(memberLogin.zaman)).toLocaleString(),
        explorer: `${memberLogin.tarayici} ${memberLogin.versiyon}`,
        system: memberLogin.sistem,
        ipAddress: memberLogin.ip,
      });
    });

    return memberLogins;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
