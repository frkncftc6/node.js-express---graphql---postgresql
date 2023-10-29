import "dotenv/config";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

import { LawLawyers } from "../../models/lawLawyers.js";

export const updateLawyer = async (_, args) => {
  try {
    const {
      lawyerId,
      status,
      areaAuths,
      nameAndSurname,
      phone,
      username,
      password,
    } = args.input;
    const lawyer = await LawLawyers.findOne({
      where: { avukat_id: lawyerId },
    });

    async function generateHashPassword(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }

    if (username) {
      try {
        const checkUsername = await LawLawyers.findOne({
          where: { kullanici_adi: username },
        });
        if (!checkUsername) {
          lawyer.kullanici_adi = username;
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
        const checkPhone = await LawLawyers.findOne({
          where: { telefon: phone },
        });
        if (!checkPhone) {
          lawyer.telefon = phone;
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

    status && (lawyer.deger = status);
    areaAuths && (lawyer.bolge_yetki = JSON.stringify(areaAuths));
    nameAndSurname && (lawyer.ad_soyad = nameAndSurname);
    password && (lawyer.sifre = await generateHashPassword(password));

    await lawyer.save();

    return {
      lawyerId: lawyer.avukat_id,
      username: lawyer.kullanici_adi,
      message: `${lawyer.kullanici_adi} profilinin güncellenmesi tamamlandı.`,
    };
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
