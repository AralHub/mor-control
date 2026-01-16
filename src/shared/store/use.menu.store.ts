import { create } from "zustand"

interface MenuStore {
	isCollapsed: boolean
	toggleCollapsed: () => void
}

const useMenuStore = create<MenuStore>()((set) => ({
	isCollapsed: false,
	toggleCollapsed: () => set((prev) => ({ isCollapsed: !prev.isCollapsed })),
}))

export { useMenuStore }
