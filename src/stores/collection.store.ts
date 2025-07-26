import { CollectionDetail, CollectionType } from "@/types/collection.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  nftSelected: CollectionDetail | null;
  collectionSelected: CollectionType | null;
};

type Actions = {
  setNftSelected: (nft: CollectionDetail | null) => void;
  setCollectionSelected: (collection: CollectionType | null) => void;
  reset: () => void;
};

const initialState: State = {
  nftSelected: null,
  collectionSelected: null,
};

const useCollectionStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setNftSelected: (nft) => set({ nftSelected: nft }),
      setCollectionSelected: (collection) =>
        set({ collectionSelected: collection }),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "collection-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        nftSelected: state.nftSelected,
        collectionSelected: state.collectionSelected,
      }),
    }
  )
);

export default useCollectionStore;
