import "dotenv/config";
import { GraphQLError } from "graphql";

import { ManagerTasks } from "../../models/managerTasks.js";

export const managerTasks = async () => {
  try {
    const managerTaskIds = await ManagerTasks.findAll({
      where: { sil: false },
    });
    let managerTasks = [];
    await managerTaskIds.map((managerTask) => {
      managerTasks.push({
        id: managerTask.id,
        taskDefination: managerTask.gorevtanimi,
      });
    });
    return managerTasks;
  } catch (error) {
    console.log(error);
    return new GraphQLError(`Bir hata oluştu. \n \n ${error}`, {
      extensions: { code: 502 },
    });
  }
};
