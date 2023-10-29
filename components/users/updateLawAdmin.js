import "dotenv/config";
import { GraphQLError } from "graphql";

import { LawAdmins } from "../../models/lawAdmins.js";

export const updateLawAdmin = async (_, args) => {
  try {
    const { lawAdminId, status, nameAndSurname, phone, email } = args.input;
    const lawAdmin = await LawAdmins.findOne({
      where: { id: lawAdminId },
    });

    if (phone) {
      try {
        const checkPhone = await LawAdmins.findOne({
          where: { telefon: phone },
        });
        if (!checkPhone) {
          lawAdmin.telefon = phone;
        } else {
          return new GraphQLError("Farklı bir telefon numarası ile deneyin.", {
            extensions: { code: 502 },
          });
        }
      } catch (error) {
        console.log(error);
        return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
          extensions: { code: 502 },
        });
      }
    }

    if (email) {
      try {
        const checkEmail = await LawAdmins.findOne({
          where: { email: email },
        });
        if (!checkEmail) {
          lawAdmin.email = email;
        } else {
          return new GraphQLError("Farklı bir e-posta adresi ile deneyin.", {
            extensions: { code: 502 },
          });
        }
      } catch (error) {
        console.log(error);
        return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
          extensions: { code: 502 },
        });
      }
    }

    status && (lawAdmin.durum = status);
    nameAndSurname && (lawAdmin.ad_soyad = nameAndSurname);

    await lawAdmin.save();

    return {
      lawAdminId: lawAdmin.id,
      message: `${lawAdmin.ad_soyad} hukuk yöneticisinin güncellemesi tamamlandı.`,
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
