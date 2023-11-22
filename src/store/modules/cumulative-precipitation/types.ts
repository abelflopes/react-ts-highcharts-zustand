import { type GetDataOptions, type CumulativePrecipitation } from "@services/api";

interface Actions {
  load: (options: GetDataOptions) => Promise<void>;
  reset: () => void;
}

export interface State {
  loading: number;
  error: string | undefined;
  data: CumulativePrecipitation | undefined;
}

export interface Module extends Actions, State {}
