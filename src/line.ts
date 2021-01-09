export default class Line {
  from: HTMLElement
  to: HTMLElement
  domElement: SVGSVGElement
  constructor(from: HTMLElement, to: HTMLElement) {
    this.from = from
    this.to = to
    this.domElement = null
  }
  init(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const line = document.createElementNS('http://www.w3.org/2000/svg','line')
    line.setAttribute('stroke', 'red')
    svg.appendChild(line)
    this.domElement = svg
    this.update()
    return svg
  }
  update(): void {
    const [fromLeft, fromTop] = this.getComputedPosition(this.from)
    const [toLeft, toTop] = this.getComputedPosition(this.to)
    const attrs = {
      x1: fromLeft + (this.from.clientWidth / 2),
      y1: fromTop + (this.from.clientHeight / 2),
      x2: toLeft + (this.to.clientWidth / 2),
      y2: toTop + (this.to.clientHeight / 2)
    }
    console.log(attrs)
    for (const attribute in attrs) {
      this.domElement.firstElementChild.setAttribute(attribute, attrs[attribute])
    }
  }
  getComputedPosition(element: HTMLElement): number[] {
    const { left, top } = element.style
    const newLeft = Number(left.substring(0, left.length - 2))
    const newTop = Number(top.substring(0, top.length - 2))
    return [newLeft, newTop]
  }
}
