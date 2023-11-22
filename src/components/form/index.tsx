// React
import React from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./index.module.scss";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = ({ className, ...otherProps }: Readonly<FormProps>): React.ReactElement => (
  <form className={classNames(styles.root, className)} {...otherProps} />
);
