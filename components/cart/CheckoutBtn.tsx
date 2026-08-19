"use client";
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
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from "yup";
import AppForm from "../form/AppForm";
import InputField from "../form/Input";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { updateUserInfo } from "@/app/actions/user";
import { toast } from "sonner";
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
  const [loading, setLoading] = useState(false);

  const initialValues: FormValues = {
    phone: data?.user.phone ?? "",
    street: data?.user.street ?? "",
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await updateUserInfo(values);
      await update(); // jwt() re-fetches from DB itself
      // continue checkout flow
      // close dialog here
    } catch (err) {
      console.error(err);
      toast.error("Couldn't confirm order, try later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button onClick={() => {}} disabled={loading} className="py-6">
            Checkout
            {loading ? <Spinner /> : <ArrowRight data-icon={"inline-start"} />}
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
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </Form>
        </AppForm>
      </DialogContent>
    </Dialog>
  );
}
