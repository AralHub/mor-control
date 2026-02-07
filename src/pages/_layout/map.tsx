import { createFileRoute } from "@tanstack/react-router"
import { init, registerMap, use } from "echarts/core"
import { MapChart } from "echarts/charts"
import { GeoComponent } from "echarts/components"
import { SVGRenderer } from "echarts/renderers"
import { useEffect, useRef, useState } from "react"
import { QRSvg } from "src/shared/assets"
import { Button, Card, Col, Row, Typography } from "antd"
import { PageHeader } from "src/widgets/shared"
import { SyncOutlined } from "@ant-design/icons"
import type { RegionOption } from "echarts/types/src/coord/geo/GeoModel.js"

use([MapChart, GeoComponent, SVGRenderer])

registerMap("qaraqalpaqstan-respublika", {
	svg: QRSvg,
})

export const Route = createFileRoute("/_layout/map")({
	component: RouteComponent,
})

const { Text } = Typography

const regions: RegionOption[] = Array.from({ length: 17 }).map((_, index) => ({
	name: `${index + 1}`,
	itemStyle: {
		areaColor: "green",
		color: "green",
	},
	select: {
		itemStyle: {
			color: "yellow",
		},
	},
}))

function RouteComponent() {
	const ref = useRef<HTMLDivElement>(null)
	const [regionsMap] = useState<RegionOption[]>(regions)

	useEffect(() => {
		if (!ref.current) return

		const chart = init(ref.current, undefined, {
			renderer: "svg",
		})

		const option: any = {
			geo: {
				map: "qaraqalpaqstan-respublika",
				roam: false,
				layoutCenter: ["50%", "50%"],
				layoutSize: "95%",
				regions: regionsMap,
			},
		}

		chart.setOption(option)

		return () => chart.dispose()
	}, [])

	return (
		<>
			<PageHeader
				title={"Карта"}
				breadcrumb={[
					{
						key: "/map",
						title: "Карта",
					},
				]}
				extra={[
					<Button
						type={"primary"}
						key={"sync"}
						icon={<SyncOutlined />}
						children={"Sync"}
					/>,
				]}
			/>
			<Card>
				<Row gutter={[20, 20]}>
					<Col
						span={16}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<div
							ref={ref}
							style={{ width: 450, height: 450 }}
						/>
					</Col>
					<Col
						span={8}
						style={{ padding: 20 }}
					>
						<Row gutter={[20, 20]}>
							{regionsMap?.map((item) => (
								<Col
									span={12}
									key={item.name}
									style={{ cursor: "pointer" }}
								>
									<Text>{item.name}. gorodki</Text>
								</Col>
							))}
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	)
}
