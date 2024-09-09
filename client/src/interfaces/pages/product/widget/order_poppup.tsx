import { useState } from "react";
import { ProductDto } from "../../../../cores/models/product";

import { MinusSmallIcon , PlusSmallIcon} from "@heroicons/react/24/solid";
import {useForm}from '@mantine/form'
import { CustomForm } from "../../../components/custom_form";
import { useAddProductMutation } from "../../../../cores/apis/order.slice";
import { Button, ButtonGroup, Image, Textarea } from "@mantine/core";

export const PlateItemPoppup = ({
  product,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductDto;
}) => {
  const [selectedSize, _] = useState<string>(
    product?.file![0]?.path ?? ""
  );
  const [addProduct,{isLoading, isSuccess, isError, reset}]=useAddProductMutation();
  const form = useForm<{quantity:number, description:string}>({initialValues:{quantity:0, description:""}  });
  const quantity=form.getValues().quantity;
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

       <CustomForm onFinish={reset} btnClassName="hidden" onSubmit={_onsubmit} isError={isError} isSuccess={isSuccess} isLoading={isLoading}>
       <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg  sm:col-span-4 lg:col-span-5">
                      <Image
                        src={`${selectedSize}`}
                        alt={product.name!}
                        className="object-cover h-60 mx-auto w-auto object-center rounded-md"
                      />
                     
                    </div>
                    <div className="sm:col-span-8 mt-10 lg:col-span-7 divide-y-2 ">
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
                           
                              <Textarea
                              label="Details de la Commande"
                                {...form.getInputProps("description")}
                              
                              />
                           
                          </div>
                          <ButtonGroup className="my-3" >
                            <Button
                             variant="outline"
                              onClick={() => handleQuantity("decrement")}
                             
                            >
                              <MinusSmallIcon className="size-5" />
                            </Button>
                            <Button  >
                              <span className="text-2xl   leading-4">
                                {" "}
                                {quantity??0}
                              </span>
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleQuantity("increment")}
                            >
                              <PlusSmallIcon className="size-5" />
                            </Button>
                            <Button
                              type="submit"
                             className="grow"
                            >
                              Ajouter au panier
                            </Button>
                          </ButtonGroup>
                          {/* </form> */}
                        </div>
                      </section>
                    </div>
       </CustomForm>
  );
};


