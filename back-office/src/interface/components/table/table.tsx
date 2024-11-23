import cx, { clsx } from "clsx";
import { FC, ReactNode, useState } from "react";
import {
  Table,
  // ScrollArea,
  Title,
  Pagination,
  Select,
  Button,
  TextInput,
  ScrollAreaAutosize,
  Box,
} from "@mantine/core";
import classes from "./table.module.css";
import { Link } from "react-router-dom";
import { PaginationDto } from "../../../core/features/pagination";
import { DateInput } from "@mantine/dates";
import { poppoverStyle } from "../form/custom_styles";
import { Alert } from "../alert_success";
import { getWsMessage } from "../../../core/features/error_transformer";
import { IconSearch } from "@tabler/icons-react";
import{useViewportSize}from '@mantine/hooks';
type TablePaginationProps = {
  th?: string[];
  trs?: ReactNode;
  trsMobile?: ReactNode;
  header?: ReactNode;
  creaBtn?: ReactNode;
  title?: string;
  totalPage?: number;
  subtitle?: string;
  thMobile?: string[];
  createPath?: string;
  isPaginated?: boolean;
  createTitle?: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  error?: any;
  pagination?: [
    PaginationDto,
    React.Dispatch<React.SetStateAction<PaginationDto>>
  ];
};
export const TablePagination: FC<TablePaginationProps> = ({
  trs,
  trsMobile,
  header,
  creaBtn,
  title,
  th,
  thMobile,
  createPath,
  totalPage,
  pagination,
  isError,
  error,
  isSuccess,
  isLoading,
  isPaginated,
}) => {
  const [scrolled, setScrolled] = useState(false);

  return (
    <Box h={useViewportSize().height-(isPaginated?110:100)} >
<div className="flex flex-col  h-full ">
      <div className="pb-3 flex  justify-between  items-baseline">
        <Title className="leading-3" order={3}>
          {title}
        </Title>

        {creaBtn ??
          (createPath && (
            <Link to={createPath!}>
              <Button
                fw={400}
                className="bg-secondary-500 hover:bg-secondary-600"
                color="secondary.4"
              >
                Ajouter
                {/* <IconPlus className="text-white " /> */}
              </Button>
            </Link>
          ))}
      </div>
      {header ?? (
        <div className="flex  text-left justify-between my-3">
          <TextInput
            placeholder="Rechercher"
            leftSection={<IconSearch className="size-6" />}
          />
          <DateInput
            popoverProps={poppoverStyle}
            classNames={{
              calendarHeaderLevel: "bg-primary-500 hover:bg-primary-700",
            }}
            styles={{
              section: { backgroundColor: "red" },
              calendarHeaderLevel: {
                color: "white",
                "&:hover": { backgroundColor: "green" },
              },
            }}
            placeholder="A partire de"
          />
        </div>
      )}
      {isSuccess && (
        <ScrollAreaAutosize
         
       
          className={clsx(
            " bg_table  ring-1 grow ring-slate-400  rounded-md",
            classes.body
          )}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table  className={clsx("table ring border-none app_table", {"  hidden md:table ": thMobile,})}>
            <Table.Thead
              className={cx(classes.header, " bg-primary-500  z-50 ", {
                [classes.scrolled]: scrolled,
               
              })}
            >
              <Table.Tr
                className={clsx("h-12 text-md ring-1  ring-slate-400/30 ")}
              >
                {th?.map((e, i) => (
                  <Table.Th
                    className={clsx("font-bold text-white  dark:text-white", {
                      "text-right": i == th.length - 1,
                    })}
                    key={`th_${e}`}
                  >
                    {e}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
           
            <Table.Tbody>{trs}</Table.Tbody>
          </Table>
          {thMobile&&<Table miw={"100%"} className={clsx("table border-none", {"  md:hidden ": thMobile,})}>
            
            <Table.Thead
              className={cx(classes.header, " bg-primary-500  z-50 ", {
                [classes.scrolled]: scrolled,
            
              })}
            >
              <Table.Tr
                className={clsx("h-12 text-md ring-1  ring-slate-400/30 ")}
              >
                {thMobile?.map((e, ) => (
                  <Table.Th
                    className={clsx("font-bold text-white  dark:text-white", {
                      // "text-right": i == thMobile.length - 1,
                    })}
                    key={`th_${e}`}
                  >
                    {e}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{trsMobile}</Table.Tbody>
          </Table>}
        </ScrollAreaAutosize>
      )}
      {isPaginated && (
        <div className="py-2 flex justify-between">
          <Select
            onChange={(val) =>
              pagination?.[1]((prev) => ({
                ...prev,
                perPage: Number(val),
                page: 1,
              }))
            }
            className="w-24"
            placeholder="Pick value"
            defaultValue={"20"}
            data={["20", "30", "40", "50", "100"]}
          />
          <Pagination
            withEdges
            total={totalPage ?? 1}
            siblings={1}
            defaultValue={1}
            value={pagination?.[0].page}
            onChange={(va) =>
              pagination?.[1]((prev) => ({ ...prev, page: va }))
            }
            onNextPage={() => {
              pagination![1]((prev) => ({
                ...prev,
                page: (prev.page ?? 0) + 1,
              }));
            }}
            onPreviousPage={() => {
              pagination![1]((prev) => ({
                ...prev,
                page: (prev.page ?? 0) - 1,
              }));
            }}
          />
        </div>
      )}
      {isError && (
        <Alert
          isOpen={isError}
          type="faillure"
          title="Ooops!"
          message={getWsMessage(error)}
          onClose={() => {}}
        />
      )}
      {isLoading && (
        <Alert
          isOpen={isLoading}
          type="loading"
          title="Traitement..."
          onClose={() => {}}
          message="Patientez un moment "
        />
      )}
    </div>
    </Box>
    
  );
};
