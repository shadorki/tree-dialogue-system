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
    this.handleNodeMovement = this.handleNodeMovement.bind(this)
  }
  private handleNodeMovementStart(e: Event): void {
    const { nodeId } = e.target.dataset
    if(!nodeId) return
    const node = this.tree.getNodeById(Number(nodeId))
    this.currentMovingNode = node
    this.isMovingNode = true
    window.addEventListener('mousemove', this.handleNodeMovement)
  }
  private handleNodeMovement(e: MouseEvent): void {
    const [ width, height ] = this.currentMovingNode.dimensions
    const { clientX, clientY } = e
    this.currentMovingNode.position = [
      clientX - width / 2,
      clientY - height / 2
    ]
  }
  private handleNodeMovementEnd(e: Event): void {
    this.currentMovingNode = null
    this.isMovingNode = false
    window.removeEventListener('mousemove', this.handleNodeMovement)
  }
  private addEventListeners(): void {
    this.main.addEventListener('mousedown', this.handleNodeMovementStart.bind(this))
    window.addEventListener('mouseup', this.handleNodeMovementEnd.bind(this))
  }
  public start(): void {
    this.addEventListeners()
    const node = this.tree.init()
    this.main.appendChild(node)
  }
}
