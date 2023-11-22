import { THEME } from "@components/theme/theme";
import type { State } from "@store/modules/cumulative-precipitation/types";
import { type SeriesOptionsType } from "highcharts";

export const generateSeries = (data: NonNullable<State["data"]>): SeriesOptionsType[] => [
  {
    color: THEME["color-info-light"],
    lineWidth: 0,
    name: "Optimal Precip. Zone",
    type: "arearange",
    data: Object.entries(data.historicalAverage).map(([date, value]) => [
      Number(date),
      value - data.thresholds.optimal,
      value + data.thresholds.optimal,
    ]),
  },
  {
    color: THEME["color-info"],
    name: "Historical Average (10 yr)",
    type: "line",
    lineWidth: 3,
    dashStyle: "Dash",
    data: Object.entries(data.historicalAverage).map(([date, value]) => [Number(date), value]),
  },
  {
    color: THEME["color-neutral-0"],
    name: "Current Precip.",
    type: "line",
    lineWidth: 3,
    data: Object.entries(data.current).map(([date, value]) => [Number(date), value]),
  },
];
