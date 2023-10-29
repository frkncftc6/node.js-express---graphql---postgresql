import "dotenv/config";
import { GraphQLError } from "graphql";
import { Op, literal } from "sequelize";

import {
  getAreaDelegate,
  getCityDelegate,
  getUserWithToken,
  getDistrictDelegate,
  getWorkplaceDelegate,
} from "../../supports/globalFunctions.js";

import { Users } from "../../models/users.js";
import { Members } from "../../models/members.js";
import { ManagerTasks } from "../../models/managerTasks.js";

export const managerUsers = async (_, args, context) => {
  try {
    const { filters } = args;
    const { authHeaders } = context;
    const token = authHeaders.replace("Bearer", "").trim();
    const user = await getUserWithToken(token);
    let userIds;
    async function getUsers(operators) {
      return await Users.findAll({
        where: operators,
        attributes: [
          "kullanici_id",
          "kullanici_adi",
          "genel_merkez",
          "uye_id",
          "gorev_tanimi",
          "bolge_temsilci_id",
          "il_temsilci_id",
          "ilce_temsilci_id",
          "isyeri_temsilci_id",
          "personel",
          "sil",
        ],
        order: [
          [literal("CASE WHEN genel_merkez > 0 THEN 0 ELSE 1 END"), "ASC"],
          "genel_merkez",
          [literal("CASE WHEN bolge_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
          "bolge_temsilci_id",
          [literal("CASE WHEN il_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
          "il_temsilci_id",
          [literal("CASE WHEN ilce_temsilci_id > 0 THEN 0 ELSE 1 END"), "ASC"],
          "ilce_temsilci_id",
          [
            literal("CASE WHEN isyeri_temsilci_id > 0 THEN 0 ELSE 1 END"),
            "ASC",
          ],
          "isyeri_temsilci_id",
        ],
      });
    }

    if (user.genel_merkez != 0) {
      filters == 1
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: { [Op.not]: 0 },
          }))
        : filters == 2
        ? (userIds = await getUsers({
            sil: false,
            bolge_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 3
        ? (userIds = await getUsers({
            sil: false,
            il_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 4
        ? (userIds = await getUsers({
            sil: false,
            ilce_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 5
        ? (userIds = await getUsers({
            sil: false,
            isyeri_temsilci_id: { [Op.not]: 0 },
          }))
        : (userIds = await getUsers({
            sil: false,
            [Op.or]: [
              { genel_merkez: { [Op.not]: 0 } },
              { bolge_temsilci_id: { [Op.not]: 0 } },
              { il_temsilci_id: { [Op.not]: 0 } },
              { ilce_temsilci_id: { [Op.not]: 0 } },
              { isyeri_temsilci_id: { [Op.not]: 0 } },
            ],
          }));
    } else if (user.bolge_temsilci_id != 0) {
      filters == 1
        ? (userIds = [])
        : filters == 2
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolgesi: user.bolgesi,
            bolge_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 3
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolgesi: user.bolgesi,
            il_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 4
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolgesi: user.bolgesi,
            ilce_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 5
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolgesi: user.bolgesi,
            isyeri_temsilci_id: { [Op.not]: 0 },
          }))
        : (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolgesi: user.bolgesi,
            [Op.or]: [
              { bolge_temsilci_id: { [Op.not]: 0 } },
              { il_temsilci_id: { [Op.not]: 0 } },
              { ilce_temsilci_id: { [Op.not]: 0 } },
              { isyeri_temsilci_id: { [Op.not]: 0 } },
            ],
          }));
    } else if (user.il_temsilci_id != 0) {
      filters == 1
        ? (userIds = [])
        : filters == 2
        ? (userIds = [])
        : filters == 3
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            ili: user.ili,
            il_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 4
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            ili: user.ili,
            ilce_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 5
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            ili: user.ili,
            isyeri_temsilci_id: { [Op.not]: 0 },
          }))
        : (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            ili: user.ili,
            [Op.or]: [
              { il_temsilci_id: { [Op.not]: 0 } },
              { ilce_temsilci_id: { [Op.not]: 0 } },
              { isyeri_temsilci_id: { [Op.not]: 0 } },
            ],
          }));
    } else if (user.ilce_temsilci_id != 0) {
      filters == 1
        ? (userIds = [])
        : filters == 2
        ? (userIds = [])
        : filters == 3
        ? (userIds = [])
        : filters == 4
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            il_temsilci_id: 0,
            ili: user.ili,
            ilce_temsilci_id: { [Op.not]: 0 },
          }))
        : filters == 5
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            il_temsilci_id: 0,
            ili: user.ili,
            isyeri_temsilci_id: { [Op.not]: 0 },
          }))
        : (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            il_temsilci_id: 0,
            ili: user.ili,
            [Op.or]: [
              { ilce_temsilci_id: { [Op.not]: 0 } },
              { isyeri_temsilci_id: { [Op.not]: 0 } },
            ],
          }));
    } else if (user.isyeri_temsilci_id != 0) {
      filters == 1
        ? (userIds = [])
        : filters == 2
        ? (userIds = [])
        : filters == 3
        ? (userIds = [])
        : filters == 4
        ? (userIds = [])
        : filters == 5
        ? (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            il_temsilci_id: 0,
            ilce_temsilci_id: 0,
            isyeri_temsilci_id: { [Op.not]: 0 },
          }))
        : (userIds = await getUsers({
            sil: false,
            genel_merkez: 0,
            bolge_temsilci_id: 0,
            il_temsilci_id: 0,
            ilce_temsilci_id: 0,
            [Op.or]: [
              { isyeri_temsilci_id: { [Op.not]: 0 } },
              { bolgesi: user.bolgesi },
              { ili: user.ili },
            ],
          }));
    }

    const membersIds = await Members.findAll({
      where: { sil: false },
      attributes: ["ad", "soyad", "uye_id", "sil"],
    });

    const managerTaskIds = await ManagerTasks.findAll({
      where: { sil: false },
    });

    let managerUsers = [];

    await userIds.map(async (user) => {
      user.personel == 0 &&
        (await membersIds.map(async (member) => {
          if (user.uye_id == member.uye_id) {
            await managerTaskIds.map((managerTask) => {
              if (managerTask.id == user.gorev_tanimi) {
                managerUsers.push({
                  userId: user.kullanici_id,
                  username: user.kullanici_adi,
                  nameAndSurname: `${member.ad} ${member.soyad}`,
                  authorityArea:
                    user.genel_merkez == 1
                      ? "Genel Merkez"
                      : user.genel_merkez == 0 && user.bolge_temsilci_id != 0
                      ? getAreaDelegate(user.bolge_temsilci_id)
                          .then((areaDelegate) => {
                            return areaDelegate.bolge_sube;
                          })
                          .catch((error) => console.log(error))
                      : user.genel_merkez == 0 &&
                        user.bolge_temsilci_id == 0 &&
                        user.il_temsilci_id != 0
                      ? getCityDelegate(user.il_temsilci_id)
                          .then((cityDelegate) => {
                            if (cityDelegate.subemi == 0) {
                              return `${cityDelegate.sube} Temsilciliği`;
                            } else {
                              return `${cityDelegate.sube} Şube`;
                            }
                          })
                          .catch((error) => console.log(error))
                      : user.genel_merkez == 0 &&
                        user.bolge_temsilci_id == 0 &&
                        user.il_temsilci_id == 0 &&
                        user.ilce_temsilci_id != 0
                      ? getDistrictDelegate(user.ilce_temsilci_id)
                          .then((districtDelegate) => {
                            return districtDelegate.ilce;
                          })
                          .catch((error) => console.log(error))
                      : user.genel_merkez == 0 &&
                        user.bolge_temsilci_id == 0 &&
                        user.il_temsilci_id == 0 &&
                        user.ilce_temsilci_id == 0 &&
                        user.isyeri_temsilci_id != 0
                      ? getWorkplaceDelegate(user.isyeri_temsilci_id)
                          .then((workplaceDelegate) => {
                            return workplaceDelegate.isyeri;
                          })
                          .catch((error) => console.log(error))
                      : null,
                  taskDefinition: managerTask.gorevtanimi,
                });
              }
            });
          }
        }));
    });

    return managerUsers;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
