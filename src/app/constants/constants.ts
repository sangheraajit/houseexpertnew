

export enum LOCAL_VARIABLES {
  TOKEN = "TOKEN",
  CUSTOMER_ID = "CUSTOMER_ID",
  NAME = "NAME",
  IMAGE = "IMAGE",
  USER_CODE = "USER_CODE",
  USER_TYPE = "USER_TYPE",
  USER_NAME = "USERNAME",
  PASSWORD = "PASSWORD",
  USER_EMAIL = "USER_EMAIL",
  USER_PHONE = "USER_PHONE",
  USER_CITY = "USER_CITY",
  USER_ADDREES = "USER_ADDREES",
  CURRENT_USER = "CURRENT_USER",

}

export enum API_STATUS {
  success = "success",
  warning = "warning",
  error = "error"
}

export enum TOAST_TYPE {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info"
}

export enum TOAST_TITLE {
  GENERIC_ERROR = "genericError",
  NO_RECORDS_FOUND = "NO_RECORDS_FOUND",
  SUCCESS = "Success",
  LOGIN_FAILED = "loginFailed",
  UNAUTHORIZED = "unauthorized"
}

export enum TOAST_DETAIL {
  GENERIC_ERR_DETAIL = "genericErrorDetail",
  CONTACT_ADMINISTRATOR = "contactAdministrator",
  USER_NAME_NOT_AVAILABLE_DETAIL = "userNameNotAvailableDetail",
  ADDED_SUCCESSFULLY = "addedSuccessfully",
  UPDATED_SUCCESSFULLY = "updatedSuccessfully",
  CREDENTIALS_DID_NOT_MATCH = "credentialsDidNotMatch",
  TRY_AGAIN_LATER = "tryAgainLater",
  NOT_ABLE_TO_FETCH_DETAILS = "notAbleToFetchDetails",
  UNAUTHORIZED_DETAILS = "authorizationMessage",
  RE_LOGIN = "pleaseLoginAgain",
  CHANGES_EFFECT_ON_RELOGIN = "changesEffectOnRelogin"
}

export const TOAST_DURATION = 3000;

export const FIELD_VALIDATION = {
  // tslint:disable-next-line: max-line-length
  EMAIL_VALIDATION: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export enum DashboardPermission {
  dashboard = "feature/dashboard"
}

export enum APPURL {
  dashboardURL = "/feature/dashboard",
  scheduleURL = "/feature/schedule",
  settingsURL = "/feature/settings",
  roleURL = "/feature/role",
  committeeURL = "/feature/committee",
  usersURL = "/feature/users",
  rotationURL = "/feature/rotation",
  rotationReviewURL = "/feature/rotation/review",
  rotationFileUploadURL = "/feature/rotation/fileupload",
  positionURL = "/feature/position",
  reportsURL = "/feature/reports",
  eventBulletinURL = "/feature/eventbulletins",
  qrGenerationURL = "/feature/qrgeneration",
  roleAssignmentURL = "/feature/role-assignment",
  siteViewURL = "/feature/site-view",
  siteMapURL = "/feature/site-map",
  eventsURL = "/feature/events"
}

export enum APPFEATURE {
  dashboardFeature = "Dashboard",
  scheduleFeature = "Schedule",
  settingsFeature = "Settings",
  roleFeature = "Role",
  committeeFeature = "Committee",
  usersFeature = "Users",
  rotationFeature = "Rotation",
  rotationReviewFeature = "Rotation Review",
  rotationFileUploadFeature = "Rotation File Upload",
  positionFeature = "Position",
  reportsFeature = "Reports",
  eventBulletinFeature = "Event Bulletins",
  qrGenerationFeature = "QR Generation",
  roleAssignmentFeature = "Role Assignment",
  siteViewFeature = "Site View",
  siteMapFeature = "Site Map",
  eventsFeature = "Events"
}
//ennum and call releatd code added by ajit on 15-Mar-2022
export enum TopicName {
  callstart = "callstart",
  callaccept = "callaccept",
  callreject = "callreject",
  callend = "callend",
  callAlreadyAcceptedOrRejected="callAlreadyAcceptedOrRejected"
}

export enum TrackType {
  Audio,
  Video
}
