import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ItemState {
  items: string[];
  setItems: (items: string[]) => void;
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  clearItems: () => void;
}

export const useItemStore = create<ItemState>()(
  devtools(
    set => ({
      items: [],
      setItems: items => set({ items }),
      addItem: item => set(state => ({ items: [...state.items, item] })),
      removeItem: item =>
        set(state => ({ items: state.items.filter(i => i !== item) })),
      clearItems: () => set({ items: [] }),
    }),
    { name: 'item' },
  ),
);
