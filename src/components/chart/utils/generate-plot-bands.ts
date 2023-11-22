import { THEME } from "@components/theme/theme";
import type { State } from "@store/modules/cumulative-precipitation/types";
import { type XAxisPlotBandsOptions } from "highcharts";

export const generatePlotBands = (data: NonNullable<State["data"]>): XAxisPlotBandsOptions[] => {
  const out = Object.entries(data.current).map(
    ([date, value], index, arr): XAxisPlotBandsOptions | undefined => {
      const [nextDate] = arr[index + 1] || [];

      if (!nextDate) return undefined;

      const historyAverage = data.historicalAverage[date];

      let color = THEME["color-error"];

      if (
        value >= historyAverage - data.thresholds.optimal &&
        value <= historyAverage + data.thresholds.optimal
      ) {
        color = THEME["color-success"];
      } else if (
        value >= historyAverage - data.thresholds.moderate &&
        value <= historyAverage + data.thresholds.moderate
      ) {
        color = THEME["color-warning"];
      }

      return {
        from: Number(date),
        to: Number(nextDate),
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "transparent"],
            [0.975, "transparent"],
            [0.975, color],
            [1, color],
          ],
        },
        zIndex: 99,
      };
    },
  );

  const filtered = out.filter(function (value: unknown): value is XAxisPlotBandsOptions {
    return value !== undefined;
  });

  return filtered;
};
