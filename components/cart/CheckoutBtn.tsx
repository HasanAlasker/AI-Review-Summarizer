import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function CheckoutBtn() {
  const [loading, setLoading] = useState(false);
  return (
    <Button onClick={() => {}} disabled={loading} className="py-6">
      Checkout
      {loading ? <Spinner /> : <ArrowRight data-icon={"inline-start"} />}
    </Button>
  );
}
