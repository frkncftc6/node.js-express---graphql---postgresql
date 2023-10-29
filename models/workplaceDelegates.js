import { db } from "../utils/database.js";
import sequelize from "sequelize";

export const WorkplaceDelegates = db.define("t_isyeri_temsilcisi", {
  isyeri_temsilci_id: {
    type: sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  bolge_sube_id: {
    type: sequelize.BIGINT,
  },
  il_id: {
    type: sequelize.INTEGER,
  },
  ilce_id: {
    type: sequelize.INTEGER,
  },
  isyeri: {
    type: sequelize.STRING,
  },
  sil: {
    type: sequelize.BOOLEAN,
  },
  isyeri_id: {
    type: sequelize.STRING,
  },
});
