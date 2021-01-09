import Node from './node'

export default class Collection {
  private storage: {
    [key: number]: Node
  }
  constructor() {
    this.storage = {}
  }
  get(nodeId: number): Node {
    if(!this.has(nodeId)) return null
    return this.storage[nodeId]
  }
  add(node: Node): void {
    this.storage[node.nodeId] = node
  }
  has(nodeId: number): boolean {
    return nodeId in this.storage
  }
  delete(nodeId: number): boolean {
    return delete this.storage[nodeId]
  }
}
