import * as Yup from "yup";

export const imageSchema = Yup.object({
  publicId: Yup.string().required(),
  url: Yup.string().url().required(),
  isPrimary: Yup.boolean().required(),
});

// fields with identical rules in every context
export const productBaseSchema = {
  name: Yup.string().trim().required("Product name is required"),
  categoryId: Yup.string().required("Please select a category"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(15)
    .max(500),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  discountPrice: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === undefined || value === 0
        ? null
        : value,
    )
    .nullable()
    .optional()
    .test(
      "less-than-price",
      "discountPrice must be less than price",
      function (value) {
        if (value == null) return true;
        return value < this.parent.price;
      },
    ),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .integer()
    .min(0)
    .required("Stock is required"),
};

// backend: validates the flat upload shape directly
export const createProductSchema = Yup.object({
  ...productBaseSchema,
  images: Yup.array().of(imageSchema).min(1).required(),
});

export const updateProductSchema = createProductSchema; // identical today; split if that changes
