import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function Grid({ children }: Props) {
  return <div className="grid md:grid-cols-2 gap-5">{children}</div>;
}
