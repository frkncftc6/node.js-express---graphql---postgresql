import "dotenv/config";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

import { Users } from "../../models/users.js";
import { Employees } from "../../models/employees.js";

export const createEmployee = async (_, args) => {
  try {
    const {
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

    const user = await Users.findOne({
      where: { kullanici_adi: username },
    });

    const employee = await Employees.findOne({
      where: { telefon: phone },
    });

    //TO-DO =>>> İLİ VE BÖLGESİ EKLENİRKEN İLÇE VE İŞYERİ DE KONTROL ETMELİ

    if (!user && !employee) {
      const createdEmployee = await Employees.create({
        adsoyad: nameAndSurname,
        telefon: phone,
        gorev: task,
        sil: false,
      });
      if (createdEmployee) {
        let auths = [];
        auths.push(authorizations);
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await Users.create({
          kullanici_adi: username,
          sifre: hashedPassword,
          gorev_tanimi: 9999,
          uye_id: 0,
          genel_merkez: generalCenter == null ? 0 : generalCenter,
          bolge_temsilci_id: areaDepartment == null ? 0 : areaDepartment,
          il_temsilci_id: cityDelegate == null ? 0 : cityDelegate,
          ilce_temsilci_id: districtDelegate == null ? 0 : districtDelegate,
          personel: createdEmployee.personel_id,
          ili: cityDelegate == null ? 0 : cityDelegate,
          bolgesi: areaDepartment == null ? 0 : areaDepartment,
          sil: false,
          yetkiler: JSON.stringify(auths),
        });

        const createdUserAuthorizations = JSON.parse(createdUser.yetkiler);

        if (createdUser) {
          return {
            username: createdUser.kullanici_adi,
            authorizations: createdUserAuthorizations[0],
          };
        } else {
          return new GraphQLError("Kullanıcı eklenirken bir hata oluştu.", {
            extensions: { code: 502 },
          });
        }
      } else {
        return new GraphQLError("Personel eklenirken bir hata oluştu.", {
          extensions: { code: 502 },
        });
      }
    } else {
      return new GraphQLError(
        "Farklı bir kullanıcı adı veya telefon numarası ile deneyin.",
        {
          extensions: { code: 502 },
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
