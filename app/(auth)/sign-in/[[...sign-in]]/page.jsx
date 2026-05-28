import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/signIn.jpg"
          alt="Sign In"
          fill
          className="object-cover"
          priority
        />

        {/* Optional Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Optional Text */}
        <div className="absolute bottom-10 left-10 text-white z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            Welcome Back 👋
          </h1>
          <p className="text-lg text-gray-200">
            Practice AI Mock Interviews and boost your confidence.
          </p>
        </div>
      </div>

      {/* Right Side - Sign In */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-6 py-10 bg-white">
        <div className="w-full max-w-md flex justify-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
}