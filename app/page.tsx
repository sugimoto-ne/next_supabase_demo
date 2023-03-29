import { AuthForm } from "./components/AuthForm";

const page = () => {

  return (

      <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
          <div className="w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg">
            <AuthForm />
          </div>
      </div>

  );
}

export default page;