import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const SmsSents = db.define("t_smsent", {
  id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  deger: {
    type: sequelize.BIGINT,
  },
  smskullaniciadi: {
    type: sequelize.STRING,
  },
  smssifre: {
    type: sequelize.STRING,
  },
  smsheader: {
    type: sequelize.STRING,
  },
});
