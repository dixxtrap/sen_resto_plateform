import { FC, ReactNode, useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { useProfileQuery } from "../../core/features/security.slice";
export enum PermisisionTypeEnum{
  ALL="*",
  UPDATE="update",
  CREATE="create",
  READ="read",
  DETAILS="details",
}
type Props = {
  permissions: { code: string; type: PermisisionTypeEnum }[];
  children?: ReactNode;
  isPage?: boolean;
  defaultWidget?: ReactNode,
};
export const ProtecterPage: FC<Props> = ({
  permissions,
  children,
  defaultWidget = <></>,
  isPage = false,
}) => {
  const {
    data: decoded,
   
    isSuccess: isConnected,
    isLoading,

    refetch,
  } = useProfileQuery("");
  const [canActive, setCanActive] = useState<boolean>(false);
  const canActiveHandle = () => {
    if (!decoded) {
      refetch();
    }
    // console.log(permissions);
    const result = decoded?.role?.rolePermission?.some((item) => {
      return permissions.some((item2) => {
        return (
          (item.permission?.action?.toLowerCase() ===
            item2.type.toLowerCase() ||
            item2.type.toLowerCase() === "*") &&
          (item.permission?.module?.name?.toLowerCase() ===
            item2.code.toLowerCase() ||
            item.permission?.code?.toLowerCase() === item2.code.toLowerCase() ||
            item2.code.toLowerCase() === "*")
        );
      });
    });
    // console.log(result);
    setCanActive(result ?? false);
  };
  useEffect(() => {
    if (isConnected && decoded) {
      // console.log("--------------------canActivate:useEffet-----------");

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
          <>{canActive ? children : isPage ? <Navigate to="/" /> : defaultWidget}</>
        )
      )}
    </>
  );
};
