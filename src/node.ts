export default class Node {
  private domElement: HTMLElement
  private nodeId: number
  private children: {
    [key: string]: Node
  }
  private _question: HTMLElement
  private _position: {
    x: number
    y: number
  }
  constructor(nodeId: number) {
    this.domElement = null
    this.nodeId = nodeId
    this.children = {
      'Answer 1': null,
      'Answer 2': null,
      'Answer 3': null,
      'Answer 4': null
    }
    this._question = null
    this._position = null
  }
  get position(): number[] {
    const { x, y } = this._position
    return [x, y]
  }
  set position([x, y]: number[]) {
    const newPosition = {
      x,
      y
    }
    this.domElement.style.top = `${y}px`
    this.domElement.style.left = `${x}px`
    this._position = newPosition
  }
  private createElement(): HTMLElement {
    const nodeElement = document.createElement('div')
    nodeElement.className = 'node'
    nodeElement.dataset.nodeId = this.nodeId.toString()
    this._question = document.createElement('p')
    this._question.textContent = 'What is your Question?'
    const answers =
    Object
    .keys(this.children)
    .map(answer => {
      const a = document.createElement('p')
      a.textContent = answer
      a.className = 'answer'
      return a
    })
    nodeElement.append(
      this._question,
      ...answers
    )
    return nodeElement
  }
  public init(): HTMLElement {
    this.domElement = this.createElement()
    return this.domElement
  }
}
