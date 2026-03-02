import { LoginForm } from "@/components/login-form";

export default function Page() {
    return (
        <div className="flex flex-col md:flex-row gap-10 min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm ">
                <LoginForm />
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className=" text-red-500 text-2xl">Recruiter Id & password</h3>
                    <p className=" text-green-500 text-xl">Email: test2@gmail.com</p>
                    <p className=" text-green-500 text-xl">Password: test1234</p>
                </div>
                <div>
                    <h3 className=" text-red-500 text-2xl">Candidate Id & password</h3>
                    <p className=" text-green-500 text-xl">Email: test1@gmail.com</p>
                    <p className=" text-green-500 text-xl">Password: test1234</p>
                </div>
            </div>
        </div>
    );
}
