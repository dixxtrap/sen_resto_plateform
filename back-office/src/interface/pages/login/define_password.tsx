import { Logo } from "../../components/logo";
import { useForm } from "@mantine/form";
import { CustomForm } from "../../components/custom_form";
import { SignInDto } from "../../../core/models/login.dto";

import { useDefinePasswordMutation } from "../../../core/features/security.slice";

import { useGetUserRoleQuery } from "../../../core/features/auth.slice";
import { TextConstant } from "../../../core/data/textConstant";
import { PasswordInput } from "@mantine/core";
export const DefinePassword = () => {
  const [login, { isError, isSuccess, isLoading, reset, error }] =
  useDefinePasswordMutation();
  const { refetch } = useGetUserRoleQuery("");
  const form = useForm({
  });

  const _onSubmit = form.onSubmit(async(data: SignInDto) => {
    console.log(data);
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const searchParams = new URLSearchParams(url.search);
    const token = searchParams.get('token');

    console.log('Token récupéré :', token);
    
  if(token) { await login({token:token, password:data.password!});}
    refetch();

 
  });


  return (
    <>
  
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="self-center mx-auto h-28 w-28  md:h-32 md:w32" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight ">
            Definissez votre mot de passe
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
            successPath="/"
          >
          
        <PasswordInput label={TextConstant.password} {...form.getInputProps("password")} error={form.errors["password"]} key={form.key("password")} />

            
        <PasswordInput label={TextConstant.confirmation} {...form.getInputProps("confirmPassword")} error={form.errors["confirmPassword"]} key={form.key("confirmPassword")} />

          </CustomForm>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Mot de passe oublié ?
              </a>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};
