import AuthForm from "@/features/auth/components/AuthForm";



export default function Auth() {

  return (
    <div
      className="
        flex 
        h-screen 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-900
        
      "
    >
      <AuthForm />
    </div>
  );
}
