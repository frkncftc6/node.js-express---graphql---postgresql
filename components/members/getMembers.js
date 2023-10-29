import "dotenv/config";
import { Op } from "sequelize";
import { GraphQLError } from "graphql";

import { Members } from "../../models/members.js";

export const getMembers = async (_, args) => {
  try {
    const { search } = args;
    let members = [];
    const memberIds = await Members.findAll({
      where: {
        [Op.or]: [
          { ad: { [Op.like]: `${search}%` } },
          { soyad: { [Op.like]: `${search}%` } },
        ],
      },
    });

    memberIds.map((member) => {
      members.push({
        memberId: member.uye_id,
        memberToSelect: `${member.ad} ${member.soyad} ${member.tck}`,
      });
    });

    return members;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
