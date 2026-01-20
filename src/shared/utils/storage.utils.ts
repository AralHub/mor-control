import Cookies from "js-cookie"

export const tokenStorage = {
	get: () => Cookies.get("token") || null,
	set: (token: string, remember?: boolean) => {
		Cookies.set("token", token, {
			expires: remember ? 30 : 14,
		})
	},
	clear: () => {
		Cookies.remove("token")
	},
}