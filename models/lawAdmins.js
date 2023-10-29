import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const LawAdmins = db.define("t_hukuk_admin", {
  id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ad_soyad: {
    type: sequelize.STRING,
  },
  telefon: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
  },
  durum: {
    type: sequelize.SMALLINT,
  },
  sil: {
    type: sequelize.SMALLINT,
  },
  genel_merkez: {
    type: sequelize.INTEGER,
  },
  bolge_temsilci_id: {
    type: sequelize.INTEGER,
  },
  il_temsilci_id: {
    type: sequelize.INTEGER,
  },
  ilce_temsilci_id: {
    type: sequelize.INTEGER,
  },
  personel: {
    type: sequelize.INTEGER,
  },
  ili: {
    type: sequelize.INTEGER,
  },
  bolgesi: {
    type: sequelize.INTEGER,
  },
});
