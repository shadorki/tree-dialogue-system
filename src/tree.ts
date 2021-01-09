import Collection from './collection'
import Node from './node'

export default class Tree {
  private nodeCounter: number
  private root: Node
  private collection: Collection
  constructor(collection: Collection) {
    this.collection = collection
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
  public appendNode(node: Node, appendingNodeId: number, answerId: string): void {
    let appendingNode = null
    if(this.collection.has(appendingNodeId)) {
      appendingNode = this.collection.get(appendingNodeId)
      this.collection.delete(appendingNodeId)
    } else {
      appendingNode = this.getNodeById(appendingNodeId)
    }
    node.append(answerId, appendingNode)
    console.log(this)
  }
  public init(): HTMLElement {
    const element = this.root.init()
    return element
  }
}
