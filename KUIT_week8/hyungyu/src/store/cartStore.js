import { create } from "zustand"; 

import { getCart, updateCart, getMenusFrom, updateMenusFrom } from "../apis/cart";

const initialState = {
    store: undefined,
    menus: [],
}

const useCartStore = create((set, get) => ({
    store: initialState.store,
    menus: initialState.menus,
    menusFrom: initialState.store,

    addMenu: (menu) => {
        set((state) => {
            const existingMenu = state.menus.find((m) => m.id === menu.id);
            const updatedMenus = existingMenu
                ? state.menus.map((m) =>
                    m.id === menu.id ? { ...m, quantity: m.quantity + 1 } : m
                    )
                : [...state.menus, { ...menu, quantity: 1 }];
            // 상태 업데이트
            // const updatedState = {
            //     ...state,
            //     store,
            //     menus: updatedMenus,
            //     menusFrom : store,
            // };
        
            // 서버와 동기화
            updateCart(updatedMenus);
            //return updatedState;
        });
    },
    fetchMenusFrom: async () => {
        const data = await getMenusFrom();
        console.log("Fetched MenusFrom", data);
        set(() => ({
            menusFrom: data.menusFrom || initialState.store, // 메뉴가 없으면 undefined
        }));
    },
    fetchCart: async () => {
        const data = await getCart();
        console.log("Fetched Cart", data);
        set(() => ({
            menus: data.menus || [], // 메뉴가 없으면 빈 배열
        }));
    },
    setMenusFrom: (store) => {
        updateMenusFrom(store);
    },
    resetStore: () => {
        set((state) => ({...state, menus: initialState.menus, menusFrom: initialState.store}));
    },
}));

export default useCartStore;