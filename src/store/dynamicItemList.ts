/*
This store is a generic store for a list of items. It is used to store a list of items of type T.
might be helpful later on for dynamic item lists.
*/

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ItemListState<T> {
  items: T[];
  setItems: (items: T[]) => void;
  addItem: (item: T) => void;
  removeItem: (item: T) => void;
  clearItems: () => void;
}

export const useItemListStore = <T>() =>
  create<ItemListState<T>>()(
    devtools(
      set => ({
        items: [],
        setItems: items => set({ items }),
        addItem: item => set(state => ({ items: [...state.items, item] })),
        removeItem: item =>
          set(state => ({ items: state.items.filter(i => i !== item) })),
        clearItems: () => set({ items: [] }),
      }),
      { name: 'itemList' },
    ),
  );
