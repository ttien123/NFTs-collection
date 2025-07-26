import { favoriteNftType } from "@/types/collection.type";
import { create } from "zustand";

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

const useGetFavoriteList = create<State & Actions>()((set) => ({
  ...initialState,
  setFavoriteList: (list) =>
    set((state) => ({ favoriteList: (state.favoriteList = list) })),
  reset: () => {
    set(initialState);
  },
}));

export default useGetFavoriteList;
