import Tree from "./tree"

export default class App {
  private main: HTMLElement
  private tree: Tree
  constructor() {
    this.main = document.querySelector('main')
    this.tree = new Tree()
  }
  public start(): void {
    const node = this.tree.init()
    this.main.appendChild(node)
  }
}
