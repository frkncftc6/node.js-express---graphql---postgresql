import "dotenv/config";
import { GraphQLError } from "graphql";

import {
  getEmployee,
  getUserWithId,
  getAreaDelegate,
  getCityDelegate,
  getDistrictDelegate,
} from "../../supports/globalFunctions.js";

export const getEmployeeUser = async (_, args) => {
  try {
    const { userId } = args;
    const user = await getUserWithId(userId);
    const employee = await getEmployee(user.personel);

    return {
      userId: user.kullanici_id,
      username: user.kullanici_adi,
      nameAndSurname: employee.adsoyad,
      task: employee.gorev,
      phone: employee.telefon,
      authorityArea:
        user.genel_merkez == 1
          ? {
              checkboxId: 0,
              checkBoxTitle: "Genel Merkez Personeli",
              dropdownDetail: null,
            }
          : user.genel_merkez == 0 && user.bolge_temsilci_id != 0
          ? getAreaDelegate(user.bolge_temsilci_id)
              .then((areaDelegate) => {
                return {
                  checkboxId: 1,
                  checkBoxTitle: "Bölge Şube Personeli",
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
                  checkBoxTitle: "Şube veya İl Temsilcilik Personeli",
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
                  checkBoxTitle: "İlçe Temsilcilik Personeli",
                  dropdownDetail: {
                    districtDelegateId: districtDelegate.ilce_id,
                    districtDelegateCityId: districtDelegate.il_id,
                    districtDelegate: districtDelegate.ilce,
                  },
                };
              })
              .catch((error) => console.log(error))
          : null,
      authorizations: JSON.parse(user.yetkiler),
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
