import { create } from "zustand";
import { persist } from "zustand/middleware";

interface favoriteNftType {
  tokenAddress?: string;
  price?: number;
  owner?: string;
  name?: string;
  image?: string;
  description?: string;
  collectionName?: string;
}

type State = {
  favoriteList: favoriteNftType[];
};

type Actions = {
  setFavoriteList: (list: favoriteNftType[]) => void;
  reset: () => void;
};

const initialState: State = {
  favoriteList: [],
};

const useGetFavoriteList = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setFavoriteList: (list) => set(() => ({ favoriteList: list })),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "favorite-nft-list",
      partialize: (state) => ({ favoriteList: state.favoriteList }),
    }
  )
);

export default useGetFavoriteList;
