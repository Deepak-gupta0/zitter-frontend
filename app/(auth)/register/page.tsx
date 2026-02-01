import { RegisterForm } from "@/components/auth.components";
import "@/styles/globals.css";
import { Link } from "@heroui/link";


export default function page() {

   
  return (
    <>
      <div className=" min-h-screen w-full">
        <div className="h-screen w-full flex flex-col items-center justify-center">
          <div className="md:h-fit lg:w-1/3 md:w-1/2 w-screen md:rounded-3xl dark:md:bg-gray-700/20 py-2 flex flex-col items-center px-3 ">
            <div className="text-3xl font-bold md:m-4 text-center m-2">
              Create Account
            </div>
           <RegisterForm />
            <p className="mb-3 mt-0 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
