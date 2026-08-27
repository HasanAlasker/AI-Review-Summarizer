"use client";
import { placeOrder } from "@/app/actions/order";
import { updateUserInfo } from "@/app/actions/user";
import { useCart } from "@/app/store/useCart";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "formik";
import { ArrowRight, Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import AppForm from "../form/AppForm";
import InputField from "../form/Input";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";

export interface FormValues {
  phone: string;
  street: string;
}

const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
  street: Yup.string()
    .required("Street name is required")
    .min(3, "Street name must be at least 3 characters"),
});

export default function CheckoutBtn() {
  const { data, update } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues: FormValues = {
    phone: data?.user.phone ?? "",
    street: data?.user.street ?? "",
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const userResult = await updateUserInfo(values);
      if (!userResult.success) {
        toast.error(userResult.message);
        return;
      }

      const orderResult = await placeOrder();
      if (!orderResult.success) {
        toast.error(orderResult.message);
        return;
      }

      useCart.getState().clearCart();
      await update();

      toast.success("We received your order!");
      setOpen(false);
    } catch (err) {
      // Only truly unexpected errors land here now (network failure, etc.)
      console.error(err);
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button onClick={() => {}} disabled={loading} className="py-6 px-3">
            Checkout
            <ArrowRight data-icon={"inline-end"} />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order confirmation</DialogTitle>
          <DialogDescription>
            Please make sure your delivery information is correct, we will
            contact you on the provided phone number.
          </DialogDescription>
        </DialogHeader>
        <AppForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form>
            <FieldGroup>
              <InputField
                label="Phone number"
                name="phone"
                placeholder="Phone Number"
                iconName="phone"
              />
              <InputField
                label="Street name"
                name="street"
                placeholder="Street Name"
                iconName="map-pin"
              />
            </FieldGroup>
            <DialogFooter className="mt-7">
              <DialogClose
                render={
                  <Button variant="outline" disabled={loading}>
                    Cancel <X data-icon={"inline-end"} />
                  </Button>
                }
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Placing order" : "Confirm"}
                {loading ? <Spinner /> : <Check data-icon={"inline-end"} />}
              </Button>
            </DialogFooter>
          </Form>
        </AppForm>
      </DialogContent>
    </Dialog>
  );
}
