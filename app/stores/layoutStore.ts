import { create } from "zustand";
import { Menu } from "../type/menu.type";

type LayoutModel = {
  refetchCookies: number;
  setRefetchCookies: (newState: number | ((prev: number) => number)) => void;
};

export const useOpenModalStore = create<LayoutModel>((set) => ({
  refetchCookies: 1,
  setRefetchCookies: (newState) =>
    set((state) => ({
      refetchCookies:
        typeof newState === "function" ? newState(state.refetchCookies) : newState,
    })),
}));

type ThemeState = {
    theme: "light" | "dark";
    toggleTheme: () => void;
    setTheme: (newTheme: "light" | "dark") => void;
  };
  
  export const useThemeStore = create<ThemeState>((set) => ({
    theme: "light", // Default theme
    toggleTheme: () =>
      set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    setTheme: (newTheme) => set({ theme: newTheme }),
  }));

  export type UserRole = "admin" | "staff" | "common";

export type UserRoleState = {
  role: UserRole;
  setRole: (newRole: UserRole) => void;
};

export const useUserRoleStore = create<UserRoleState>((set) => ({
  role: "common", // Default role
  setRole: (newRole) => set({ role: newRole }),
}));


type MenuState = {
  menus: Menu[];
  setMenus: (newMenus: Menu[]) => void;
  addMenu: (menu: Menu) => void;
  removeMenu: (path: string) => void;
  clearMenus: () => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  setMenus: (newMenus) => set({ menus: newMenus }),
  addMenu: (menu) =>
    set((state) => ({ menus: [...state.menus, menu] })),
  removeMenu: (path) =>
    set((state) => ({
      menus: state.menus.filter((m) => m.path !== path),
    })),
  clearMenus: () => set({ menus: [] }),
}));