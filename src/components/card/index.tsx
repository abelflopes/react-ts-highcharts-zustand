// React
import React from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./index.module.scss";

export const Card = ({
  children,
  className,
  ...otherProps
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement => (
  <div className={classNames(styles.root, className)} {...otherProps}>
    {children}
  </div>
);
