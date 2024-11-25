'use client'
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../../../components/inputs/Input';
import Button from '../../../components/Button';
import { LoginFormType, loginSchema } from '../validations/loginSchema';
import { RegisterFormType, registerSchema } from '../validations/registerSchema';
import { useAuth } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const router = useRouter();
    const { login: loginContext } = useAuth();

    // THIS IS a RTK Query mutations
    // const [login, { isLoading: isLoginLoading }] = useLoginMutation();
    // const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

    const isLoading = false

    const {
        register: registerForm,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormType | RegisterFormType>({
        resolver: zodResolver(variant === 'LOGIN' ? loginSchema : registerSchema),
    });

    const toggleVariant = useCallback(() => {
        reset();
        setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
    }, [reset]);

    const onSubmit: SubmitHandler<LoginFormType | RegisterFormType> = async (data) => {
        try {
            if (variant === 'LOGIN') {
                // const response = await login(data as LoginFormType).unwrap();
                const response :any=  ''
                console.log(response)
                if (response?.user) {
                    loginContext(response.token, response.user);
                     toast("Login Succssfully!", {
                       icon: "👏",
                       style: {
                         borderRadius: "10px",
                         background: "#333",
                         color: "#fff",
                       },
                     });
                    router.replace("/dashboard");
                   
                } else {
                    throw new Error('User data is missing');
                }
            } else {
                const { email, password, username } = data as RegisterFormType;
                const response = ''
                // const response = await register({ email, password, username }).unwrap();
                console.log(response);

          toast("Regester Succssfully!", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
                setVariant('LOGIN');
                return
            }
        } catch (error: any) {
            console.error(error?.data?.message || error.message || 'Authentication failed');
            alert(error?.data?.message || error.message || 'Authentication failed');
        }
    };





    return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className=" px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-10 " onSubmit={handleSubmit(onSubmit)}>
          
              <h2
                className="
            pb-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white
            mb-10
          "
              >
                {variant === "REGISTER"
                  ? "Create an account"
                  : "Sign in to your account"}
              </h2>
      

            {/* REGISTER Variant Fields */}
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                register={registerForm}
                errors={errors}
                required={false}
                id="username"
                label="Username"
              />
            )}

            <Input
              disabled={isLoading}
              register={registerForm}
              errors={errors}
              required={true}
              id="email"
              label="Email address"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={registerForm}
              errors={errors}
              required={true}
              id="password"
              label="Password"
              type="password"
            />

            {/* REGISTER Variant Fields */}
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                register={registerForm}
                errors={errors}
                required={true}
                id="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            )}
            <div>
              <Button
                disabled={isLoading}
                fullWidth
                type="submit"
                style="flex items-center gap-x-2 mt-4 py-4 "
              >
                {variant === "LOGIN" ? "Sign in" : "Register"}
                {isLoading && <FiLoader className="animate-spin" />}
              </Button>
            </div>
          </form>


          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 ">
            <div>
              {variant === "LOGIN"
                ? "New ?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    );
};

export default AuthForm;