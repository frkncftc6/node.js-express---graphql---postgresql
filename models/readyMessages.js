import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const ReadyMessages = db.define("t_hazirmesaj", {
  mesajturu: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  otpmesaj: {
    type: sequelize.BIGINT,
  },
});
