// React
import React from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./index.module.scss";

export interface LegendProps extends React.HTMLAttributes<HTMLSpanElement> {
  skin: "main" | "reference" | "reference-area" | "danger" | "warning" | "success";
}

export const Legend = ({
  skin,
  children,
  className,
  ...otherProps
}: Readonly<LegendProps>): React.ReactElement => (
  <span className={classNames(styles.root, styles[skin], className)} {...otherProps}>
    <span className={styles.icon} />
    {children}
  </span>
);
