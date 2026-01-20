import { Card, theme } from "antd"
import { css, cx } from "antd-style"
import { useMemo, type FC } from "react"
import { streetData } from "src/shared/data"
import { grayColor, greenColor, redColor, yellowColor } from ".."

const redItems = Array.from({ length: 13 }).map(() =>
	Math.floor(Math.random() * (streetData.length - 1))
)
const grayItems = Array.from({ length: 7 }).map(() =>
	Math.floor(Math.random() * (streetData.length - 1))
)
const yellowItems = Array.from({ length: 20 }).map(() =>
	Math.floor(Math.random() * (streetData.length - 1))
)

export type MapProps = {
	isGreen: boolean
	isRed: boolean
	isGray: boolean
	isYellow: boolean
	setSelected: (value: number | null) => void
}

export const Map: FC<MapProps> = ({ isGray, isGreen, isRed, isYellow, setSelected }) => {
	const { token } = theme.useToken()

	const streetStatusData = useMemo(() => {
		return streetData.map((el, index) => ({
			...el,
			fill: redItems.includes(index)
				? redColor
				: grayItems.includes(index)
					? grayColor
					: yellowItems.includes(index)
						? yellowColor
						: greenColor,
			status: redItems.includes(index)
				? ("red" as const)
				: grayItems.includes(index)
					? ("gray" as const)
					: yellowItems.includes(index)
						? ("yellow" as const)
						: ("green" as const),
		}))
	}, [token.green, token.red, token.yellow])

	const filteredStreetData = useMemo(() => {
		if (isGreen && isRed && isGray && isYellow) return streetStatusData

		return streetStatusData
			?.filter((el) => {
				if (!isGreen) return el?.status !== "green"
				return el
			})
			?.filter((el) => {
				if (!isRed) return el?.status !== "red"
				return el
			})
			?.filter((el) => {
				if (!isGray) return el?.status !== "gray"
				return el
			})
			?.filter((el) => {
				if (!isYellow) return el?.status !== "yellow"
				return el
			})
	}, [isGray, isGreen, isRed, isYellow, streetStatusData])

	return (
		<Card
			variant={"outlined"}
			style={{
				width: "70%",
				overflow: "hidden",
				position: "relative",
				boxShadow: "none",
				padding: 5,
				borderColor: token.colorPrimary,
			}}
			styles={{
				body: {
					padding: 0,
				},
			}}
		>
			<svg
				width={"100%"}
				height={"auto"}
				viewBox={"0 0 2518 1800"}
				fill={"none"}
				xmlns={"http://www.w3.org/2000/svg"}
				style={{
					backgroundColor: "transparent",
					backgroundImage: "url(/assets/map/street-2.png)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				{filteredStreetData.map((el, index) => (
					<path
						key={index}
						{...el}
						onClick={() => setSelected(index)}
						className={cx(css`
							cursor: pointer;

							&:hover {
								filter: brightness(1.2);
							}

							&:active {
								filter: brightness(0.9);
							}
						`)}
					/>
				))}
			</svg>
		</Card>
	)
}
