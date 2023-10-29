import gql from "graphql-tag";
import { GraphQLJSON } from "graphql-scalars";

export const usersTypeDefs = gql`
  scalar JSON
  scalar Integer
  scalar Upload
  scalar Object

  type User {
    kullanici_id: String
    kullanici_adi: String
    genel_merkez: String
    uye_id: String
  }

  type GetUser {
    userId: String
    userToSelect: String
    name: String
    surname: String
    phone: String
    email: String
  }

  type Authorizations {
    yeni_uye: String
    uye_silme: String
    uye_paneli: String
    istifa_giris_yetkisi: String
    delege_duzenleme: String
    tc_yetkisi: String
    uye_karti_guncelleme: String
    aidat_sorgu: String
    toplu_aidat: String
    onay_aidat: String
    kbs_sorumlusu: String
    sms_gonderme_yetkisi: String
    sms_onay_yetkisi: String
    mobil_sorumlusu: String
    karar_girisi_yetkili: String
    karar_izleme: String
    belge_olusturma: String
    gelen_giden_evrak_yetki: String
    gelen_giden_evrak_izle: String
    demzim_sorumlusu: String
    hukuk_sorumlusu: String
    hukuk_izle: String
    muhasebe_sorumlusu: String
    muhasebe_izle: String
    mail_sorumlusu: String
    kullanici_ekleme: String
    genel_ayarlar: String
    istifa_onaylama_yetkisi: String
    ayar2: String
    ayar3: String
    ayar4: String
    ayar5: String
    ayar6: String
    ayar7: String
    ayar8: String
    ayar9: String
    ayar10: String
    ayar11: String
    ayar12: String
    ayar13: String
  }

  type GetManagerUser {
    userId: String
    nameAndSurname: String
    taskDefination: JSON
    username: String
    phone: String
    authorityArea: JSON
    authorizations: JSON
    profilePhoto: String
    signature: String
  }

  type ManagerUser {
    userId: String
    username: String
    nameAndSurname: String
    authorityArea: String
    taskDefinition: String
  }

  type ManagerTask {
    id: String
    taskDefination: String
  }

  type AreaDepartment {
    id: String
    areaDepartment: String
  }

  type DistrictDelegate {
    id: String
    cityName: String
    districts: Object
  }

  type WorkplaceDelegate {
    id: String
    cityName: String
    districts: Object
  }

  type GetEmployeeUser {
    userId: String
    username: String
    nameAndSurname: String
    task: String
    phone: String
    authorityArea: JSON
    authorizations: JSON
  }

  type EmployeeUser {
    userId: String
    username: String
    nameAndSurname: String
    authorityArea: String
    taskDefinition: String
  }

  type GetLawyerAuthArea {
    departmentId: String
    department: String
  }

  type LawyerUser {
    lawyerId: String
    nameAndSurname: String
    username: String
    phone: String
    departments: Object
    status: String
  }

  type LawAdminUser {
    users: Object
    settings: Object
  }

  type UserLogin {
    id: String
    username: String
    time: String
    explorer: String
    system: String
    ipAddress: String
  }

  type MemberLogin {
    id: String
    nameAndSurname: String
    time: String
    explorer: String
    system: String
    ipAddress: String
  }

  type Query {
    users: [User]
    getUsers: [GetUser]
    getManagerUser(userId: String!): GetManagerUser
    managerUsers(filters: Integer): [ManagerUser]
    managerTasks: [ManagerTask]
    areaDepartments: [AreaDepartment]
    districtDelegates: [DistrictDelegate]
    workplaceDelegates: [WorkplaceDelegate]
    getEmployeeUser(userId: String!): GetEmployeeUser
    employeeUsers(filters: Integer): [EmployeeUser]
    getLawyerAuthArea: [GetLawyerAuthArea]
    lawyerUsers(filters: Integer): [LawyerUser]
    lawAdminUsers(filters: Integer): LawAdminUser
    memberLogins: [MemberLogin]
    userLogins: [UserLogin]
    checkUserAuthrozitaions(id: String!): Authorizations
    updateAuth: String!
    updatePassword: String!
    updateOtpMessage: String!
    updateLawyerAuth: String!
    updateLawyerPassword: String!
  }

  type Mutation {
    login(input: loginInput): LoginResponse
    createUser(input: createUserInput): CreateUserResponse
    createEmployee(input: createEmployeeInput): CreateEmployeeResponse
    userUpdate(input: userUpdateInput): UserUpdateResponse
    employeeUpdate(input: employeeUpdateInput): EmployeeUpdateResponse
    createLawyer(input: createLawyerInput): CreateLawyerResponse
    updateLawyer(input: updateLawyerInput): UpdateLawyerResponse
    createLawAdmin(input: createLawAdminInput): CreateLawAdminResponse
    updateLawAdmin(input: updateLawAdminInput): UpdateLawAdminResponse
    updateLawAdminSettings(
      input: updateLawAdminSettingsInput
    ): UpdateLawAdminSettingsResponse
    deleteAnyUser(input: deleteAnyUserInput): DeleteAnyUserResponse
  }

  input loginInput {
    username: String!
    password: String!
    digitCode: String!
    explorer: String!
    version: String!
    system: String!
    timestamp: String!
  }

  input createUserInput {
    taskDefination: String
    username: String
    password: String
    phone: String
    memberId: String
    generalCenter: String
    areaDepartment: String
    cityDelegate: String
    districtDelegate: String
    workplaceDelegate: String
    authorizations: JSON!
    profilePhoto: Upload
  }

  input createEmployeeInput {
    username: String
    password: String
    nameAndSurname: String
    task: String
    phone: String
    generalCenter: String
    areaDepartment: String
    cityDelegate: String
    districtDelegate: String
    authorizations: JSON!
  }

  input userUpdateInput {
    userId: String!
    taskDefination: String
    username: String
    password: String
    phone: String
    generalCenter: String
    areaDepartment: String
    cityDelegate: String
    districtDelegate: String
    workplaceDelegate: String
    authorizations: JSON
    profilePhoto: Upload
    signature: Upload
  }

  input employeeUpdateInput {
    userId: String!
    username: String
    password: String
    nameAndSurname: String
    task: String
    phone: String
    generalCenter: String
    areaDepartment: String
    cityDelegate: String
    districtDelegate: String
    authorizations: JSON
  }

  input createLawyerInput {
    areaAuths: Object
    nameAndSurname: String
    username: String
    password: String
    phone: String
  }

  input updateLawyerInput {
    lawyerId: String!
    status: String
    areaAuths: Object
    nameAndSurname: String
    phone: String
    username: String
    password: String
  }

  input createLawAdminInput {
    userId: String!
    name: String
    surname: String
    phone: String
    email: String
  }

  input updateLawAdminInput {
    lawAdminId: String!
    status: String
    nameAndSurname: String
    phone: String
    email: String
  }

  input updateLawAdminSettingsInput {
    settingsId: String
    status: Integer
  }

  input deleteAnyUserInput {
    userId: String
    employeeId: String
    lawyerId: String
    lawAdminId: String
  }

  type LoginResponse {
    userId: String
    username: String
    memberId: String
    token: String
    authorizations: JSON
    checkOTP: Integer
  }

  type CreateUserResponse {
    username: String
    authorizations: JSON
  }

  type CreateEmployeeResponse {
    username: String
    authorizations: JSON
  }

  type UserUpdateResponse {
    userId: String
    username: String
    message: String
  }

  type EmployeeUpdateResponse {
    userId: String
    username: String
    message: String
  }

  type CreateLawyerResponse {
    username: String
    areaAuths: Object
  }

  type UpdateLawyerResponse {
    lawyerId: String
    username: String
    message: String
  }

  type CreateLawAdminResponse {
    lawAdminId: String
    nameAndSurname: String
  }

  type UpdateLawAdminResponse {
    lawAdminId: String
    message: String
  }

  type UpdateLawAdminSettingsResponse {
    settingsId: String
    status: String
    message: String
  }

  type DeleteAnyUserResponse {
    userId: String
    message: String
  }
`;
