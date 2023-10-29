import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const SmsNotifications = db.define("t_smsbilgilendirme", {
  id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  deger: {
    type: sequelize.BIGINT,
  },
  mails: {
    type: sequelize.BIGINT,
  },
  adi: {
    type: sequelize.STRING,
  },
});
