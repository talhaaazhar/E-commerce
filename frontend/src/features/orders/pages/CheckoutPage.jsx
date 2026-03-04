import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useAuth } from "../../auth/hooks/useAuth";

function CheckoutPage() {
  const { user } = useAuth();

  return (
    <div className="py-6">
      <CheckoutForm user={user} />
    </div>
  );
}

export default CheckoutPage;
