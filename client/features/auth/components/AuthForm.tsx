/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { FiLoader } from 'react-icons/fi';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/inputs/Input';
import Button from '@/components/Button';
import { LoginFormType, loginSchema } from '../validations/loginSchema';
import { RegisterFormType, registerSchema } from '../validations/registerSchema';
import { useCallback, useMemo } from 'react';
import { useAuthForm } from '../hooks/useAuthForm';

const AuthForm = () => {
  const { variant, isLoading, toggleVariant, loginMutation, registerMutation } = useAuthForm();


  const formResolver = useMemo(() =>
    zodResolver(variant === 'LOGIN' ? loginSchema : registerSchema),
    [variant]);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },

  } = useForm<LoginFormType | RegisterFormType>({
    resolver: formResolver,
  });



  const onSubmit = useCallback(async (data: LoginFormType | RegisterFormType) => {
    if (variant === 'LOGIN') {
      loginMutation.mutate(data as LoginFormType);
    } else {
      registerMutation.mutate(data as RegisterFormType);
    }
  }, [variant, loginMutation, registerMutation]);


  // here i memoriz formtite and button text and toogle
  const formTitle = useMemo(() =>
    variant === "REGISTER" ? "Create an account" : "Sign in to your account",
    [variant]);

  // Memoize button text
  const buttonText = useMemo(() =>
    variant === "LOGIN" ? "Sign in" : "Register",
    [variant]);

  // Memoize toggle text
  const toggleText = useMemo(() => ({
    question: variant === "LOGIN" ? "New ?" : "Already have an account?",
    action: variant === "LOGIN" ? "Create an account" : "Login"
  }), [variant]);


  // here we memorize input field to avoid unc
  const InputField = useCallback(({ id, label, type, required = true }: any) => (
    <Input
      disabled={isLoading}
      register={registerForm}
      errors={errors}
      required={required}
      id={id}
      label={label}
      type={type}
    />
  ), [isLoading, registerForm, errors]);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="pb-6 text-center text-3xl font-bold tracking-tight text-white mb-10">
            {formTitle}
          </h2>

          {variant === "REGISTER" && (
            <InputField
              id="username"
              label="Username"
              required={false}
            />
          )}

          <InputField
            id="email"
            label="Email address"
            type="email"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
          />

          {variant === "REGISTER" && (
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          )}

          <Button
            disabled={isLoading}
            fullWidth
            type="submit"
            style="flex items-center gap-x-2 mt-4 py-4"
          >
            {buttonText}
            {isLoading && <FiLoader className="animate-spin" />}
          </Button>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{toggleText.question}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {toggleText.action}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;