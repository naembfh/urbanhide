"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useUserLogin } from "@/hooks/auth.hook";
import VBForm from "../components/form/VBForm";
import VBInput from "../components/form/VBInput";
import { useUser } from "@/context/user.provider";
import loginValidationSchema from "@/schemas/logoin.schema";
import Loading from "../components/Loading";

const LoginPage = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const [redirect, setRedirect] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setRedirect(urlParams.get("redirect"));
    }
  }, []);

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push(redirect || "/");
      userLoading(false);
    }
  }, [isPending, isSuccess, redirect, router, userLoading]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
        <p className="mb-4">Welcome Back! Let&apos;s Get Started</p>
        <div className="w-[35%]">
          <VBForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <VBInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <VBInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </VBForm>
          <div className="text-center">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
