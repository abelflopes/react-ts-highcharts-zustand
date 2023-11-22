// React
import React, { useMemo } from "react";
// Utils
import classNames from "classnames";
// Styles
import styles from "./index.module.scss";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  skin: "large" | "text";
}

let n = 1;

export const Skeleton = ({
  skin,
  children,
  className,
  style,
  ...otherProps
}: Readonly<SkeletonProps>): React.ReactElement => {
  const N = useMemo(() => n++ % 3, []);

  return (
    <div
      className={classNames(styles.root, styles[skin], className)}
      style={{
        ...style,
        "--n": N,
      }}
      {...otherProps}
    />
  );
};
