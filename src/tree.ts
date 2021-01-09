import Node from './node'

export default class Tree {
  private nodeCounter: number
  private root: Node

  constructor() {
    this.nodeCounter = 1
    this.root = new Node(this.nodeCounter)
  }
  public getNodeById(nodeId: number): Node {
    return this.root.find(nodeId)
  }
  public createNode(): Node {
    const node = new Node(++this.nodeCounter)
    return node
  }
  public init(): HTMLElement {
    const element = this.root.init()
    return element
  }
}
