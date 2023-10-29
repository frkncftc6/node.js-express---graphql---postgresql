import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const ManagerTasks = db.define("t_yonetici_gorevleri", {
  id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  gorevtanimi: {
    type: sequelize.STRING,
  },
  sil: {
    type: sequelize.BOOLEAN,
  },
});
