import RegisterPage from "@/app/components/Register/RegisterPage";
import OpenRoute from "@/hooks/OpenRoute";
import Heading from "@/utils/Heading";

export default function Home() {
  return (
    <>
      <Heading
        title="Register Account | Your E-commerce Dashboard"
        description="Create your account to access our e-commerce dashboard. Manage products, track sales, and grow your business with our powerful tools."
        keywords="register, sign up, e-commerce, dashboard, online store, merchant account, business tools"
      />
      <OpenRoute>
        <RegisterPage />
      </OpenRoute>
    </>
  );
}
