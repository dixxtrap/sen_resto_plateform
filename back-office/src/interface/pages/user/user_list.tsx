import { PermisisionTypeEnum, ProtecterPage } from "../../components/protecter_page"
import { UserForCompany } from "./widget/user_for_company"
import { UserForSuperAdmin } from "./widget/user_for_super_admin"

export const UserList = () => {
  return (<ProtecterPage defaultWidget={<UserForCompany/>} permissions={[{code:"UPDATE_USER_COMPANY", type:PermisisionTypeEnum.UPDATE}]}>
    <UserForSuperAdmin/>
  </ProtecterPage>)
}
