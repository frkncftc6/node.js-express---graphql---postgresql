import "dotenv/config";
import { GraphQLError } from "graphql";

import { Departments } from "../../models/departments.js";
import { AreaDepartments } from "../../models/areaDepartments.js";

export const getLawyerAuthArea = async () => {
  try {
    const departments = await Departments.findAll({
      where: { genelmerkezmi: 0 },
    });
    const areaDepartments = await AreaDepartments.findAll({
      where: { sil: false },
    });
    let lawyerAuthArea = [{ departmentId: 0, department: "Genel Merkez" }];

    await Promise.all(
      areaDepartments.map((areaDepartment) => {
        lawyerAuthArea.push({
          departmentId: areaDepartment.bolge_sube_id,
          department: areaDepartment.bolge_sube,
        });
      })
    );

    await Promise.all(
      departments.map((department) => {
        lawyerAuthArea.push({
          departmentId: department.sube_id,
          department:
            department.subemi == 1
              ? `${department.sube} Şube`
              : `${department.sube} Temsilciliği`,
        });
      })
    );

    return lawyerAuthArea;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
