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
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormInput } from "./custom-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";



const loginSchema = z.object({
    fullname: z.string(),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: any) {
        console.log({ data });
        console.log(data.fullname);
        console.log(data.email);
        console.log(data.password);

        // form.reset();
    }

    const onGoogleClick = () => {
        router.push("/signup/role");
        // redirect("/signup/role");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Create your account
                    </CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <form> */}
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <FormInput
                                control={form.control}
                                name="fullname"
                                label="Full Name"
                                form={form}
                                placeholder="John Doe"
                                required
                            />

                            <FormInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="m@example.com"
                                required
                            />

                            <FormInput
                                control={form.control}
                                name="password"
                                label="Password"
                                required
                                type="password"
                            />

                            <Field>
                                <Button type="submit">Create Account</Button>
                                <FieldSeparator>
                                    Or continue with
                                </FieldSeparator>
                                <Button
                                    onClick={onGoogleClick}
                                    variant="outline"
                                    type="button"
                                >
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link href="/login">Log in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
