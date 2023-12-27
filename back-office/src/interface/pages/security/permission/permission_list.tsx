import React from 'react'
import { TablePagination } from '../../../components/table_pagination'
import { useGetPermissionQuery } from '../../../../core/features/permission.slice'
import { formatDate } from '../../../utils/date_format'
import { Status } from '../../../components/status'

export const PermissionList = () => {
const {data:permissions, isLoading, isSuccess, }=useGetPermissionQuery("")
  return (
    <div>
      <TablePagination isPaginated={false} createPath='/permission/create' title='Listes Les Permissions' th={["Nom", "Module","Action","Code",  "Date de creation","Date de Modification", ""]}  trs={<>
      {permissions?.map((item)=><tr key={item.id}>
        <td>{item.name}</td>
        <td className="lowercase">{item.module?.name}</td>
        <td>{item.action}</td>
        <td>{item.code}</td>
        <td>{formatDate(item.details?.createdAt!)}</td>
        <td>{formatDate(item.details?.updatedAt!)}</td>
        <td className=''>
          <Status status={item.isActive!} />
        </td>
      </tr>)}
      </>}   />
    </div>
  )
}
