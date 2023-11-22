// API
import { getData } from "@services/api";
// Utils
import { type Module, type State } from "./types";
import { type ActionCreator } from "@store/common/types";
import { createStore } from "@store/common/create-store";

// Initial State

const initialState: State = {
  loading: 0,
  error: undefined,
  data: undefined,
};

// Actions

const createLoadAction: ActionCreator<Module, Module["load"]> = (set) => async (options) => {
  set((state) => ({ loading: state.loading + 1 }));

  try {
    const data = await getData(options);

    set(() => ({ data }));
  } catch (error: unknown) {
    const formattedError = error instanceof Error ? error.message : String(error);

    set(() => ({ error: formattedError }));
  }

  set((state) => ({ loading: state.loading - 1 }));
};

const createResetAction: ActionCreator<Module, Module["reset"]> = (set) => () => {
  set(initialState);
};

// Data

export const store = createStore<Module>((...a) => ({
  ...initialState,
  load: createLoadAction(...a),
  reset: createResetAction(...a),
}));
