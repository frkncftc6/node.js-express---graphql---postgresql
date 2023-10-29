import "dotenv/config";
import { GraphQLError } from "graphql";
import { literal } from "sequelize";

import {
  getAreaDelegate,
  getCityDelegate,
  getDistrictDelegate,
  getWorkplaceDelegate,
} from "../../supports/globalFunctions.js";

import { Users } from "../../models/users.js";
import { Members } from "../../models/members.js";

export const getUsers = async () => {
  try {
    let users = [];
    const userIds = await Users.findAll({
      where: { sil: false },
      order: [
        [literal("CASE WHEN genel_merkez > 0 THEN 0 ELSE 1 END"), "ASC"],
        "genel_merkez",
        [literal("CASE WHEN bolge_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
        "bolge_temsilci_id",
        [literal("CASE WHEN il_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
        "il_temsilci_id",
        [literal("CASE WHEN ilce_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
        "ilce_temsilci_id",
        [literal("CASE WHEN isyeri_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
        "isyeri_temsilci_id",
      ],
    });
    const memberIds = await Members.findAll({ where: { sil: false } });

    await userIds.map(async (user) => {
      await memberIds.map(async (member) => {
        if (user.uye_id == member.uye_id) {
          users.push({
            userId: user.kullanici_id,
            userToSelect:
              user.genel_merkez == 2
                ? `${member.ad} ${member.soyad} - ${user.kullanici_adi} - Genel Başkan`
                : user.genel_merkez == 1
                ? `${member.ad} ${member.soyad} - ${user.kullanici_adi} - Genel Merkez`
                : user.genel_merkez == 0 && user.bolge_temsilci_id != 0
                ? getAreaDelegate(user.bolge_temsilci_id)
                    .then((areaDelegate) => {
                      return `${member.ad} ${member.soyad} - ${user.kullanici_adi} - ${areaDelegate.bolge_sube}`;
                    })
                    .catch((error) => console.log(error))
                : user.genel_merkez == 0 &&
                  user.bolge_temsilci_id == 0 &&
                  user.il_temsilci_id != 0
                ? getCityDelegate(user.il_temsilci_id)
                    .then((cityDelegate) => {
                      if (cityDelegate.subemi == 0) {
                        return `${member.ad} ${member.soyad} - ${user.kullanici_adi} - ${cityDelegate.sube} Temsilciliği`;
                      } else {
                        return `${member.ad} ${member.soyad} - ${user.kullanici_adi} - ${cityDelegate.sube} Şube`;
                      }
                    })
                    .catch((error) => console.log(error))
                : user.genel_merkez == 0 &&
                  user.bolge_temsilci_id == 0 &&
                  user.il_temsilci_id == 0 &&
                  user.ilce_temsilci_id != 0
                ? getDistrictDelegate(user.ilce_temsilci_id)
                    .then((districtDelegate) => {
                      return `${member.ad} ${member.soyad} - ${user.kullanici_adi} - ${districtDelegate.ilce}`;
                    })
                    .catch((error) => console.log(error))
                : user.genel_merkez == 0 &&
                  user.bolge_temsilci_id == 0 &&
                  user.il_temsilci_id == 0 &&
                  user.ilce_temsilci_id == 0 &&
                  user.isyeri_temsilci_id != 0
                ? getWorkplaceDelegate(user.isyeri_temsilci_id)
                    .then((workplaceDelegate) => {
                      return `${member.ad} ${member.soyad} - ${user.kullanici_adi} - ${workplaceDelegate.isyeri}`;
                    })
                    .catch((error) => console.log(error))
                : null,
            name: member.ad,
            surname: member.soyad,
            phone: member.telefon1,
            email: member.eposta,
          });
        }
      });
    });

    return users;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
