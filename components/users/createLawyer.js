import "dotenv/config";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

import { LawLawyers } from "../../models/lawLawyers.js";

export const createLawyer = async (_, args) => {
  try {
    const { areaAuths, nameAndSurname, username, password, phone } = args.input;
    const checkUsername = await LawLawyers.findOne({
      where: { kullanici_adi: username, sil: false },
    });
    const checkPhone = await LawLawyers.findOne({
      where: { telefon: phone, sil: false },
    });
    if (checkUsername || checkPhone) {
      return new GraphQLError(
        "Farklı bir kullanıcı adı veya telefon numarası ile deneyin.",
        {
          extensions: { code: 502 },
        }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdLawyer = await LawLawyers.create({
        ad_soyad: nameAndSurname,
        kullanici_adi: username,
        sifre: hashedPassword,
        sil: false,
        telefon: phone,
        deger: 1,
        bolge_yetki: JSON.stringify(areaAuths),
      });
      if (createdLawyer) {
        return {
          username: createdLawyer.kullanici_adi,
          areaAuths: JSON.parse(createdLawyer.bolge_yetki),
        };
      } else {
        return new GraphQLError("Avukat eklenirken bir hata oluştu.", {
          extensions: { code: 502 },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
