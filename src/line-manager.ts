import Line from "./line"

export default class LineManager {
  private lines: Line[]
  constructor() {
    this.lines = []

  }
  createLine(from: HTMLElement, to:HTMLElement): SVGSVGElement {
    const line = new Line(from, to)
    this.lines.push(line)
    return line.init()
  }
  update(): void {
    this.lines.forEach(l => l.update())
  }
}
