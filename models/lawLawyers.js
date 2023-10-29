import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const LawLawyers = db.define("t_hukuk_avukat", {
  avukat_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ad_soyad: {
    type: sequelize.STRING,
  },
  kullanici_adi: {
    type: sequelize.STRING,
  },
  sifre: {
    type: sequelize.STRING,
  },
  sil:{
    type: sequelize.BOOLEAN,
  },
  telefon:{
    type: sequelize.STRING,
  },
  yetki_bolge:{
    type: sequelize.STRING,
  },
  yetki_bolge2:{
    type: sequelize.STRING,
  },
  yetki_bolge3:{
    type: sequelize.STRING,
  },
  yetki_bolge4:{
    type: sequelize.STRING,
  },
  yetki_bolge5:{
    type: sequelize.STRING,
  },
  yetki_bolge6:{
    type: sequelize.STRING,
  },
  yetki_bolge7:{
    type: sequelize.STRING,
  },
  yetki_bolge8:{
    type: sequelize.STRING,
  },
  yetki_bolge9:{
    type: sequelize.STRING,
  },
  yetki_bolge10:{
    type: sequelize.STRING,
  },
  deger: {
    type: sequelize.INTEGER,
  },
  bolge_yetki:{
    type: sequelize.STRING,
  },
});
