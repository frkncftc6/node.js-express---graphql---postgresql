import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const MemberLogins = db.define("t_uye_giris", {
  uye_giris_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uye_id: {
    type: sequelize.BIGINT,
  },
  tarayici: {
    type: sequelize.STRING,
  },
  versiyon: {
    type: sequelize.STRING,
  },
  sistem: {
    type: sequelize.STRING,
  },
  zaman: {
    type: sequelize.BIGINT,
  },
  ip: {
    type: sequelize.STRING,
  },
});
