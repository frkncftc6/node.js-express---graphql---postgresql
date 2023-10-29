import "dotenv/config";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

import { getLawyerAuthArea } from "../users/getLawyerAuthArea.js";
import { getReadyMessages } from "../../supports/globalFunctions.js";

import { Users } from "../../models/users.js";
import { LawLawyers } from "../../models/lawLawyers.js";
import { Departments } from "../../models/departments.js";
import { AreaDepartments } from "../../models/areaDepartments.js";
import { UniversitiesDistricts } from "../../models/universitiesDistricts.js";

export const checkUserAuthrozitaions = async (_, args) => {
  try {
    const { id } = args;
    const user = await Users.findOne({ where: { kullanici_id: id } });
    const authorizations = await JSON.parse(user.yetkiler);
    return authorizations[0];
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};

export const updateAuth = async () => {
  try {
    const userIds = await Users.findAll();

    async function updateAuthorizationColumn(data, userId) {
      const updateUser = await Users.update(
        { yetkiler: JSON.stringify(data) },
        { where: { kullanici_id: userId } }
      );
      if (updateUser != 1) {
        return;
      }
    }

    await userIds.map(async (user) => {
      let authArray = [];
      authArray.push({
        yeni_uye: user.yeni_uye,
        uye_silme: user.uye_silme,
        uye_paneli: user.uye_paneli,
        istifa_giris_yetkisi: user.istifa_giris_yetkisi,
        delege_duzenleme: user.delege_duzenleme,
        tc_yetkisi: user.tc_yetkisi,
        uye_karti_guncelleme: user.uye_karti_guncelleme,
        aidat_sorgu: user.aidat_sorgu,
        toplu_aidat: user.toplu_aidat,
        onay_aidat: user.onay_aidat,
        kbs_sorumlusu: user.kbs_sorumlusu,
        sms_gonderme_yetkisi: user.sms_gonderme_yetkisi,
        sms_onay_yetkisi: user.sms_onay_yetkisi,
        mobil_sorumlusu: user.mobil_sorumlusu,
        karar_girisi_yetkili: user.karar_girisi_yetkili,
        karar_izleme: user.karar_izleme,
        belge_olusturma: user.belge_olusturma,
        gelen_giden_evrak_yetki: user.gelen_giden_evrak_yetki,
        gelen_giden_evrak_izle: user.gelen_giden_evrak_izle,
        demzim_sorumlusu: user.demzim_sorumlusu,
        hukuk_sorumlusu: user.hukuk_sorumlusu,
        hukuk_izle: user.hukuk_izle,
        muhasebe_sorumlusu: user.muhasebe_sorumlusu,
        muhasebe_izle: user.muhasebe_izle,
        mail_sorumlusu: user.mail_sorumlusu,
        kullanici_ekleme: user.kullanici_ekleme,
        genel_ayarlar: user.genel_ayarlar,
        istifa_onaylama_yetkisi: user.istifa_onaylama_yetkisi,
        ayar2: user.ayar2,
        ayar3: user.ayar3,
        ayar4: user.ayar4,
        ayar5: user.ayar5,
        ayar6: user.ayar6,
        ayar7: user.ayar7,
        ayar8: user.ayar8,
        ayar9: user.ayar9,
        ayar10: user.ayar10,
        ayar11: user.ayar11,
        ayar12: user.ayar12,
        ayar13: user.ayar13,
      });

      await updateAuthorizationColumn(authArray, user.kullanici_id);
    });

    return "success";
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};

export const updatePassword = async () => {
  try {
    const userIds = await Users.findAll();

    await userIds.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.sifre, 10);
      const updateUser = await Users.update(
        { sifre: hashedPassword },
        { where: { kullanici_id: user.kullanici_id } }
      );
      if (updateUser != 1) {
        return;
      }
    });

    return "success";
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};

export const updateOtpMessage = async () => {
  try {
    const readyMessage = await getReadyMessages();
    const message = "Sayın UYEADSOYAD, tek kullanımlık şifreniz: KOD";
    readyMessage.otpmesaj = message;
    await readyMessage.save();
    return "success";
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};

export const updateLawyerAuth = async () => {
  try {
    const lawyerIds = await LawLawyers.findAll();
    const authAreas = await getLawyerAuthArea();

    async function getDepartment(id) {
      const univercityDistrict = await UniversitiesDistricts.findOne({
        where: { il_id: id },
      });
      if (univercityDistrict.bolge_id == 0) {
        const department = await Departments.findOne({
          where: { sube_id: id },
        });
        if (department.subemi == 1) {
          return `${department.sube} Şube`;
        } else {
          return `${department.sube} Temsilciliği`;
        }
      } else {
        const areaDepartment = await AreaDepartments.findOne({
          where: { bolge_sube_id: id },
        });
        return areaDepartment.bolge_sube;
      }
    }

    async function updateAuthorizationAreaColumn(authArray, id) {
      const lawyer = await LawLawyers.findOne({
        where: { avukat_id: id },
      });
      lawyer.bolge_yetki = JSON.stringify(authArray);
      await lawyer.save();
    }

    await lawyerIds.map(async (lawyer) => {
      let authArray = [];
      if (lawyer.yetki_bolge) {
        const department =
          lawyer.yetki_bolge == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge);

        authArray.push({
          departmentId: lawyer.yetki_bolge,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge2) {
        const department =
          lawyer.yetki_bolge2 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge2);

        authArray.push({
          departmentId: lawyer.yetki_bolge2,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge3) {
        const department =
          lawyer.yetki_bolge3 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge3);

        authArray.push({
          departmentId: lawyer.yetki_bolge3,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge4) {
        const department =
          lawyer.yetki_bolge4 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge4);

        authArray.push({
          departmentId: lawyer.yetki_bolge4,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge5) {
        const department =
          lawyer.yetki_bolge5 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge5);

        authArray.push({
          departmentId: lawyer.yetki_bolge5,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge6) {
        const department =
          lawyer.yetki_bolge6 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge6);

        authArray.push({
          departmentId: lawyer.yetki_bolge6,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge7) {
        const department =
          lawyer.yetki_bolge7 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge7);

        authArray.push({
          departmentId: lawyer.yetki_bolge7,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge8) {
        const department =
          lawyer.yetki_bolge8 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge8);

        authArray.push({
          departmentId: lawyer.yetki_bolge8,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge9) {
        const department =
          lawyer.yetki_bolge9 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge9);

        authArray.push({
          departmentId: lawyer.yetki_bolge9,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }
      if (lawyer.yetki_bolge10) {
        const department =
          lawyer.yetki_bolge10 == 0
            ? "Genel Merkez"
            : await getDepartment(lawyer.yetki_bolge10);

        authArray.push({
          departmentId: lawyer.yetki_bolge10,
          department,
          index: authAreas.findIndex((item) => item.department == department),
        });
      }

      await updateAuthorizationAreaColumn(authArray, lawyer.avukat_id);
    });

    return "success";
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};

export const updateLawyerPassword = async () => {
  try {
    const lawyerIds = await LawLawyers.findAll();

    async function updatePassword(id, hashedPassword) {
      const lawyer = await LawLawyers.findOne({
        where: { avukat_id: id },
      });

      lawyer.sifre = hashedPassword;
      await lawyer.save();
    }

    await lawyerIds.map(async (lawyer) => {
      const hashedPassword = await bcrypt.hash(lawyer.sifre, 10);
      await updatePassword(lawyer.avukat_id, hashedPassword);
    });

    return "success";
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
