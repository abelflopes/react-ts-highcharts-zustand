// React
import React, { useEffect, useRef, useState } from "react";
// Styles
import styles from "./index.module.scss";
import classNames from "classnames";
// Icon
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { THEME } from "@components/theme/theme";

export interface SpinnerProps {
  active: boolean;
  children: React.ReactNode;
}

export const Spinner = ({ active, children }: Readonly<SpinnerProps>): React.ReactElement => {
  const [computedActive, setComputedActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (active === computedActive) return;

    clearTimeout(timeoutRef.current);

    if (active) {
      timeoutRef.current = setTimeout(() => {
        setComputedActive(true);
      }, 100);
    } else {
      setComputedActive(false);
    }
  }, [active, computedActive]);

  return (
    <div
      className={classNames(styles.root, {
        [`${styles.active}`]: computedActive,
      })}>
      <div className={styles.content}>{children}</div>

      {computedActive && (
        <div className={styles.overlay}>
          <CgSpinnerTwoAlt
            className={styles.icon}
            size={Number.parseInt(THEME["spacing-xl"], 10)}
          />
        </div>
      )}
    </div>
  );
};
