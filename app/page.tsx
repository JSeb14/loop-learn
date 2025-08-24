import { AuthButton } from "@/components/auth/auth-button";
import logo from "@/app/assets/logo.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-row items-center">
      <div className="flex-1 w-full flex flex-row gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-full p-5">
          <div className="flex flex-col gap-2 items-center w-full">
            <Image src={logo} width="200" alt="Logo" />

            <h1 className="mt-10 mb-4 text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center ">
              <b>Welcome to LoopLearn!</b>
            </h1>
            <p className="text-2xl lg:text-3xl max-w-xl text-center ">
              Build flexible flashcard sets for any subject to accelerate your
              learning, so you have more time to do the things you enjoy!{" "}
            </p>
            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            <p className="text-xl lg:text-2xl !leading-tight mx-auto max-w-xl text-center ">
              Get started today!{" "}
            </p>
            <AuthButton />
          </div>
        </div>
      </div>
    </main>
  );
}
