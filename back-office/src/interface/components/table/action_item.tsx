import { ActionIcon, Tooltip, Button } from "@mantine/core";
import { IconEye, IconPencil } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
export const TableActionItemFonction = ({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}) => {
  return (<>
    <Tooltip withArrow label={label}>
      <ActionIcon
        onClick={onClick}
        variant="light"
        className="text-secondary-500 hidden md:block"
        color="secondary.5"
        size={"md"}
        p={3}
      >
        {icon ?? <IconPencil />}
      </ActionIcon>
      
    </Tooltip>
    <Button
        onClick={onClick}
        variant="light"
        className="text-secondary-500 md:hidden"
        color="secondary.5"
        size={"md"}
        p={3}
        rightSection={ icon ?? <IconPencil />}
      >
       {label}
      </Button>
    </>
  );
};
export const TableActionItemEdit = ({
  label,
  path,
}: {
  label: string;
  path: string;
}) => {
  return (
    <>
    <Button component= {Link} to={path}
          variant="light"
          className="text-secondary-500 font-light  md:hidden"
          color="secondary.5"
          size={"compact-md"}
          p={3}
          rightSection={<IconPencil />}
        >
          Modifier
        </Button>
        <Tooltip className="hidden md:block" withArrow label={label}>
      <Link to={path}>
        <ActionIcon
          variant="light"
          className="text-secondary-500 "
          color="secondary.5"
          size={"md"}
          p={3}
        >
          <IconPencil />
        </ActionIcon>
        
      </Link>
    </Tooltip>
    </>
    
  );
};

export const TableActionItemDetails = ({
  label,
  path,
}: {
  label: string;
  path: string;
}) => {
  return (<>
   <Link to={path} className="md:hidden">
        <Button
          variant="light"
          className="text-secondary-500 font-light"
          color="secondary.5"
          size={"compact-md"}
          p={3}
          rightSection={ <IconEye />}
        >
         Details
        </Button>
      </Link>
    <Tooltip className="hidden md:block" withArrow label={label}>
      <Link to={path}>
        <ActionIcon
          variant="light"
          className="text-secondary-500"
          color="secondary.5"
          size={"md"}
          p={3}
        >
          <IconEye />
        </ActionIcon>
      </Link>
    </Tooltip>
    </>
  );
};
