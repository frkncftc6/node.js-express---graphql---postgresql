import "dotenv/config";
import { GraphQLError } from "graphql";
import { Op } from "sequelize";

import {
  getAreaDelegate,
  getCityDelegate,
  getDistrictDelegate,
} from "../../supports/globalFunctions.js";

import { LawAdmins } from "../../models/lawAdmins.js";
import { LawAdminSettings } from "../../models/lawAdminSettings.js";

export const lawAdminUsers = async (_, args) => {
  try {
    const { filters } = args;
    const lawAdminIds =
      filters == 1
        ? await LawAdmins.findAll({
            where: { sil: 0, genel_merkez: { [Op.not]: 0 } },
          })
        : filters == 2
        ? await LawAdmins.findAll({
            where: { sil: 0, bolge_temsilci_id: { [Op.not]: 0 } },
          })
        : filters == 3
        ? await LawAdmins.findAll({
            where: { sil: 0, il_temsilci_id: { [Op.not]: 0 } },
          })
        : filters == 4
        ? await LawAdmins.findAll({
            where: { sil: 0, ilce_temsilci_id: { [Op.not]: 0 } },
          })
        : await LawAdmins.findAll({ where: { sil: 0 } });
    const lawAdminsSettingIds = await LawAdminSettings.findAll();

    let lawAdmins = [];
    let settings = [];

    await Promise.all(
      lawAdminIds.map(async (lawAdmin) => {
        lawAdmin.personel == 0 &&
          lawAdmins.push({
            nameAndSurname: lawAdmin.ad_soyad,
            authorityArea:
              lawAdmin.genel_merkez == 1
                ? "Genel Merkez"
                : lawAdmin.genel_merkez == 0 && lawAdmin.bolge_temsilci_id != 0
                ? await getAreaDelegate(lawAdmin.bolge_temsilci_id)
                    .then((areaDelegate) => {
                      return areaDelegate.bolge_sube;
                    })
                    .catch((error) => console.log(error))
                : lawAdmin.genel_merkez == 0 &&
                  lawAdmin.bolge_temsilci_id == 0 &&
                  lawAdmin.il_temsilci_id != 0
                ? await getCityDelegate(lawAdmin.il_temsilci_id)
                    .then((cityDelegate) => {
                      if (cityDelegate.subemi == 0) {
                        return `${cityDelegate.sube} Temsilciliği`;
                      } else {
                        return `${cityDelegate.sube} Şube`;
                      }
                    })
                    .catch((error) => console.log(error))
                : lawAdmin.genel_merkez == 0 &&
                  lawAdmin.bolge_temsilci_id == 0 &&
                  lawAdmin.il_temsilci_id == 0 &&
                  lawAdmin.ilce_temsilci_id != 0
                ? await getDistrictDelegate(lawAdmin.ilce_temsilci_id)
                    .then((districtDelegate) => {
                      return `${districtDelegate.ilce} İlçesi`;
                    })
                    .catch((error) => console.log(error))
                : null,
            phone: lawAdmin.telefon,
            email: lawAdmin.email,
            status: lawAdmin.durum,
            userId: lawAdmin.id,
          });
      })
    );

    await Promise.all(
      lawAdminsSettingIds.map((lawAdminSetting) => {
        settings.push({
          id: lawAdminSetting.id,
          status: lawAdminSetting.deger,
          generalCenter: lawAdminSetting.gmerkez,
          name: lawAdminSetting.adi,
        });
      })
    );
    return {
      users: lawAdmins,
      settings: settings,
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
