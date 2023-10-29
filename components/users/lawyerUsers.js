import "dotenv/config";
import { GraphQLError } from "graphql";

import { LawLawyers } from "../../models/lawLawyers.js";
import { UniversitiesDistricts } from "../../models/universitiesDistricts.js";

export const lawyerUsers = async (_, args) => {
  try {
    const { filters } = args;
    const lawyerIds = await LawLawyers.findAll({ where: { sil: false } });
    const lawyers = [];

    const addLawyers = (item) => {
      lawyers.push({
        lawyerId: item.avukat_id,
        nameAndSurname: item.ad_soyad,
        username: item.kullanici_adi,
        phone: item.telefon,
        departments: JSON.parse(item.bolge_yetki),
        status: item.deger,
      });
    };

    const checkUniversityDistrict = async (cityId, item, filter) => {
      try {
        const univercityDistrict = await UniversitiesDistricts.findOne({
          where: { il_id: cityId },
        });

        if (univercityDistrict) {
          if (filter == 2 && univercityDistrict.bolge_id == 0) {
            const includeLawyers = lawyers.find(
              (law) => law.lawyerId === item.avukat_id
            );
            if (!includeLawyers) {
              addLawyers(item);
            }
          }
          if (filter == 3 && univercityDistrict.bolge_id != 0) {
            const includeLawyers = lawyers.find(
              (law) => law.lawyerId === item.avukat_id
            );
            if (!includeLawyers) {
              addLawyers(item);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    for (const lawyer of lawyerIds) {
      if (!filters) {
        addLawyers(lawyer);
      } else {
        const auths = JSON.parse(lawyer.bolge_yetki);
        for (const auth of auths) {
          if (filters == 1) {
            auth.departmentId == 0 && addLawyers(lawyer);
          } else {
            auth.departmentId != 0 &&
              (await checkUniversityDistrict(
                auth.departmentId,
                lawyer,
                filters
              ));
          }
        }
      }
    }

    if (lawyers.length !== 0) {
      return lawyers;
    }
  } catch (error) {
    console.error(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
