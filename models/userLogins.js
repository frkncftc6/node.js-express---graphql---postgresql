import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const UserLogins = db.define("t_kullanici_giris", {
  kullanici_giris_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  kullanici_id: {
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
