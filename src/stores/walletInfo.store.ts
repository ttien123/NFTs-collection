import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WalletInfo = {
  address: string;
  balance: string;
  chainId: number;
};

type State = {
  walletInfo: WalletInfo | null;
};

type Actions = {
  setWalletInfo: (info: WalletInfo | null) => void;
  reset: () => void;
};

const initialState: State = {
  walletInfo: null,
};

const useWalletInfoStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setWalletInfo: (info) => set({ walletInfo: info }),
      reset: () => set(initialState),
    }),
    {
      name: "wallet-info-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        walletInfo: state.walletInfo,
      }),
    }
  )
);

export default useWalletInfoStore;
