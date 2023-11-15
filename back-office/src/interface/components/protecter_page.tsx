import React, { FC, ReactNode, useEffect, useState } from "react";
import { PermissionDto, RoleDto } from "../../core/models/role.dto";
import { Navigate } from "react-router-dom";

import { useGetUserRoleQuery } from "../../core/features/auth.slice";
type Props = {
  permissions: { sousModule: string; type: string }[];
  children?: ReactNode;
  isPage?: boolean;
};
export const ProtecterPage: FC<Props> = ({
  permissions,
  children,
  isPage = false,
}) => {
  const {
    data: decoded,
    isSuccess: isConnected,
    isLoading,
    isError: conFailled,
    refetch,
  } = useGetUserRoleQuery("");
  const [canActive, setCanActive] = useState<boolean>(false);
  const canActiveHandle = () => {
    console.log("--------------------canActivate-----------");
    console.log(decoded);
    if (!decoded) {
      refetch();
    }
    console.log(permissions);
    const result = decoded?.role?.permission.some((item) => {
      const l = permissions.map((item2) => {
        const r =
          (item.type.toLowerCase() === item2.type.toLowerCase() ||
            item2.type.toLowerCase() === "*") &&
          (item.sousModule.toLowerCase() === item2.sousModule.toLowerCase() ||
            item2.sousModule.toLowerCase() === "*");
        return r;
      });
      return l.some((item) => item === true);
    });
    console.log(result);
    setCanActive(result ?? false);
  };
  useEffect(() => {
    if (isConnected && decoded) {
      console.log("--------------------canActivate:useEffet-----------");

      canActiveHandle();
    } else {
      refetch();
    }
  }, [isConnected, decoded]);

  return (
    <>
      {isLoading && !isConnected ? (
        <span>....</span>
      ) : (
        decoded &&
        isConnected && (
          <>{canActive ? children : isPage ? <Navigate to="/" /> : null}</>
        )
      )}
    </>
  );
};
