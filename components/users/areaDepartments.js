import "dotenv/config";
import { GraphQLError } from "graphql";

import { AreaDepartments } from "../../models/areaDepartments.js";

export const areaDepartments = async () => {
  try {
    const areaDepartmentsIds = await AreaDepartments.findAll({
      where: { sil: false },
    });
    let areaDepartments = [];
    await areaDepartmentsIds.map((areaDepartment) => {
      areaDepartments.push({
        id: areaDepartment.bolge_sube_id,
        areaDepartment: areaDepartment.bolge_sube,
      });
    });
    return areaDepartments;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
