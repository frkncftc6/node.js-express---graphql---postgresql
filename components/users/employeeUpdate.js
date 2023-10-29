import "dotenv/config";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

import { getEmployee, getUserWithId } from "../../supports/globalFunctions.js";

import { Users } from "../../models/users.js";
import { Employees } from "../../models/employees.js";

export const employeeUpdate = async (_, args) => {
  try {
    const {
      userId,
      username,
      password,
      nameAndSurname,
      task,
      phone,
      generalCenter,
      areaDepartment,
      cityDelegate,
      districtDelegate,
      authorizations,
    } = args.input;
    const user = await getUserWithId(userId);
    const employee = await getEmployee(user.personel);

    async function generateHashPassword(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }

    async function convertStringAuthorizations(authorizations) {
      let auths = [];
      auths.push(authorizations);
      return JSON.stringify(auths);
    }

    if (username) {
      try {
        const checkUser = await Users.findOne({
          where: { kullanici_adi: username },
        });
        if (!checkUser) {
          user.kullanici_adi = username;
        } else {
          return new GraphQLError("Farklı bir kullanıcı adı ile deneyin.", {
            extensions: { code: 502 },
          });
        }
      } catch (error) {
        console.log(error);
        return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
          extensions: { code: 502 },
        });
      }
    }

    if (phone) {
      try {
        const checkPhone = await Employees.findOne({
          where: { telefon: phone },
        });
        if (!checkPhone) {
          employee.telefon = phone;
        } else {
          return new GraphQLError("Farklı bir telefon numarası ile deneyin.", {
            extensions: { code: 502 },
          });
        }
      } catch (error) {
        console.log(error);
        return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
          extensions: { code: 502 },
        });
      }
    }

    password && (user.sifre = await generateHashPassword(password));
    nameAndSurname && (employee.adsoyad = nameAndSurname);
    task && (employee.gorev = task);
    generalCenter && (user.genel_merkez = generalCenter);
    areaDepartment && (user.bolge_temsilci_id = areaDepartment);
    cityDelegate && (user.il_temsilci_id = cityDelegate);
    districtDelegate && (user.ilce_temsilci_id = districtDelegate);
    authorizations &&
      (user.yetkiler = await convertStringAuthorizations(authorizations));

    await user.save();
    await employee.save();

    return {
      userId: user.kullanici_id,
      username: user.kullanici_adi,
      message: `${user.kullanici_adi} profilinin güncellenmesi tamamlandı.`,
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
