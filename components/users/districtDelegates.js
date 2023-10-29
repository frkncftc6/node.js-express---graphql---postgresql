import "dotenv/config";
import { GraphQLError } from "graphql";

import { Cities } from "../../models/cities.js";
import { UniversitiesDistricts } from "../../models/universitiesDistricts.js";

export const districtDelegates = async () => {
  try {
    async function getDistrictDelegateWithCityId(cityId) {
      let districts = [];
      const findDistricts = await UniversitiesDistricts.findAll({
        where: { il_id: cityId },
      });
      await Promise.all(
        findDistricts.map((district) => {
          districts.push({
            id: district.ilce_id,
            district: district.ilce,
          });
        })
      );
      return districts;
    }
    let districtDelegates = [];
    const cities = await Cities.findAll();
    await Promise.all(
      cities.map(async (city) => {
        districtDelegates.push({
          id: city.il_id,
          cityName: city.il,
          districts: await getDistrictDelegateWithCityId(city.il_id),
        });
      })
    );
    return districtDelegates;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
