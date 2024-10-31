import React from "react";
import style from "./Heading.module.css"

interface Props {
  children: React.ReactNode;
}

export function Heading({ children }: Props) {
  return <div className={style.heading}>{children}</div>;
}
