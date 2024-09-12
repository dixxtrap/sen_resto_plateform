
import { Grid } from "@mantine/core";
import {  useGetCompanyQuery } from "../../../../cores/apis/api";
import { Str } from "../../../../cores/constantes/str";
import { HomeCompanyItem } from "./home_company_item";
export const HomeCompany = () => {
  const { data:company, isLoading, isSuccess } = useGetCompanyQuery("");
  return (
    <div className="py-8 lg:px-10">
    <div className="mx-auto text-left">
      <span className="title1 pl-2">{Str.ourCompany}</span>
    </div>
      {isLoading && <span>Chargement....</span>}
      {company && isSuccess && (
          <Grid className="     ">
            {company.data.slice(0, 6).map((item, ) => (
              <Grid.Col span={{base:6, md:4, lg:3}}>
            <HomeCompanyItem company={item}/>
            </Grid.Col>
            ))}
          </Grid>
      )}
    </div>
  );
};
