import { type StateCreator, create } from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";

export const createStore = <T extends object>(
  stateCreator: StateCreator<T>,
): ReturnType<typeof createSelectorHooks<T>> => {
  const useStoreBase = create(stateCreator);

  const useStore = createSelectorHooks(useStoreBase);

  return useStore;
};
