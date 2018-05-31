import session from "./saveStorage/sessionStorage";

export function logOutClean() {
  session.remSession("currentOrg")
  session.remSession("currentSystem")
  session.remSession('token')
  session.remSession('user')
  session.remSession('curentClickMenu')
}
