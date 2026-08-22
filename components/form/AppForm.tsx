import { Formik, FormikProps } from "formik";
import { ReactNode } from "react";

interface Props<T> {
  children: ((props: FormikProps<T>) => ReactNode) | ReactNode;
  initialValues: T;
  validationSchema?: object;
  onSubmit: (values: T, helpers: any) => void;
  enableReinitialize?: boolean;
  validateOnBlur?: boolean;
}

function AppForm<T extends object>({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  enableReinitialize,
  validateOnBlur,
}: Props<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
      validateOnBlur={validateOnBlur ?? true}
    >
      {(formikProps) => (
        <>{typeof children === "function" ? children(formikProps) : children}</>
      )}
    </Formik>
  );
}

export default AppForm;
