import Tree from "./tree"
import Node from "./node"
import LineManager from "./line-manager"
import Collection from "./collection"

export default class App {
  private header: HTMLElement
  private main: HTMLElement
  private tree: Tree
  private collection: Collection
  private lineManager: LineManager
  private currentMovingNode: Node
  private currentDraggingNode: Node
  constructor() {
    this.header = document.querySelector('header')
    this.main = document.querySelector('main')
    this.collection = new Collection()
    this.tree = new Tree(this.collection)
    this.lineManager = new LineManager()
    this.currentMovingNode = null
    this.currentDraggingNode = null
    this.handleNodeMovement = this.handleNodeMovement.bind(this)
  }
  private handleAnswerDrop(e: DragEvent): void {
    const target = e.target as HTMLElement
    const { identifier } = target.dataset
    if (identifier !== 'question') return
    let nodeElement = this.sortEventElement(target)
    if (!nodeElement) return
    if (Number(nodeElement.dataset.nodeId) === this.currentDraggingNode.nodeId) return
    e.preventDefault()
    const answerId = e.dataTransfer.getData('text')
    const { nodeId } = nodeElement.dataset
    nodeElement.classList.remove('dropping')
    nodeElement.style.border = '2px solid red'
    const line = this.lineManager.createLine(
      document.querySelector(`[data-node-id="${this.currentDraggingNode.nodeId}"]`),
      nodeElement
    )
    document.body.appendChild(line)
    this.tree.appendNode(
      this.currentDraggingNode,
      nodeId,
      answerId
    )
  }
  private handleAnswerDragStart(e: DragEvent): void {
    const target = e.target as HTMLElement
    const { identifier, answerId } = target.dataset
    if(identifier !== 'answer') return
    const { nodeId } = target.parentElement.dataset
    this.currentDraggingNode = this.collection.has(nodeId)
                              ? this.collection.get(nodeId)
                              : this.tree.getNodeById(Number(nodeId))
    e.dataTransfer.effectAllowed = 'uninitialized'
    e.dataTransfer.setData('text/plain', answerId)
  }
  private handleAnswerDragOver(e: DragEvent): void {
    e.preventDefault()
    const target = e.target as HTMLElement
    const { identifier } = target.dataset
    if(identifier  !== 'question') return
    let nodeElement = this.sortEventElement(target)
    if(!nodeElement) return
    if(Number(nodeElement.dataset.nodeId) === this.currentDraggingNode.nodeId) return
    nodeElement.classList.add('dropping')
    e.dataTransfer.dropEffect = 'copy'
  }
  private handleAnswerDragLeave(e: DragEvent): void {
    const target = e.target as HTMLElement
    const { identifier } = target.dataset
    if (identifier) target.classList.remove('dropping')
  }
  private handleNavAction(e: Event): void {
    const { action } = e.target.dataset
    if(!action) return
    const actions = {
      newNode: () => {
        const node = this.tree.createNode()
        this.collection.add(node)
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
    const node = this.collection.has(nodeId)
    ? this.collection.get(nodeId)
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
    this.lineManager.update()
  }
  private handleNodeMovementEnd(e: Event): void {
    this.currentMovingNode = null
    window.removeEventListener('mousemove', this.handleNodeMovement)
  }
  private addEventListeners(): void {
    this.main.addEventListener('mousedown', this.handleNodeMovementStart.bind(this))
    this.main.addEventListener('dragstart', this.handleAnswerDragStart.bind(this))
    this.main.addEventListener('dragover', this.handleAnswerDragOver.bind(this))
    this.main.addEventListener('dragleave', this.handleAnswerDragLeave.bind(this))
    this.main.addEventListener('drop', this.handleAnswerDrop.bind(this))
    this.header.addEventListener('click', this.handleNavAction.bind(this))
    window.addEventListener('mouseup', this.handleNodeMovementEnd.bind(this))
    window.addEventListener('scroll', this.lineManager.update.bind(this.lineManager))
  }
  private sortEventElement(target: HTMLElement): HTMLElement {
    const { identifier } = target.dataset
    switch (identifier) {
      case 'question':
        return target.parentElement
      case 'answer':
        return target.parentElement
      case 'node':
        return target
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
