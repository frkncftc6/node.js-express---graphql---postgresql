import "dotenv/config";
import jwt from "jsonwebtoken";
import { rule } from "graphql-shield";
import { getUserWithToken } from "../supports/globalFunctions.js";
import { GraphQLError } from "graphql";

export const isAuthorized = rule()(async (_, args, context) => {
  try {
    let { authHeaders } = context;
    if (!authHeaders) {
      return new GraphQLError("Token bulunamadı.", {
        extensions: { code: 502 },
      });
    }
    const token = authHeaders.replace("Bearer", "").trim();
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return new GraphQLError("Yetkisiz kullanıcı", {
        extensions: { code: 502 },
      });
    }
    const user = await getUserWithToken(token);
    if (!user) {
      return new GraphQLError("Kullanıcı bulunamadı.", {
        extensions: { code: 502 },
      });
    }
    return decodedToken.username === user.kullanici_adi;
  } catch (error) {
    console.log(error);
    if (error.message == "jwt expired") {
      return new GraphQLError("Token süresi doldu.", {
        extensions: { code: 502 },
      });
    } else if (error.message == "invalid token") {
      return new GraphQLError("Geçersiz token", {
        extensions: { code: 502 },
      });
    }
    return new GraphQLError("Bir hata oluştu.", {
      extensions: { code: 502 },
    });
  }
});
