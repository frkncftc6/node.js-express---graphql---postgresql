import "dotenv/config";
import bcrypt from "bcrypt";
import { extname } from "path";
import { GraphQLError } from "graphql";
import { createWriteStream } from "fs";

import { getMember, getUserWithId } from "../../supports/globalFunctions.js";

import { Users } from "../../models/users.js";
import { Members } from "../../models/members.js";

export const userUpdate = async (_, args) => {
  try {
    const {
      userId,
      taskDefination,
      username,
      password,
      phone,
      generalCenter,
      areaDepartment,
      cityDelegate,
      districtDelegate,
      workplaceDelegate,
      authorizations,
      profilePhoto,
      signature,
    } = args.input;
    const user = await getUserWithId(userId);
    const member = await getMember(user.uye_id);

    async function generateHashPassword(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }

    async function convertStringAuthorizations(authorizations) {
      let auths = [];
      auths.push(authorizations);
      return JSON.stringify(auths);
    }

    async function processUpload(upload, section) {
      const { createReadStream, filename, mimetype } = await upload;
      const allowedExtensions =
        section == "profile" ? [".jpeg", ".jpg", ".png"] : [".png"];
      const fileExtension = extname(filename).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return new GraphQLError("Geçersiz dosya tipi", {
          extensions: { code: 502 },
        });
      }
      const timestamp = new Date().getTime();
      const newFilename = `${timestamp}${fileExtension}`;
      const path =
        section == "profile"
          ? `public/profilePhotos/${newFilename}`
          : `public/signatures/${newFilename}`;
      const stream = createReadStream();
      return new Promise((resolve, reject) =>
        stream
          .pipe(createWriteStream(path))
          .on("finish", () => resolve(newFilename))
          .on("error", (error) => reject(error))
      );
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
        const checkPhone = await Members.findOne({
          where: { telefon1: phone },
        });
        if (!checkPhone) {
          member.telefon1 = phone;
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

    taskDefination && (user.gorev_tanimi = taskDefination);
    password && (user.sifre = await generateHashPassword(password));
    generalCenter && (user.genel_merkez = generalCenter);
    areaDepartment && (user.bolge_temsilci_id = areaDepartment);
    cityDelegate && (user.il_temsilci_id = cityDelegate);
    districtDelegate && (user.ilce_temsilci_id = districtDelegate);
    workplaceDelegate && (user.isyeri_temsilci_id = workplaceDelegate);
    authorizations &&
      (user.yetkiler = await convertStringAuthorizations(authorizations));
    profilePhoto &&
      (user.profilePhoto = await processUpload(profilePhoto, "profile"));
    signature && (user.imza = await processUpload(signature, "signature"));

    await user.save();
    await member.save();

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
