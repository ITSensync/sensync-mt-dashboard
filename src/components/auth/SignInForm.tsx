/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { authService } from "@/data/service";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SignInForm() {
  const [username, setUsernameValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const router = useRouter();
  const handleSubmitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!username || !password) {
      setIsLoading(false);
      setError("Username or Password cannot be empty!");
      setIsToastOpen(true);
      return;
    }

    const response = await authService.authAdjust({ username, password });
    if (response.status === 200) {
      setError(null);
      // sessionStorage.setItem("auth_token", response.access_token);
      Cookies.set("auth_token", response.access_token, {
        expires: 1 / 24,
        path: "/",
      });
      Cookies.set("id_device", response.id_device, {
        expires: 1 / 24,
        path: "/",
      });
      setSuccess("Login Successfull!");
      setTimeout(() => {
        router.push(process.env.LOCATION !== 'server' ? "/" : "/adjusment" );
      }, 2000);
    } else {
      setSuccess(null);
      console.log(response);
      setError(response.message);
    }
    setIsLoading(false);
    setIsToastOpen(true);
  };

  const handleOnToastClose = () => {
    setIsToastOpen(false);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isToastOpen) {
      timeoutId = setTimeout(
        () => {
          handleOnToastClose();
        },
        error ? 10000 : 5000
      ); // 10 / 5 detik
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Membersihkan timeout jika komponen di-unmount sebelum timeout tercapai
      }
    };
  }, [isToastOpen]);

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Welcome to Sensync Maintenance
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmitBtn}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="john doe"
                    name="username"
                    type="text"
                    defaultValue={username}
                    onChange={(e) => setUsernameValue(e.target.value)}
                  />
                </div>
                <div className="mb-10">
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      defaultValue={password}
                      minLength={6}
                      onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                {success && isToastOpen && (
                  <div className="toast toast-top toast-center text-white mt-10">
                    <div className="alert alert-success text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-lg font-bold">{success}</span>
                    </div>
                  </div>
                )}
                {error && isToastOpen && (
                  <div className="toast toast-top toast-center text-white mt-10">
                    <div className="alert alert-error text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-lg font-bold">{error}</span>
                    </div>
                  </div>
                )}

                {/* {success && (
                  <div
                    role="alert"
                    className="alert alert-success text-white mt-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{success}</span>
                  </div>
                )}
                {error && (
                  <div
                    role="alert"
                    className="alert alert-error text-white mt-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )} */}
                <div className="mt-6">
                  <Button
                    type="submit"
                    className={`w-full ${isLoading && "btn-disabled"}`}
                    size="sm"
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
