import { Logo } from "../../components/logo";
import { useForm } from "@mantine/form";
import { CustomForm } from "../../components/custom_form";
import {  useResetPasswordByEmailMutation } from "../../../core/features/security.slice";
import { useGetUserRoleQuery } from "../../../core/features/auth.slice";

import { Link } from "react-router-dom";
import { TextInput } from "@mantine/core";
import { TextConstant } from "../../../core/data/textConstant";
export const ForgetPassword = () => {
  const [login, { isError, isSuccess, isLoading, reset, error }] =
    useResetPasswordByEmailMutation();
  const { refetch } = useGetUserRoleQuery("");
  const form = useForm({
  });

  const _onSubmit = form.onSubmit(async ({email}:{email?:string}) => {
    await login({email:email!});
    refetch();

 
  })
 

  return (
    <>
  
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="self-center mx-auto h-28 w-28  md:h-32 md:w32" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight ">
            Reinitialiser votre mot de passe
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <CustomForm
            isError={isError}
            isSuccess={isSuccess}
            onFinish={() => reset()}
            isLoading={isLoading}
            error={error}
            onSubmit={_onSubmit}
            successPath="/dashboard"
          >
           
        <TextInput label={TextConstant.email} {...form.getInputProps("email")} error={form.errors["email"]} key={form.key("email")} />
           
          </CustomForm>

          <p className="mt-10 text-center text-sm text-gray-500">
            Vous avez deja un compte ?{" "}
            <div className="text-sm">
              <Link
                to={'/'}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Se connecter ?
              </Link>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};
