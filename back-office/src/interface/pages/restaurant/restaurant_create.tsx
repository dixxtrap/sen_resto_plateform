import React from "react";
import { CustomForm } from "../../components/custom_form";
import {
  useCreateRestaurantMutation,
  useGetRestaurantByIdQuery,
} from "../../../core/features/restaurant.slice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  RestaurantDto,
  restaurantSchema,
} from "../../../core/models/restaurant.dto";

export const RestaurantCreate = () => {
  const { id } = useParams();
  const { data: oldRestaurant } = useGetRestaurantByIdQuery(parseInt(id!));
  const [create, { isError, isLoading, isSuccess }] =
    useCreateRestaurantMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(restaurantSchema),
  });
  const _onSubmit =handleSubmit((body: RestaurantDto) => {
    console.log(body);
    create(body);
  });
  return (
    <CustomForm
      title="Restaurant"
      isError={isError}
      isLoading={isLoading}
      isSuccess={isSuccess}
      subTitle={"Modifier le restaurant" + " " + oldRestaurant?.name}
      onSubmit={_onSubmit}
    >
      <Input label="Nom du Restaurant" error={errors.name?.message}>
        <input {...register("name")} className="input" />
      </Input>
      <Input label="Email" error={errors.email?.message}>
        <input {...register("email")} className="input" />
      </Input>
      <Input label="Téléphone" error={errors.phone?.message}>
        <input {...register("phone")} className="input" />
      </Input>
      <Input label="Description" error={errors.description?.message}>
        <textarea {...register("description")} className="input" />
      </Input>
      <div className="flex gap-8 w-full flex-wrap">
          <Input
            label="Longitude"
            error={errors.longitude?.message}
            className=" max-w-lg"

            children={
              <input className="input grow " {...register("longitude")} />
            }
          />
          <Input
            label="Laltitude"
            error={errors.laltitude?.message}
            className=" max-w-lg"
            children={
              <input className="input grow "{...register("laltitude")} />
            }
          />
      </div>
      <div className="flex gap-8 w-full flex-wrap">
          <Input
            label="Ouverture"
            error={errors.openingTime?.message}
            className=" max-w-lg"

            children={
              <input className="input grow " placeholder="00:00:00" {...register("openingTime")} />
            }
          />
          <Input
            label="Fermuture"
            error={errors.closingTime?.message}
            className=" max-w-lg"
            children={
              <input className="input grow "  placeholder="00:00:00" {...register("closingTime")} />
            }
          />
        </div>
    </CustomForm>
  );
};
