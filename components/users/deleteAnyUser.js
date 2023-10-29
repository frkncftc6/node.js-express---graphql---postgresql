import "dotenv/config";
import { GraphQLError } from "graphql";

import { Users } from "../../models/users.js";
import { Employees } from "../../models/employees.js";
import { LawLawyers } from "../../models/lawLawyers.js";
import { LawAdmins } from "../../models/lawAdmins.js";

export const deleteAnyUser = async (_, args) => {
  try {
    const { userId, employeeId, lawyerId, lawAdminId } = args.input;

    if (userId) {
      const user = await Users.findOne({
        where: { kullanici_id: userId },
      });
      user.sil = true;
      await user.save();
      return {
        userId: user.kullanici_id,
        message: `Kullanıcı silindi.`,
      };
    }

    if (employeeId) {
      const employee = await Employees.findOne({
        where: { personel_id: employeeId },
      });
      employee.sil = true;
      await employee.save();
      return {
        userId: employee.personel_id,
        message: `Personel silindi.`,
      };
    }

    if (lawyerId) {
      const lawyer = await LawLawyers.findOne({
        where: { avukat_id: lawyerId },
      });
      lawyer.sil = true;
      await lawyer.save();
      return {
        userId: lawyer.personel_id,
        message: `Avukat silindi.`,
      };
    }

    if (lawAdminId) {
      const lawAdmin = await LawAdmins.findOne({
        where: { id: lawAdminId },
      });
      lawAdmin.sil = 1;
      await lawAdmin.save();
      return {
        userId: lawAdmin.id,
        message: `Hukuk yöneticisi silindi.`,
      };
    }
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
