import "dotenv/config";
import { GraphQLError } from "graphql";

import {
  getMember,
  getUserWithId,
  getManagerTask,
  getAreaDelegate,
  getCityDelegate,
  getDistrictDelegate,
  getWorkplaceDelegate,
} from "../../supports/globalFunctions.js";

export const getManagerUser = async (_, args) => {
  try {
    const { userId } = args;
    const user = await getUserWithId(userId);
    const member = await getMember(user.uye_id);

    return {
      userId: user.kullanici_id,
      nameAndSurname: `${member.ad} ${member.soyad}`,
      taskDefination: await getManagerTask(user.gorev_tanimi)
        .then((managerTask) => {
          return {
            id: managerTask.id,
            taskDefination: managerTask.gorevtanimi,
          };
        })
        .catch((error) => console.log(error)),
      username: user.kullanici_adi,
      phone: member.telefon1,
      authorityArea:
        user.genel_merkez == 1
          ? {
              checkboxId: 0,
              checkBoxTitle: "Genel Merkez",
              dropdownDetail: null,
            }
          : user.genel_merkez == 0 && user.bolge_temsilci_id != 0
          ? getAreaDelegate(user.bolge_temsilci_id)
              .then((areaDelegate) => {
                return {
                  checkboxId: 1,
                  checkBoxTitle: "Bölge Şube Yöneticisi",
                  dropdownDetail: {
                    areaDelegateId: areaDelegate.bolge_sube_id,
                    areaDelegate: areaDelegate.bolge_sube,
                  },
                };
              })
              .catch((error) => console.log(error))
          : user.genel_merkez == 0 &&
            user.bolge_temsilci_id == 0 &&
            user.il_temsilci_id != 0
          ? getCityDelegate(user.il_temsilci_id)
              .then((cityDelegate) => {
                return {
                  checkboxId: 2,
                  checkBoxTitle: "Şube Yöneticisi veya İl Temsilcisi  ",
                  dropdownDetail: {
                    cityDelegateId: cityDelegate.sube_id,
                    cityDelegate:
                      cityDelegate.subemi == 0
                        ? `${cityDelegate.sube} Temsilciliği`
                        : `${cityDelegate.sube} Şube`,
                  },
                };
              })
              .catch((error) => console.log(error))
          : user.genel_merkez == 0 &&
            user.bolge_temsilci_id == 0 &&
            user.il_temsilci_id == 0 &&
            user.ilce_temsilci_id != 0
          ? getDistrictDelegate(user.ilce_temsilci_id)
              .then((districtDelegate) => {
                return {
                  checkboxId: 3,
                  checkBoxTitle: "İlçe Temsilcisi",
                  dropdownDetail: {
                    districtDelegateId: districtDelegate.ilce_id,
                    districtDelegateCityId: districtDelegate.il_id,
                    districtDelegate: districtDelegate.ilce,
                  },
                };
              })
              .catch((error) => console.log(error))
          : user.genel_merkez == 0 &&
            user.bolge_temsilci_id == 0 &&
            user.il_temsilci_id == 0 &&
            user.ilce_temsilci_id == 0 &&
            user.isyeri_temsilci_id != 0
          ? getWorkplaceDelegate(user.isyeri_temsilci_id)
              .then((workplaceDelegate) => {
                return {
                  checkboxId: 4,
                  checkBoxTitle: "İşyeri Temsilcisi",
                  dropdownDetail: {
                    workplaceDelegateId: workplaceDelegate.isyeri_temsilci_id,
                    workplaceDelegateCityId: workplaceDelegate.il_id,
                    workplaceDelegateDistrictId: workplaceDelegate.ilce_id,
                    workplaceDelegate: workplaceDelegate.isyeri,
                  },
                };
              })
              .catch((error) => console.log(error))
          : null,
      authorizations: JSON.parse(user.yetkiler),
      profilePhoto: user.profilePhoto,
      signature: user.imza,
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
