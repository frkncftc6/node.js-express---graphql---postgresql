import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const UniversitiesDistricts = db.define("t_universiteler_ilce", {
  ilce_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  il_id: {
    type: sequelize.BIGINT,
  },
  ilce: {
    type: sequelize.STRING,
  },
  okid: {
    type: sequelize.BIGINT,
  },
  bolge_id: {
    type: sequelize.BIGINT,
  },
});
