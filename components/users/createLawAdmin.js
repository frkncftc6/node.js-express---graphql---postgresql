import "dotenv/config";
import { GraphQLError } from "graphql";
import { Op } from "sequelize";

import { getUserWithId } from "../../supports/globalFunctions.js";

import { LawAdmins } from "../../models/lawAdmins.js";

export const createLawAdmin = async (_, args) => {
  try {
    const { userId, name, surname, phone, email } = args.input;
    const user = await getUserWithId(userId);

    if (user) {
      const lawAdmin = await LawAdmins.findOne({
        where: { [Op.or]: [{ email: email }, { telefon: phone }] },
      });
      if (!lawAdmin) {
        const createdLawAdmin = await LawAdmins.create({
          ad_soyad: `${name} ${surname}`,
          telefon: phone,
          email: email,
          durum: 1,
          sil: 0,
          genel_merkez: user.genel_merkez,
          bolge_temsilci_id: user.bolge_temsilci_id,
          il_temsilci_id: user.il_temsilci_id,
          ilce_temsilci_id: user.ilce_temsilci_id,
          personel: user.personel,
          ili: user.ili,
          bolgesi: user.bolgesi,
        });

        if (createdLawAdmin) {
          return {
            lawAdminId: createdLawAdmin.id,
            nameAndSurname: createdLawAdmin.ad_soyad,
          };
        } else {
          return new GraphQLError(
            "Hukuk destek yöneticisi eklenirken bir hata oluştu.",
            {
              extensions: { code: 502 },
            }
          );
        }
      } else {
        return new GraphQLError(
          "Farklı bir e-posta adresi veya telefon numarası ile deneyin.",
          {
            extensions: { code: 502 },
          }
        );
      }
    } else {
      return new GraphQLError("Kullanıcı bulunamadı.", {
        extensions: { code: 502 },
      });
    }
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
