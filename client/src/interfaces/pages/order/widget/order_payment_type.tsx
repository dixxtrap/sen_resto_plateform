import { baseApi } from "../../../../cores/apis/api";
import { Avatar, Text, SegmentedControl } from "@mantine/core";

export const OrderPaymentType = () => {
  const payemntType = baseApi.usePaymentTypeQuery("");
  return (
    <div className="flex flex-col justify-between ">
      {/* <Text size="sm" fw={500} mb={3}>
        Disabled option
      </Text> */}
      
     {payemntType.data&& <SegmentedControl
     color="primary"
        data={payemntType.data.data.map((e) => ({
          value: `${e.id!}`,
          disabled:!e.isActive,
          label: (<div className="flex flex-col items-center">
              <div className="h-12">
                <Avatar
                  radius={8}
                  className=" mx-auto w-auto"
                  key={e.imagePath}
                  src={e.imagePath}
                />
              </div>
<Text className="font-bold">{e.name}</Text>
              
            </div>
          ),
        }))}
      />}
    </div>
  );
};
