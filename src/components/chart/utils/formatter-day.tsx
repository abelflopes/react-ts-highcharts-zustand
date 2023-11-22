import { type AxisLabelsFormatterCallbackFunction } from "highcharts";
import { renderToStaticMarkup } from "react-dom/server";
import styles from "../index.module.scss";

export const formatterDay: AxisLabelsFormatterCallbackFunction = (e) => {
  const index = e.axis.tickPositions?.indexOf(e.pos);
  const previous = index && e.axis.tickPositions?.[index - 1];
  const next = index && e.axis.tickPositions?.[index + 1];
  const nextIsLast =
    next &&
    e.axis.tickPositions &&
    e.axis.tickPositions?.indexOf(next) === e.axis.tickPositions.length - 1;

  const prevDate = previous ? new Date(previous) : undefined;
  const currDate = new Date(e.value);

  const displayMonth =
    prevDate?.getMonth() !== currDate?.getMonth() &&
    currDate.toLocaleDateString("en-US", {
      month: "short",
    });

  const [day, month] = [currDate.getDate(), displayMonth].filter(Boolean);

  return e.isLast
    ? ""
    : renderToStaticMarkup(
        <>
          {nextIsLast ? <b>{day}</b> : day}

          {month && <span className={styles.chart_label_month}>{month}</span>}
        </>,
      );
};
