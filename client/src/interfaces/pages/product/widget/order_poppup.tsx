import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";

import { Input } from "../../../components/input";
import { MinusSmallIcon , PlusSmallIcon} from "@heroicons/react/24/solid";
import {useForm}from '@mantine/form'
import XMarkIcon from "@heroicons/react/24/solid/esm/XMarkIcon";
import { CustomForm } from "../../../components/custom_form";
import { useAddProductMutation } from "../../../../cores/apis/order.slice";
import { Dialog, Textarea } from "@mantine/core";

export const PlateItemPoppup = ({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductDto;
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.file![0]?.path ?? ""
  );
  const [addProduct,{isLoading, isSuccess, isError, reset}]=useAddProductMutation();
  const form = useForm<{quantity:number, description:string}>({  });
  const handleQuantity = (method: "increment" | "decrement") => {
    console.log(`--------------------------${method}----------------------`);
    const value = form.getValues().quantity;
    if (method == "increment") {
      form.setFieldValue("quantity", value + 1);
    } else if (value > 1) {
        form.setFieldValue("quantity", value - 1);
      }
  };
const _onsubmit=form.onSubmit((data)=>{
  addProduct({productId:product.id!, ...data})
})
  return (
   <Dialog opened={open}>
       <CustomForm onFinish={reset} onSubmit={_onsubmit} isError={isError} isSuccess={isSuccess} isLoading={isLoading}>
       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden md:inline-block md:h-screen md:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
           
            >
              <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white  rounded-md backdrop-blur-lg px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg  sm:col-span-4 lg:col-span-5">
                      <img
                        src={`${selectedSize}`}
                        alt={product.name!}
                        className="object-cover object-center rounded-md"
                      />
                      {/* <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-2"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choisir l'image
                        </RadioGroup.Label>
                        <div className="grid grid-cols-7 py-2 gap-2">
                          {product!.file!.map((file) => (
                            <RadioGroup.Option
                              key={`plate_file_${file.id}`}
                              value={file.path}
                              className={({ active }) =>
                                clsx(
                                  "cursor-pointer focus:outline-none",
                                  active
                                    ? "ring-2 ring-red-500 ring-offset-2 ring-inset"
                                    : "",
                                  "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                                  "flex items-center justify-center rounded-md border  text-sm font-medium uppercase sm:flex-1"
                                )
                              }
                            >
                              <RadioGroup.Label as="span">
                                <img src={`${file.path}`} />
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup> */}
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7 divide-y-2 ">
                      <h2 className="text-xl font-bold text-gray-900 sm:pr-12">
                        {product.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className=" divide-y-2 flex flex-col gap-3 pt-2 "
                      >
                        {/* <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3> */}
                        <div className="flex justify-between font-semibold items-center">
                          <span>Prix</span>
                          <span className="font-bold text-red-500">
                            {product.price} F CFA
                          </span>
                        </div>

                        {/* Reviews */}
                        <div className="">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="ml-1 flex items-center">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-8"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        {/* <form> */}
                        <div>
                          {/* Color picker */}

                          {/* Size picker */}
                          <div className="mt-2">
                            <Input label="Details de la Commande">
                              <Textarea
                                {...form.getInputProps("description")}
                                className="input"
                              />
                            </Input>
                          </div>
                          <div className="flex items-stretch gap-5 ">
                            <button
                              className="btn primary text-6xl font-semibold line-clamp-4  leading-4"
                              onClick={() => handleQuantity("decrement")}
                              type="button"
                            >
                              <MinusSmallIcon className="w-10" />
                            </button>
                            <button className="btn primary"   type="button">
                              <span className="text-2xl   leading-4">
                                {" "}
                                {form.getValues().quantity}
                              </span>
                            </button>
                            <button
                              type="button"
                              className="btn primary text-4xl font-semibold line-clamp-4  leading-4"
                              onClick={() => handleQuantity("increment")}
                            >
                              <PlusSmallIcon className="w-10" />
                            </button>
                            <button
                              type="submit"
                              className="btn secondary grow"
                            >
                              Ajouter au panier
                            </button>
                          </div>
                          {/* </form> */}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </CustomForm>
   </Dialog>
  );
};


