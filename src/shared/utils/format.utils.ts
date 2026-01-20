import dayjs, { type Dayjs } from "dayjs"

export const formatNumber = <T>(value: T, defaultValue: number = 0) => {
	if (isNaN(Number(value))) return defaultValue
	return Number(value) || defaultValue
}

export const formatEmpty = <T>(value: T) => value ?? "-"

export const formatPrice = (price?: number | string): string => {
	if (price === undefined && isNaN(Number(price))) {
		return "0"
	}
	return Intl.NumberFormat("en-EN", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(Number(price))
}

export const formatPriceWithDigits = (price?: number | string, fractionDigits = 0): string => {
	return Intl.NumberFormat("en-EN", {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	}).format(formatNumber(price))
}

export const formatPriceWithCurrency = (price?: number | string): string => {
	if (price === undefined && isNaN(Number(price))) {
		return "0"
	}
	return (
		Intl.NumberFormat("en-EN", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(Number(price)) + " UZS"
	)
}

export const formatPhone = (value?: string | null) => {
	if (!value) return "-"
	return value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5")
}

export const formatFormPhone = (phone?: string) => {
	if (!phone) return ""
	if (phone.startsWith("+")) return phone.replace(/ /g, "").slice(1)
	return phone.replace(/ /g, "")
}

export const formatInputPrice = <T>(value?: T) =>
	`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const formatInputPhone = <T>(value?: T) =>
	`${value}`.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")

export const formatDate = (value?: string | Dayjs) =>
	dayjs(value).format("YYYY-MM-DD")

export const formatTime = (value?: string | Dayjs) =>
	value ? dayjs(value).format("HH:mm:ss") : "-"

export const formatDateTime = (value?: string | Dayjs) =>
	value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "-"

export const formatCustomDate = (
	value?: string | Dayjs,
	format: string = "YYYY-MM-DD"
) => dayjs(value).format(format)
