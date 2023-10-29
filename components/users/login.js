import "dotenv/config";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import {
  getMember,
  getReadyMessages,
  getSmsApiInformations,
  getSmsNotificationValue,
} from "../../supports/globalFunctions.js";

import { Users } from "../../models/users.js";
import { UserLogins } from "../../models/userLogins.js";

export const login = async (_, args, context) => {
  try {
    const {
      username,
      password,
      digitCode,
      explorer,
      version,
      system,
      timestamp,
    } = args.input;

    const { req } = context;
    const user = await Users.findOne({
      where: { kullanici_adi: username },
      attributes: [
        "kullanici_adi",
        "genel_merkez",
        "uye_id",
        "kullanici_id",
        "sifre",
        "yetkiler",
        "sil",
      ],
    });

    async function createUserLogin() {
      const createdUserLogin = await UserLogins.create({
        kullanici_id: user.kullanici_id,
        tarayici: explorer,
        versiyon: version,
        sistem: system,
        zaman: timestamp,
        ip: req.ip,
      });
      if (createdUserLogin) {
        return createdUserLogin;
      } else {
        return new GraphQLError(
          "Kullanıcı girişi eklenirken bir hata oluştu.",
          {
            extensions: { code: 502 },
          }
        );
      }
    }

    async function getLoginResponse(otpValue) {
      const token = jwt.sign(
        { username: user.kullanici_adi },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
      await user.save();
      const authorizations = await JSON.parse(await user.yetkiler);
      return {
        memberId: await user.uye_id,
        userId: await user.kullanici_id,
        username: await user.kullanici_adi,
        authorizations: await authorizations[0],
        token: await user.token,
        checkOTP: otpValue,
      };
    }

    if (!user) {
      return new GraphQLError("Kullanıcı bulunamadı", {
        extensions: { code: 502 },
      });
    } else if (user.sil) {
      return new GraphQLError("Kullanıcı silinmiş", {
        extensions: { code: 502 },
      });
    } else {
      const checkPassword = await bcrypt.compare(password, await user.sifre);
      if (!checkPassword) {
        return new GraphQLError("Geçersiz parola", {
          extensions: { code: 502 },
        });
      } else {
        const value = await getSmsNotificationValue(13);
        if (value == 1) {
          const member = await getMember(user.uye_id);
          const readyMessage = await getReadyMessages();
          const otpMessage = await readyMessage.otpmesaj;
          const message = otpMessage
            .replace("UYEADSOYAD", `${member.ad} ${member.soyad}`)
            .replace("KOD", digitCode);
          const apiInformation = await getSmsApiInformations();
          const apiURL = `http://panel.1sms.com.tr:8080/api/smsget/v1?username=${apiInformation.smskullaniciadi}&password=${apiInformation.smssifre}&header=${apiInformation.smsheader}&gsm=90${member.telefon1}&message=${message}`;
          const sentSms = await axios.get(apiURL);
          if (sentSms.data == 93) {
            return new GraphQLError(
              "Bir hata oluştu. Daha sonra tekrar deneyiniz.",
              { extensions: { code: 502 } }
            );
          } else {
            const createdUserLogin = await createUserLogin();
            if (createdUserLogin) {
              const response = await getLoginResponse(value);
              return response;
            }
          }
        } else {
          const createdUserLogin = await createUserLogin();
          if (createdUserLogin) {
            const response = await getLoginResponse(value);
            return response;
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
