// React
import React, { useCallback, useEffect, useId, useState } from "react";
// Styles
import styles from "./index.module.scss";

export interface ChoiceProps<T extends string[]> {
  value: T[number];
  values: T;
  onChange: (value: T[number]) => void;
}

export const Choice = <T extends string[]>({
  values,
  onChange,
  value,
}: Readonly<ChoiceProps<T>>): React.ReactElement => {
  const id = useId();
  const [computedValue, setComputedValue] = useState(value);

  const changeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setComputedValue(e.target.value);
    },
    [setComputedValue],
  );

  useEffect(() => {
    setComputedValue(value);
  }, [value]);

  useEffect(() => {
    onChange(computedValue);
  }, [computedValue, onChange]);

  return (
    <fieldset className={styles.root}>
      {values.map((i) => (
        <React.Fragment key={i}>
          <input
            id={id + i}
            type="radio"
            name={id}
            value={i}
            checked={i === computedValue}
            className={styles.input}
            onChange={changeHandler}
          />
          <label htmlFor={id + i} className={styles.label}>
            {i}
          </label>
        </React.Fragment>
      ))}
    </fieldset>
  );
};
