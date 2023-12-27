import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { useForm } from "react-hook-form";
import { CustomForm } from "../../components/custom_form";
import { SignInDto } from "../../../core/models/login.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../../core/features/security.slice";
import * as Yup from "yup";
import { useGetUserRoleQuery } from "../../../core/features/auth.slice";
import { useEffect } from "react";
export const DefinePassword = () => {
  const [login, { isError, isSuccess, isLoading, reset, data }] =
    useLoginMutation();
  const { refetch } = useGetUserRoleQuery("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Yup.object({
        password:Yup.string(),
        confirmPassword:Yup.string(),
    })),
  });

  const _onSubmit = async (data: SignInDto) => {
    console.log(data);
    await login(data);
    refetch();

 
  };
  useEffect(() => {
    return () => {
      document.cookie = "access_token=Bearer " + data?.token!;
    };
  }, [data]);

  return (
    <>
  
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
            onSubmit={handleSubmit(_onSubmit)}
            successPath="/dash"
          >
            <Input
              label="Password"
          
              error={errors.password?.message}
              children={<input className="input" {...register("password")}      type="password"/>}
            />
            <Input
              label="Mot de Passe"
              error={errors.password?.message}
              children={
                <input
                  type="password"
                  className="input"
                  {...register("confirmPassword")}
                />
              }
            />
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