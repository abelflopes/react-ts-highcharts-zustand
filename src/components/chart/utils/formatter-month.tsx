import { type AxisLabelsFormatterCallbackFunction } from "highcharts";
import { renderToStaticMarkup } from "react-dom/server";

export const formatterMonth: AxisLabelsFormatterCallbackFunction = (e) => {
  const index = e.axis.tickPositions?.indexOf(e.pos);
  const next = index && e.axis.tickPositions?.[index + 1];
  const nextIsLast =
    next &&
    e.axis.tickPositions &&
    e.axis.tickPositions?.indexOf(next) === e.axis.tickPositions.length - 1;

  const label = new Date(e.value).toLocaleDateString("en-US", {
    month: "short",
  });
  return e.isLast ? "" : nextIsLast ? renderToStaticMarkup(<b>{label}</b>) : label;
};
