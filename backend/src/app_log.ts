import { Logger } from '@nestjs/common';

export const logInfo = ({
  by,
  action,
}: {
  by: { firstname: string; lastname: string; id: number };
  action: string;
}) =>
  Logger.verbose(
    `\n==============================================================
        user : ${by.firstname} ${by.lastname} identity by ${by.id} 
        Action  : ${action} 
==============================================================`,
  );
