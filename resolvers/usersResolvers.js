import "dotenv/config";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

import { login } from "../components/users/login.js";
import { users } from "../components/users/users.js";
import { getUsers } from "../components/users/getUsers.js";
import { userUpdate } from "../components/users/userUpdate.js";
import { userLogins } from "../components/users/userLogins.js";
import { createUser } from "../components/users/createUser.js";
import { lawyerUsers } from "../components/users/lawyerUsers.js";
import { managerUsers } from "../components/users/managerUsers.js";
import { managerTasks } from "../components/users/managerTasks.js";
import { memberLogins } from "../components/users/memberLogins.js";
import { createLawyer } from "../components/users/createLawyer.js";
import { updateLawyer } from "../components/users/updateLawyer.js";
import { employeeUsers } from "../components/users/employeeUsers.js";
import { lawAdminUsers } from "../components/users/lawAdminUsers.js";
import { deleteAnyUser } from "../components/users/deleteAnyUser.js";
import { getManagerUser } from "../components/users/getManagerUser.js";
import { createEmployee } from "../components/users/createEmployee.js";
import { employeeUpdate } from "../components/users/employeeUpdate.js";
import { createLawAdmin } from "../components/users/createLawAdmin.js";
import { updateLawAdmin } from "../components/users/updateLawAdmin.js";
import { areaDepartments } from "../components/users/areaDepartments.js";
import { getEmployeeUser } from "../components/users/getEmployeeUser.js";
import { districtDelegates } from "../components/users/districtDelegates.js";
import { getLawyerAuthArea } from "../components/users/getLawyerAuthArea.js";
import { workplaceDelegates } from "../components/users/workplaceDelegates.js";
import { updateLawAdminSettings } from "../components/users/updateLawAdminSettings.js";

import {
  updateAuth,
  updatePassword,
  updateOtpMessage,
  updateLawyerAuth,
  updateLawyerPassword,
  checkUserAuthrozitaions,
} from "../components/supportServer/supportServer.js";

export const usersResolvers = {
  Query: {
    users: users,
    getUsers: getUsers,
    getManagerUser: getManagerUser,
    managerUsers: managerUsers,
    managerTasks: managerTasks,
    areaDepartments: areaDepartments,
    districtDelegates: districtDelegates,
    workplaceDelegates: workplaceDelegates,
    getEmployeeUser: getEmployeeUser,
    employeeUsers: employeeUsers,
    lawyerUsers: lawyerUsers,
    getLawyerAuthArea: getLawyerAuthArea,
    lawAdminUsers: lawAdminUsers,
    memberLogins: memberLogins,
    userLogins: userLogins,
    checkUserAuthrozitaions: checkUserAuthrozitaions,
    updateAuth: updateAuth,
    updatePassword: updatePassword,
    updateOtpMessage: updateOtpMessage,
    updateLawyerAuth: updateLawyerAuth,
    updateLawyerPassword: updateLawyerPassword,
  },
  Mutation: {
    login: login,
    createUser: createUser,
    userUpdate: userUpdate,
    createEmployee: createEmployee,
    employeeUpdate: employeeUpdate,
    createLawyer: createLawyer,
    updateLawyer: updateLawyer,
    createLawAdmin: createLawAdmin,
    updateLawAdmin: updateLawAdmin,
    updateLawAdminSettings: updateLawAdminSettings,
    deleteAnyUser: deleteAnyUser,
  },
  Upload: GraphQLUpload,
};
