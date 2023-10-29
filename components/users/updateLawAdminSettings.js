import "dotenv/config";
import { GraphQLError } from "graphql";

import { LawAdminSettings } from "../../models/lawAdminSettings.js";

export const updateLawAdminSettings = async (_, args) => {
  try {
    const { settingsId, status } = args.input;

    const lawAdminSetting = await LawAdminSettings.findOne({
      where: { id: settingsId },
    });

    lawAdminSetting.deger = status;
    await lawAdminSetting.save();

    return {
      settingsId: lawAdminSetting.id,
      status: lawAdminSetting.deger,
      message: `${lawAdminSetting.adi} güncellendi. `,
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
