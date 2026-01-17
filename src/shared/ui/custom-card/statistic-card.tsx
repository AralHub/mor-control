import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"
import { Card, Flex, Tag, theme, Typography } from "antd"
import type { ComponentType, FC } from "react"

const { Title } = Typography

export type StatisticCardType = {
	value: string
	title: string
	text: string
	color: string
	Icon: ComponentType<AntdIconProps>
}

export const StatisticCard: FC<StatisticCardType> = ({ text, title, value, color, Icon }) => {
	const {
		token: { colorTextLabel },
	} = theme.useToken()

	return (
		<Card>
			<Flex
				vertical={true}
				justify="center"
				align="center"
				gap={20}
			>
				<Flex
					style={{
						backgroundColor: color,
						width: 50,
						height: 50,
						borderRadius: "50%",
						marginTop: "-35px",
					}}
					justify="center"
				>
					<Icon style={{ fontSize: 20, color: "white" }} />
				</Flex>
				<Flex
					style={{ marginBottom: 20 }}
					vertical
					align="center"
				>
					<Title
						style={{ color: color }}
						level={2}
					>
						{value}
					</Title>
					<Title
						level={5}
						style={{ color: colorTextLabel }}
					>
						{title}
					</Title>
				</Flex>

				<Tag
					color={color}
					style={{ fontWeight: 500 }}
				>
					{text}
				</Tag>
			</Flex>
		</Card>
	)
}
