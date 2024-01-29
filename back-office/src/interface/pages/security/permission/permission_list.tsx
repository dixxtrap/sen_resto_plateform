import { TablePagination } from '../../../components/table_pagination'
import { useGetPermissionQuery } from '../../../../core/features/permission.slice'
import { formatDate } from '../../../utils/date_format'
import { Status } from '../../../components/status'

export const PermissionList = () => {
const {data:permissions }=useGetPermissionQuery("")
  return (
    <div>
      <TablePagination isPaginated={false} createPath='/permission/create' title='Listes Les Permissions' th={["Nom", "Module","Action","Code",  "Date de creation", ""]}  trs={<>
      {permissions?.map((item)=><tr key={item.id}>
        <td className='truncate max-w-[150px] pr-2'>{item.name}</td>
        <td className="lowercase">{item.module?.name}</td>
        <td>{item.action}</td>
        <td className='truncate max-w-[140px] pr-2'>{item.code}</td>
        <td>{formatDate(item.details?.createdAt!)}</td>
        {/* <td>{formatDate(item.details?.updatedAt!)}</td> */}
        <td className=''>
          <Status status={item.isActive!} />
        </td>
      </tr>)}
      </>}   />
    </div>
  )
}
