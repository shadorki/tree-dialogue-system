import Tree from "./tree"
import Node from "./node"

export default class App {
  private header: HTMLElement
  private main: HTMLElement
  private tree: Tree
  private collection: {
    [key: number]: Node
  }
  private currentMovingNode: Node
  private currentDraggingNode: Node
  constructor() {
    this.header = document.querySelector('header')
    this.main = document.querySelector('main')
    this.tree = new Tree()
    this.collection = {}
    this.currentMovingNode = null
    this.currentDraggingNode = null
    this.handleNodeMovement = this.handleNodeMovement.bind(this)
  }
  private handleAnswerDragStart(e: DragEvent): void {
    const target = e.target as HTMLElement
    const { identifier } = target.dataset
    if(identifier !== 'answer') return
    const { nodeId } = target.parentElement.dataset
    this.currentDraggingNode = nodeId in this.collection
                              ? this.collection[nodeId]
                              : this.tree.getNodeById(Number(nodeId))
    e.dataTransfer.effectAllowed = 'uninitialized'
  }
  private handleAnswerDragEnter(e: DragEvent): void {
    const target = e.target as HTMLElement
    const { identifier } = target.dataset
    if(identifier  !== 'question') return
    let nodeElement = this.sortEventElement(target)
    if(!nodeElement) return
    if(Number(nodeElement.dataset.nodeId) === this.currentDraggingNode.nodeId) return
    target.classList.add('dropping')
    e.dataTransfer.dropEffect = 'copy'
    e.preventDefault()
  }
  private handleAnswerDragLeave(e: DragEvent): void {
    const target = e.target as HTMLElement
    const { identifier } = target.dataset
    console.log(identifier)
    if (identifier) target.classList.remove('dropping')
  }
  private handleNavAction(e: Event): void {
    const { action } = e.target.dataset
    if(!action) return
    const actions = {
      newNode: () => {
        const node = this.tree.createNode()
        this.collection[node.nodeId] = node
        this.main.appendChild(node.init())
      },
      save: () => {},
      load: () => {}
    }
    actions[action]()
  }
  private handleNodeMovementStart(e: MouseEvent): void {
    if (e.button !== 1) return
    const target = e.target as HTMLElement
    let nodeElement = this.sortEventElement(target)
    if(!nodeElement) return
    const { nodeId } = nodeElement.dataset
    const node = nodeId in this.collection
    ? this.collection[nodeId]
    : this.tree.getNodeById(Number(nodeId))
    this.currentMovingNode = node
    window.addEventListener('mousemove', this.handleNodeMovement)
  }
  private handleNodeMovement(e: MouseEvent): void {
    const [ width, height ] = this.currentMovingNode.dimensions
    const { pageX, pageY } = e
    this.currentMovingNode.position = [
      pageX - width / 2,
      pageY - height / 2
    ]
  }
  private handleNodeMovementEnd(e: Event): void {
    this.currentMovingNode = null
    window.removeEventListener('mousemove', this.handleNodeMovement)
  }
  private addEventListeners(): void {
    this.main.addEventListener('mousedown', this.handleNodeMovementStart.bind(this))
    this.main.addEventListener('dragstart', this.handleAnswerDragStart.bind(this))
    this.main.addEventListener('dragenter', this.handleAnswerDragEnter.bind(this))
    this.main.addEventListener('dragleave', this.handleAnswerDragLeave.bind(this))
    this.header.addEventListener('click', this.handleNavAction.bind(this))
    window.addEventListener('mouseup', this.handleNodeMovementEnd.bind(this))
  }
  private sortEventElement(target: HTMLElement): HTMLElement {
    const { identifier } = target.dataset
    switch (identifier) {
      case 'question':
        return target.parentElement
        break
      case 'answer':
        return target.parentElement
        break
      case 'node':
        return target
        break
      default:
        return null
    }
  }
  public start(): void {
    this.addEventListeners()
    const node = this.tree.init()
    this.main.appendChild(node)
  }
}
