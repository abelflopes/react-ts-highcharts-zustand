// React
import React, { useId } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./index.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({
  id,
  className,
  ...otherProps
}: Readonly<InputProps>): React.ReactElement => {
  const uid = useId();

  return (
    <div className={classNames(styles.root, className)}>
      <label className={styles.label} htmlFor={id ?? uid}>
        {otherProps.placeholder}
      </label>
      <input className={styles.input} id={id ?? uid} {...otherProps} />
    </div>
  );
};
