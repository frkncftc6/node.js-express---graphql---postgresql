import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const Employees = db.define("t_personel", {
  personel_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  adsoyad: {
    type: sequelize.STRING,
  },
  telefon: {
    type: sequelize.STRING,
  },
  gorev: {
    type: sequelize.STRING,
  },
  sil: {
    type: sequelize.BOOLEAN,
  },
});
