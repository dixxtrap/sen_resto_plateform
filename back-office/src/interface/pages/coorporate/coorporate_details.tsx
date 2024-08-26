import { useParams } from "react-router-dom"
import { useGetCoorporateByIdQuery } from "../../../core/features/coorporate.slice"
import { Details } from "../../components/details";
import { DetailItem } from "../../components/details_item";

export const CoorporateDetails = () => {
  const {id}=useParams();
  const {data, isLoading , isSuccess, isError, error}=useGetCoorporateByIdQuery(id!)
  return (
    <Details
      title={`${data?.data.name}`}
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
      error={error}
    >
      <DetailItem
        label="Logo"
        value={<img title="logo" className="h-20" src={data?.data.imagePath} />}
      />
      <DetailItem label="Nom" value={data?.data.name} />
      <DetailItem label="Nom Commercial" value={data?.data.shortname} />
      <DetailItem label="Email" value={data?.data.email} />
      <DetailItem label="Téléphone" value={data?.data.phone} />
    </Details>
  );
}
