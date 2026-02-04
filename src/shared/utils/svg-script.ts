import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { DOMParser, XMLSerializer } from "xmldom"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SVG_NS = "http://www.w3.org/2000/svg"

const svgPath = path.resolve(__dirname, "test-svg.svg")

const svgText = fs.readFileSync(svgPath, "utf8")

const doc = new DOMParser().parseFromString(svgText, "image/svg+xml")

const paths = Array.from(doc.getElementsByTagName("path"))

paths.forEach((pathEl, index) => {
	const parent = pathEl.parentNode
	if (!parent) return

	const g = doc.createElementNS(SVG_NS, "g")
	g.setAttribute("name", String(index + 1))

	parent.insertBefore(g, pathEl)
	g.appendChild(pathEl)
})

const updatedSvg = new XMLSerializer().serializeToString(doc)
fs.writeFileSync(svgPath, updatedSvg)

console.log("SVG успешно изменён ✅")
