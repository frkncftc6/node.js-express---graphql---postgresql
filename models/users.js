import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const Users = db.define("t_kullanici", {
  kullanici_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  kullanici_adi: {
    type: sequelize.STRING,
  },
  sifre: {
    type: sequelize.STRING,
  },
  imza: {
    type: sequelize.STRING,
  },
  gorev_tanimi: {
    type: sequelize.BIGINT,
  },
  uye_id: {
    type: sequelize.BIGINT,
  },
  genel_merkez: {
    type: sequelize.BIGINT,
  },
  bolge_temsilci_id: {
    type: sequelize.BIGINT,
  },
  il_temsilci_id: {
    type: sequelize.BIGINT,
  },
  ilce_temsilci_id: {
    type: sequelize.BIGINT,
  },
  isyeri_temsilci_id: {
    type: sequelize.BIGINT,
  },
  personel: {
    type: sequelize.BIGINT,
  },
  ili: {
    type: sequelize.BIGINT,
  },
  sil: {
    type: sequelize.BOOLEAN,
  },
  bolgesi: {
    type: sequelize.BIGINT,
  },
  yetkiler: {
    type: sequelize.STRING,
  },
  token: {
    type: sequelize.STRING,
  },
  profilePhoto: {
    type: sequelize.STRING,
  },
  yeni_uye: {
    type: sequelize.BIGINT,
  },
  uye_silme: {
    type: sequelize.BIGINT,
  },
  uye_paneli: {
    type: sequelize.BIGINT,
  },
  istifa_giris_yetkisi: {
    type: sequelize.BIGINT,
  },
  delege_duzenleme: {
    type: sequelize.BIGINT,
  },
  tc_yetkisi: {
    type: sequelize.BIGINT,
  },
  uye_karti_guncelleme: {
    type: sequelize.BIGINT,
  },
  aidat_sorgu: {
    type: sequelize.BIGINT,
  },
  toplu_aidat: {
    type: sequelize.BIGINT,
  },
  onay_aidat: {
    type: sequelize.BIGINT,
  },
  kbs_sorumlusu: {
    type: sequelize.BIGINT,
  },
  sms_gonderme_yetkisi: {
    type: sequelize.BIGINT,
  },
  sms_onay_yetkisi: {
    type: sequelize.BIGINT,
  },
  mobil_sorumlusu: {
    type: sequelize.BIGINT,
  },
  karar_girisi_yetkili: {
    type: sequelize.BIGINT,
  },
  karar_izleme: {
    type: sequelize.BIGINT,
  },
  belge_olusturma: {
    type: sequelize.BIGINT,
  },
  gelen_giden_evrak_yetki: {
    type: sequelize.BIGINT,
  },
  gelen_giden_evrak_izle: {
    type: sequelize.BIGINT,
  },
  demzim_sorumlusu: {
    type: sequelize.BIGINT,
  },
  hukuk_sorumlusu: {
    type: sequelize.BIGINT,
  },
  hukuk_izle: {
    type: sequelize.BIGINT,
  },
  muhasebe_sorumlusu: {
    type: sequelize.BIGINT,
  },
  muhasebe_izle: {
    type: sequelize.BIGINT,
  },
  mail_sorumlusu: {
    type: sequelize.BIGINT,
  },
  kullanici_ekleme: {
    type: sequelize.BIGINT,
  },
  genel_ayarlar: {
    type: sequelize.BIGINT,
  },
  istifa_onaylama_yetkisi: {
    type: sequelize.BIGINT,
  },
  ayar2: {
    type: sequelize.BIGINT,
  },
  ayar3: {
    type: sequelize.BIGINT,
  },
  ayar4: {
    type: sequelize.BIGINT,
  },
  ayar5: {
    type: sequelize.BIGINT,
  },
  ayar6: {
    type: sequelize.BIGINT,
  },
  ayar7: {
    type: sequelize.BIGINT,
  },
  ayar8: {
    type: sequelize.BIGINT,
  },
  ayar9: {
    type: sequelize.BIGINT,
  },
  ayar10: {
    type: sequelize.BIGINT,
  },
  ayar11: {
    type: sequelize.BIGINT,
  },
  ayar12: {
    type: sequelize.BIGINT,
  },
  ayar13: {
    type: sequelize.BIGINT,
  },
});
