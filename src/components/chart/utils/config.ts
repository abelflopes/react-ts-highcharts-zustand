import { THEME } from "@components/theme/theme";
import { type Options, type CSSObject } from "highcharts";

export const LABEL_STYLE: CSSObject = {
  color: THEME["color-neutral-1"],
  fontSize: THEME["font-size-s"],
  fontFamily: THEME["font-family"],
};

export const BASE_CONFIG: Options = {
  chart: {
    zooming: {
      type: "x",
    },
  },
  title: {
    text: undefined,
  },
  plotOptions: {
    line: {
      marker: {
        enabled: false,
      },
    },
    arearange: {
      marker: {
        enabled: false,
      },
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
};
