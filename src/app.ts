import Tree from "./tree"
import Node from "./node"

export default class App {
  private main: HTMLElement
  private tree: Tree
  private isMovingNode: boolean
  private currentMovingNode: Node
  constructor() {
    this.main = document.querySelector('main')
    this.tree = new Tree()
    this.isMovingNode = false
    this.currentMovingNode = null
  }
  private handleNodeMovement(e: Event): void {
    const { nodeId } = e.target.dataset
    if(!nodeId) return
    const node = this.tree.getNodeById(Number(nodeId))
    console.log('moooove')
    console.log(node)
  }
  private addEventListeners(): void {
    this.main.addEventListener('mousedown', this.handleNodeMovement.bind(this))
  }
  public start(): void {
    this.addEventListeners()
    const node = this.tree.init()
    this.main.appendChild(node)
  }
}
