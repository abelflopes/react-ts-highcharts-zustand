import React, { useCallback, useEffect, useState } from "react";
import { Store } from "@store/index";
import { Chart } from "@components/chart";
import { Card } from "@components/card";
import { Theme } from "@components/theme";
import { Choice } from "@components/choice";
import { Form } from "@components/form";
import { Input } from "@components/input";
import { apiControlFields } from "./api-control-fields";

const VIEWS: Array<"mth" | "yr"> = ["mth", "yr"];

export const App = (): React.ReactElement => {
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(apiControlFields).map(([key, data]) => [key, data.value?.toString() ?? ""]),
    ),
  );
  const [view, setView] = useState<(typeof VIEWS)[number]>(VIEWS[0]);

  const fetch = Store.cumulativePrecipitation.useLoad();
  const loading = Store.cumulativePrecipitation((state) => state.loading > 0);
  const data = Store.cumulativePrecipitation.useData();
  const error = Store.cumulativePrecipitation.useError();

  const changeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    const form = e.currentTarget.closest<HTMLFormElement>("form");

    setFormData((v) => ({
      ...v,
      [e.target.name]: e.target.value,
    }));

    form?.reportValidity();
  }, []);

  useEffect(() => {
    const {
      from,
      to,
      shuffleProbability,
      currentMin,
      currentMax,
      shuffleDistance,
      precision,
      historyAverageMin,
      historyAverageMax,
    } = formData;

    void fetch({
      from,
      to,
      shuffleProbability: Number(shuffleProbability),
      shuffleDistance: Number(shuffleDistance),
      currentMin: Number(currentMin),
      currentMax: Number(currentMax),
      precision: Number(precision),
      historyAverageMin: Number(historyAverageMin),
      historyAverageMax: Number(historyAverageMax),
    });
  }, [fetch, formData]);

  useEffect(() => {
    if (view === "mth") {
      setFormData((v) => ({
        ...v,
        from: "2023-10-14",
        to: "2023-11-14",
      }));
    } else {
      setFormData((v) => ({
        ...v,
        from: "2022-01-01",
        to: "2022-12-31",
      }));
    }
  }, [view]);

  return (
    <Theme>
      <Card>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Chart data={data} loading={loading} labelStyle={view === "yr" ? "month" : "day"}>
          Cumulutive Precipitation <Choice value={view} values={VIEWS} onChange={setView} />
        </Chart>
      </Card>
      <Form>
        {Object.keys(formData).map((key) => (
          <Input
            key={key}
            {...apiControlFields[key]}
            name={key}
            value={formData[key]}
            onChange={changeHandler}
          />
        ))}
      </Form>
    </Theme>
  );
};
