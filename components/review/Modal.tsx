"use client";
import { Check, Star, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Rating from "./Rating";
import AppForm from "../form/AppForm";
import InputField from "../form/Input";
import * as Yup from "yup";
import { Form } from "formik";
import { FieldGroup } from "../ui/field";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .required("Rating is required"),
  review: Yup.string().trim().min(15).max(550).required("Review is required"),
});

interface Props {
  productId: string;
  variant?: "default" | "secondary" | "outline";
}
interface FormProps {
  rating: number;
  review: string;
}

export default function RatingModal({ productId, variant }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    rating: 0,
    review: "",
  };

  const handleSubmit = async (values: FormProps) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/reviews/${productId}`, values);
      if (res.status === 201) {
        toast.success("Review posted successfully!");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to submit review!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={variant ?? "default"}>
            <Star />
            Leave a review
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Review</DialogTitle>
          <DialogDescription>
            When leaving a review, make sure to be honest and mention the pros
            and cons, to be as helpful as possible to other customers.
          </DialogDescription>
        </DialogHeader>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <FieldGroup>
              <Rating name="rating" />
              <InputField
                name="review"
                label="Review"
                placeholder="Your Review"
                iconName="message-square"
                multiline
              />
              <DialogFooter>
                <DialogClose
                  render={
                    <Button type="button" disabled={loading} variant="outline">
                      Cancel <X data-icon={"inline-end"} />
                    </Button>
                  }
                />
                <Button type="submit" disabled={loading}>
                  Submit{" "}
                  {loading ? <Spinner /> : <Check data-icon={"inline-end"} />}
                </Button>
              </DialogFooter>
            </FieldGroup>
          </Form>
        </AppForm>
      </DialogContent>
    </Dialog>
  );
}
