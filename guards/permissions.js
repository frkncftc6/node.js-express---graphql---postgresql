import { shield } from "graphql-shield";
import { isAuthorized } from "../middlewares/isAuthorized.js";

export const permissions = shield({
  Query: {
    /* USERS - START */
    getUsers: isAuthorized,
    getManagerUser: isAuthorized,
    managerUsers: isAuthorized,
    managerTasks: isAuthorized,
    areaDepartments: isAuthorized,
    districtDelegates: isAuthorized,
    workplaceDelegates: isAuthorized,
    getEmployeeUser: isAuthorized,
    employeeUsers: isAuthorized,
    lawyerUsers: isAuthorized,
    getLawyerAuthArea: isAuthorized,
    lawAdminUsers: isAuthorized,
    memberLogins: isAuthorized,
    userLogins: isAuthorized,
    /* USERS - END */

    /*MEMBERS - START */
    getMembers: isAuthorized,
    /*MEMBERS - END */
  },
  Mutation: {
    createUser: isAuthorized,
    createEmployee: isAuthorized,
    userUpdate: isAuthorized,
    employeeUpdate: isAuthorized,
    createLawyer: isAuthorized,
    updateLawyer: isAuthorized,
    createLawAdmin: isAuthorized,
    updateLawAdmin: isAuthorized,
    updateLawAdminSettings: isAuthorized,
    deleteAnyUser: isAuthorized,
  },
});
