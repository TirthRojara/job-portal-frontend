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
    FieldSeparator,
} from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { FormInput, FormSelect } from "./custom-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SelectItem } from "./ui/select";
import { SignupFormData, signupSchema } from "@/features/auth/signup/api/types";
import { useSignup } from "@/features/auth/signup/api/mutation";
import { toast } from "sonner";
import { ApiError } from "@/types/api";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { mutate, isPending } = useSignup();
    const router = useRouter();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        // defaultValues: {
        //     name: "",
        //     email: "",
        //     password: "",
        //     role: undefined,
        // },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    function onSubmit(data: SignupFormData) {
        console.log({ data });

        mutate(data, {
            onSuccess: (data: ApiError) => {
                toast.success(`${data.message}`);
                console.log("Signup successful:", data);
                router.push(`/signup/otp`);
            },
        });
    }

    const onGoogleClick = () => {
        router.push("/signup/role");
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
                                name="name"
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

                            <FormSelect
                                control={form.control}
                                name="role"
                                label="Role"
                                placeholder="Select Role"
                                errorReserve
                            >
                                <SelectItem key="CANDIDATE" value="CANDIDATE">
                                    Candidate
                                </SelectItem>
                                <SelectItem key="RECRUITER" value="RECRUITER">
                                    Recruiter
                                </SelectItem>
                            </FormSelect>

                            <Field>
                                <Button
                                    type="submit"
                                    className={`${
                                        isPending
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    Create Account
                                </Button>
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
