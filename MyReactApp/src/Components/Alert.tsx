import { ReactNode } from "react";

//import React from 'react'
interface alertProps {
  children: ReactNode;
}
const Alert = ({ children }: alertProps) => {
  return <div className="Alert alert-primary ">{children}</div>;
};

export default Alert;
