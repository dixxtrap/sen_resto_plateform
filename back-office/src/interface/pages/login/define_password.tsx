import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { useForm } from "react-hook-form";
import { CustomForm } from "../../components/custom_form";
import { SignInDto } from "../../../core/models/login.dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefinePasswordMutation } from "../../../core/features/security.slice";
import * as Yup from "yup";
import { useGetUserRoleQuery } from "../../../core/features/auth.slice";
export const DefinePassword = () => {
  const [login, { isError, isSuccess, isLoading, reset, error }] =
  useDefinePasswordMutation();
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
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const searchParams = new URLSearchParams(url.search);
    const token = searchParams.get('token');

    console.log('Token récupéré :', token);
    
  if(token) { await login({token:token, password:data.password!});}
    refetch();

 
  };


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
            onSubmit={handleSubmit(_onSubmit)}
            successPath="/"
          >
            <Input
              label="Mot de passe"
          
              error={errors.password?.message}
              children={<input className="input" {...register("password")}      type="password"/>}
            />
            <Input
              label="Confirmation"
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
