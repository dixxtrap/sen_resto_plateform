import { Logo } from "../../components/logo";
import { useForm } from "@mantine/form";
import { CustomForm } from "../../components/custom_form";
import { SignInDto } from "../../../core/models/login.dto";
import { useLoginMutation } from "../../../core/features/security.slice";
import { useGetUserRoleQuery } from "../../../core/features/auth.slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TextConstant } from "../../../core/data/textConstant";
import { PasswordInput, TextInput } from "@mantine/core";
import { multiSelectStyle } from "../../components/form/custom_styles";
export const Login = () => {
  const [login, { isError, isSuccess, isLoading, reset, data , error}] =
    useLoginMutation();
  const { refetch } = useGetUserRoleQuery("");
  const form = useForm({

  });

  const _onSubmit = form.onSubmit(async (data: SignInDto) => {
    console.log(data);
    await login(data);
    refetch();

 
  });
  useEffect(() => {
    return () => {
      document.cookie = "access_token=Bearer " + data?.token!;
    };
  }, [data]);

  return (
    <>
  
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="self-center mx-auto h-28 w-28  md:h-32 md:w32" />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight ">
            Se Connecter a votre compte
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
          
        <TextInput label={TextConstant.email} {...form.getInputProps("username")} error={form.errors["username"]} key={form.key("username")} />
        <PasswordInput  styles={multiSelectStyle} label={TextConstant.password} {...form.getInputProps("password")} error={form.errors["password"]} key={form.key("password")} />

          </CustomForm>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <div className="text-sm">
              <Link
              to={'forget-password'}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Mot de passe oublié ?
              </Link>
              {import.meta.env.VITE_HOST}
            </div>
          </p>
        </div>
      </div>
    </>
  );
};
