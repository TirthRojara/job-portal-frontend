"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormInput } from "./custom-form";
import Link from "next/link";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiResponse } from "@/types/api";
import {
    LoginPayLoad,
    LoginResponse,
    loginSchema,
} from "@/features/auth/login/api/types";
import { useLogin } from "@/features/auth/login/api/mutation";
import { useRouter } from "next/navigation";
import { appActions } from "@/store/app.slice";
import { useAppDispatch } from "@/store/index.store";
import api from "@/lib/axios/client";
import { loginWithOAuth } from "@/features/auth/login/api/api";


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { mutate, isPending } = useLogin();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const form = useForm<LoginPayLoad>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(formData: LoginPayLoad) {
        const mutateData = {
            email: formData.email,
            password: formData.password,
            isRememberMe: false,
        };

        mutate(mutateData, {
            onSuccess: (data: ApiResponse<LoginResponse>) => {
                //     toast.success("Login successful!");
                //     dispatch(appActions.setAccessToken(data.data?.token));
                router.push(`/dashboard/${data.data?.role.toLowerCase()}`);
            },
        });
    }

    const oAuthHandle = async () => {
        loginWithOAuth()
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {/* <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field> */}

                            {/* EMAIL FIELD */}
                            <Controller
                                control={form.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field} // Spreads onChange, onBlur, value, ref
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            // Show red border if error exists (optional, depends on your UI)
                                            className={
                                                fieldState.error
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {/* Show Error Message */}
                                        {fieldState.error && (
                                            <span className="text-sm text-red-500">
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* PASSWORD FIELD */}
                            <Controller
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            className={
                                                fieldState.error
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {fieldState.error && (
                                            <span className="text-sm text-red-500">
                                                {fieldState.error.message}
                                            </span>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </Field> */}

                            <Field>
                                <Button
                                    type="submit"
                                    className={
                                        isPending
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }
                                >
                                    {isPending ? "Logging in..." : "Login"}
                                </Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={oAuthHandle}
                                >
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
