import Image from "next/image";

export default function Home() {
    return (
        <main className=" flex flex-col md:flex-row gap-10 items-center justify-center mt-40 ">
            <div>
                <h2 className=" text-red-500 text-3xl">Recruiter Id & password</h2>
                <p className=" text-green-500 text-2xl">Email: test2@gmail.com</p>
                <p className=" text-green-500 text-2xl">Password: test1234</p>
            </div>
            <div>
                <h2 className=" text-red-500 text-3xl">Candidate Id & password</h2>
                <p className=" text-green-500 text-2xl">Email: test1@gmail.com</p>
                <p className=" text-green-500 text-2xl">Password: test1234</p>
            </div>
        </main>
    );
}
