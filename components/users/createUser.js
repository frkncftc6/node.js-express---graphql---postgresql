import "dotenv/config";
import bcrypt from "bcrypt";
import { extname } from "path";
import { GraphQLError } from "graphql";
import { createWriteStream } from "fs";

import { Users } from "../../models/users.js";
import { Members } from "../../models/members.js";

export const createUser = async (_, args) => {
  try {
    const {
      taskDefination,
      username,
      password,
      phone,
      memberId,
      generalCenter,
      areaDepartment,
      cityDelegate,
      districtDelegate,
      workplaceDelegate,
      authorizations,
      profilePhoto,
    } = args.input;

    async function processUpload(upload) {
      const { createReadStream, filename, mimetype } = await upload;
      const allowedExtensions = [".jpeg", ".jpg", ".png"];
      const fileExtension = extname(filename).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return new GraphQLError("Geçersiz dosya tipi", {
          extensions: { code: 502 },
        });
      }
      const timestamp = new Date().getTime();
      const newFilename = `${timestamp}${fileExtension}`;
      const path = `public/profilePhotos/${newFilename}`;
      const stream = createReadStream();
      return new Promise((resolve, reject) =>
        stream
          .pipe(createWriteStream(path))
          .on("finish", () => resolve(newFilename))
          .on("error", (error) => reject(error))
      );
    }

    const user = await Users.findOne({
      where: { kullanici_adi: username },
    });

    //TO-DO =>>> İLİ VE BÖLGESİ EKLENİRKEN İLÇE VE İŞYERİ DE KONTROL ETMELİ

    if (!user) {
      const member = await Members.findOne({
        where: { uye_id: memberId },
      });
      member.telefon1 = phone;
      await member.save();
      let auths = [];
      auths.push(authorizations);
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await Users.create({
        kullanici_adi: username,
        sifre: hashedPassword,
        gorev_tanimi: taskDefination,
        uye_id: memberId,
        genel_merkez: generalCenter == null ? 0 : generalCenter,
        bolge_temsilci_id: areaDepartment == null ? 0 : areaDepartment,
        il_temsilci_id: cityDelegate == null ? 0 : cityDelegate,
        ilce_temsilci_id: districtDelegate == null ? 0 : districtDelegate,
        isyeri_temsilci_id: workplaceDelegate == null ? 0 : workplaceDelegate,
        personel: 0,
        ili: cityDelegate == null ? 0 : cityDelegate,
        bolgesi: areaDepartment == null ? 0 : areaDepartment,
        sil: false,
        yetkiler: JSON.stringify(auths),
        profilePhoto: profilePhoto ? await processUpload(profilePhoto) : null,
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
};
