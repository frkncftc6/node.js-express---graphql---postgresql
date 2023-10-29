import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const LawAdminSettings = db.define("t_hukuk_admin_ayar", {
  id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  deger: {
    type: sequelize.BIGINT,
  },
  gmerkez: {
    type: sequelize.INTEGER,
  },
  adi: {
    type: sequelize.STRING,
  },
});
