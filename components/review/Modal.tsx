"use client";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
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

interface FormProps {
  rating: number;
  review: string;
}
export default function Modal() {
  const initialValues = {
    rating: 0,
    review: "",
  };

  const handleSubmit = async (values: FormProps) => {};
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
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
        <AppForm initialValues={initialValues} onSubmit={handleSubmit}>
          <Rating />
          <InputField
            name="review"
            label="Review"
            placeholder="Your Review"
            iconName="message-square"
            multiline
          />
        </AppForm>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
