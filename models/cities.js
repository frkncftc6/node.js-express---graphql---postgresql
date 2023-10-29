import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const Cities = db.define("t_il", {
  il_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  il: {
    type: sequelize.STRING,
  },
});
