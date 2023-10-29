import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const AreaDepartments = db.define("t_bolge_sube", {
  bolge_sube_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bolge_sube: {
    type: sequelize.STRING,
  },
  sil: {
    type: sequelize.BOOLEAN,
  },
});
