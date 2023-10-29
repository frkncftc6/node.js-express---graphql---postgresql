import { Users } from "../models/users.js";
import { Members } from "../models/members.js";
import { SmsSents } from "../models/smsSents.js";
import { Employees } from "../models/employees.js";
import { Departments } from "../models/departments.js";
import { ManagerTasks } from "../models/managerTasks.js";
import { ReadyMessages } from "../models/readyMessages.js";
import { AreaDepartments } from "../models/areaDepartments.js";
import { SmsNotifications } from "../models/smsNotifications.js";
import { WorkplaceDelegates } from "../models/workplaceDelegates.js";
import { UniversitiesDistricts } from "../models/universitiesDistricts.js";

export async function getUserWithId(userId) {
  const user = await Users.findOne({
    where: { kullanici_id: userId },
  });
  return user;
}

export async function getUserWithToken(token) {
  const user = await Users.findOne({
    where: { token: `${token}` },
  });
  return user;
}

export async function getMember(memberId) {
  const member = await Members.findOne({
    where: { uye_id: memberId },
  });
  return member;
}

export async function getEmployee(employeeId) {
  const employee = await Employees.findOne({
    where: { personel_id: employeeId, sil: false },
  });
  return employee;
}

export async function getAreaDelegate(areaId) {
  const areaDelegate = await AreaDepartments.findOne({
    where: { bolge_sube_id: areaId, sil: false },
  });
  return areaDelegate;
}

export async function getCityDelegate(cityId) {
  const cityDelegate = await Departments.findOne({
    where: { sube_id: cityId, genelmerkezmi: 0 },
  });
  return cityDelegate;
}

export async function getDistrictDelegate(districtId) {
  const districtDelegate = await UniversitiesDistricts.findOne({
    where: { ilce_id: districtId },
  });
  return districtDelegate;
}

export async function getWorkplaceDelegate(workplaceId) {
  const workplaceDelegate = await WorkplaceDelegates.findOne({
    where: { isyeri_temsilci_id: workplaceId, sil: false },
  });
  return workplaceDelegate;
}

export async function getSmsNotificationValue(smsNotificationId) {
  const smsNotification = await SmsNotifications.findOne({
    where: { id: smsNotificationId },
  });
  return smsNotification.deger;
}

export async function getSmsApiInformations() {
  const apiInformation = await SmsSents.findOne({
    where: { id: 1 },
  });
  return apiInformation;
}

export async function getReadyMessages() {
  const readyMessage = await ReadyMessages.findOne({
    where: { mesajturu: 1 },
  });
  return readyMessage;
}

export async function getManagerTask(managerTaskId) {
  const managerTask = await ManagerTasks.findOne({
    where: { id: managerTaskId },
  });
  return managerTask;
}
