'use client';

import { useMutation } from "@tanstack/react-query";
import { useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { LoginFormType } from "../validations/loginSchema";
import { RegisterFormType } from "../validations/registerSchema";


const loginUser = async (loginData: LoginFormType) => {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;
};

const registerUser = async (registerData: RegisterFormType) => {
    const response = await axiosInstance.post('/auth/signup', registerData);
    return response.data;
};

type Variant = 'LOGIN' | 'REGISTER';

export const useAuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const router = useRouter();
    const { login: loginContext } = useAuth();

    // toast config 
    const toastConfig = useMemo(() => ({
        success: {
            icon: "👏",
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
            },
        },
    }), []);

    // here i handle login succfull
    const handleLoginSuccess = useCallback((data: any) => {
        loginContext(data.token, data.user);
        toast("Login Successfully!", toastConfig.success);
        router.replace("/dashboard");
    }, [loginContext, router, toastConfig]);


    // here i handle login register
    const handleRegisterSuccess = useCallback(() => {
        toast("Register Successfully!", toastConfig.success);
        setVariant('LOGIN');
    }, [toastConfig]);



    // error handle
    const handleError = useCallback((error: any, action: string) => {
        const errorMessage = error?.data?.message || error.message || `${action} failed`;
        console.error(errorMessage);
        toast.error(errorMessage);
    }, []);

    //  this mutation for login
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: handleLoginSuccess,
        onError: (error) => handleError(error, 'Login')
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: handleRegisterSuccess,
        onError: (error) => handleError(error, 'Registration')
    });

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
    }, []);

    const isLoading = useMemo(() =>
        loginMutation.isPending || registerMutation.isPending,
        [loginMutation.isPending, registerMutation.isPending]);

    return {
        variant,
        isLoading,
        toggleVariant,
        loginMutation,
        registerMutation
    };
};