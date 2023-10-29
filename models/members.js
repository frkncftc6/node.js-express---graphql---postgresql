import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const Members = db.define("t_uye", {
  uye_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uye_no: {
    type: sequelize.BIGINT,
  },
  tck: {
    type: sequelize.STRING,
  },
  durum: {
    type: sequelize.BOOLEAN,
  },
  ad: {
    type: sequelize.STRING,
  },
  soyad: {
    type: sequelize.STRING,
  },
  telefon1: {
    type: sequelize.STRING,
  },
  eposta: {
    type: sequelize.STRING,
  },
  sil: {
    type: sequelize.BOOLEAN,
  },
});
