import type { State } from "@store/modules/cumulative-precipitation/types";
import React, { useMemo } from "react";
import "highcharts/modules/exporting";
import Highcharts, { type Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HCMore from "highcharts/highcharts-more";
import styles from "./index.module.scss";
import { Legend } from "@components/legend";
import { Skeleton } from "@components/skeleton";
import { Spinner } from "@components/spinner";
import { formatterDay } from "./utils/formatter-day";
import { formatterMonth } from "./utils/formatter-month";
import { generatePlotBands } from "./utils/generate-plot-bands";
import { BASE_CONFIG, LABEL_STYLE } from "./utils/config";
import { generateSeries } from "./utils/generate-series";
import { THEME } from "@components/theme/theme";

export interface ChartProps {
  labelStyle: "month" | "day";
  data?: NonNullable<State["data"]>;
  loading?: boolean;
  children?: React.ReactNode;
}

HCMore(Highcharts);

export const Chart = ({
  labelStyle,
  loading = false,
  data,
  children,
}: Readonly<ChartProps>): React.ReactElement => {
  const options = useMemo<Options | undefined>((): Options | undefined => {
    if (!data) return;

    return {
      ...BASE_CONFIG,
      xAxis: {
        type: "datetime",
        labels: {
          format: labelStyle === "month" ? "{value:%b}" : undefined,
          style: LABEL_STYLE,
          autoRotation: undefined,
          distance: 7,
          padding: labelStyle === "month" ? 25 : 0,
          x: labelStyle === "month" ? 25 : 7,
          formatter: labelStyle === "day" ? formatterDay : formatterMonth,
          useHTML: true,
        },
        tickLength: 0,
        tickPixelInterval: labelStyle === "month" ? 50 : 40,
        gridLineWidth: 1,
        gridLineColor: THEME["color-neutral-3"],
        plotBands: generatePlotBands(data),
      },
      yAxis: {
        title: {
          text: undefined,
        },
        gridLineWidth: 0,
        labels: {
          format: "{value}in.",
          style: LABEL_STYLE,
        },
      },
      series: generateSeries(data),
    };
  }, [data]);

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        {data && options && (
          <>
            <h1 className={styles.title}>{children}</h1>

            <Spinner active={loading}>
              <HighchartsReact
                ref={(ref) => {
                  ref?.container.current?.classList.add(styles.chart);
                }}
                highcharts={Highcharts}
                options={options}
              />
            </Spinner>
          </>
        )}

        {!data && loading && (
          <>
            <Skeleton skin="text" />
            <Skeleton skin="large" />
          </>
        )}
      </div>
      <div className={styles.sidebar}>
        {data && (
          <>
            <h2 className={styles.subtitle}>Legend</h2>
            <Legend skin="reference">Historical Average (10 yr)</Legend>
            <Legend skin="main">Current Precip.</Legend>
            <Legend skin="reference-area">Optimal Precip. Zone</Legend>
            <span className={styles.section_title}>Daily Precipitation Score</span>
            <Legend skin="danger">High Risk</Legend>
            <Legend skin="warning">Moderate Risk</Legend>
            <Legend skin="success">Low Risk</Legend>
            <span className={styles.description}>
              The daily precipitation risk score is based on your location’s current precipitation
              levels and how much they differ from the historical average.
            </span>
          </>
        )}

        {!data && loading && (
          <>
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="text" />
            <Skeleton skin="large" />
          </>
        )}
      </div>
    </div>
  );
};
