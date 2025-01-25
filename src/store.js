import { create } from "zustand";

const store = (set) => ({
  API_KEY: "AIzaSyAImUgxRkNI3DPY478sAmZ5s5K1YgAHJ3k",
  sideBar: false,
  category: 0,
  data: [],
  searchData: [],
  valueConventer: (val) => {
    if (val >= 1000000) {
      return Math.floor(val / 1000000) + "M";
    } else if (val >= 1000) {
      return Math.floor(val / 1000) + "K";
    } else {
      return val;
    }
  },
  randomData: (data) => {
    const dataCopy = [...data];
    for (let i = 0; i < dataCopy.length - 1; i++) {
      const RN = Math.floor(Math.random() * dataCopy.length);
      [dataCopy[i], dataCopy[RN]] = [dataCopy[RN], dataCopy[i]];
    }
    return dataCopy;
  },
  toggleSideBar: () => {
    set((state) => ({
      sideBar: !state.sideBar,
    }));
  },
  setData: (data) => set({ data: data }),
  setCategory: (value) => set({ category: value }),
  setSearchData: (searched) => set({ searchData: searched }),
});

export const useStore = create(store);
