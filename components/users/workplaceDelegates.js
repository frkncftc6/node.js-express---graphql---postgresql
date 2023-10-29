import "dotenv/config";
import { GraphQLError } from "graphql";

import { Cities } from "../../models/cities.js";
import { WorkplaceDelegates } from "../../models/workplaceDelegates.js";
import { UniversitiesDistricts } from "../../models/universitiesDistricts.js";

export const workplaceDelegates = async () => {
  try {
    async function getWorkplaceDelegateWithDistrictId(districtId) {
      let workplaces = [];
      const findWorkplaces = await WorkplaceDelegates.findAll({
        where: { ilce_id: districtId, sil: false },
      });
      await Promise.all(
        findWorkplaces.map(async (workplace) => {
          workplaces.push({
            id: workplace.isyeri_temsilci_id,
            workplace: workplace.isyeri,
          });
        })
      );
      if (workplaces.length !== 0) {
        return workplaces;
      }
    }
    async function getDistrictDelegateWithCityId(cityId) {
      let districts = [];
      const findDistricts = await UniversitiesDistricts.findAll({
        where: { il_id: cityId },
      });
      await Promise.all(
        findDistricts.map(async (district) => {
          districts.push({
            id: district.ilce_id,
            district: district.ilce,
            workplaces: await getWorkplaceDelegateWithDistrictId(
              district.ilce_id
            ),
          });
        })
      );
      return districts;
    }
    let workplaceDelegates = [];
    const cities = await Cities.findAll();
    await Promise.all(
      cities.map(async (city) => {
        workplaceDelegates.push({
          id: city.il_id,
          cityName: city.il,
          districts: await getDistrictDelegateWithCityId(city.il_id),
        });
      })
    );
    return workplaceDelegates;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
