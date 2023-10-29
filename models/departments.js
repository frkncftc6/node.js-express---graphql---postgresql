import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const Departments = db.define("t_subeler", {
  sube_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  subemi: {
    type: sequelize.BIGINT,
  },
  genelmerkezmi: {
    type: sequelize.BIGINT,
  },
  sube: {
    type: sequelize.STRING,
  },
});
