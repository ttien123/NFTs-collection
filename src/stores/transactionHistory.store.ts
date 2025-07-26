import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TransactionInfo = {
  hash: string;
  from: string;
  to: string;
  value: string;
  addressNft?: string;
};

type State = {
  transactionInfo: TransactionInfo[];
};

type Actions = {
  setTransactionInfo: (info: TransactionInfo[]) => void;
  reset: () => void;
};

const initialState: State = {
  transactionInfo: [],
};

const useTransactionHistoryStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setTransactionInfo: (info) => set({ transactionInfo: info }),
      reset: () => set(initialState),
    }),
    {
      name: "transaction-history-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactionInfo: state.transactionInfo,
      }),
    }
  )
);

export default useTransactionHistoryStore;
