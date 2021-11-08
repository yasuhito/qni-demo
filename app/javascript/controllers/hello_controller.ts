import { CircuitStepElement, QuantumCircuitElement } from "qni"
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["circuit", "log"]

  declare circuitTarget: QuantumCircuitElement
  declare logTarget: HTMLTextAreaElement

  connect() {
    this.circuitTarget
        .write("0", 0, 1)
        .h(0)
        .cnot(0, 1)
  }

  printEvent(event: Event): void {
    const customEvent = event as CustomEvent

    switch(event.type) {
      case "dragAndDroppable.load": {
        const dragAndDroppable = customEvent.detail.element as HTMLElement
        this.appendLog(event, `${dragAndDroppable.tagName}`)
        break
      }
      case "dragAndDroppable.mouseenter": {
        const dragAndDroppable = customEvent.detail.element as HTMLElement
        this.appendLog(event, `${dragAndDroppable.tagName}`)
        break
      }
      case "dragAndDroppable.grab": {
        const dragAndDroppable = customEvent.detail.element as HTMLElement
        this.appendLog(event, `${dragAndDroppable.tagName}`)
        break
      }
      case "dragAndDroppable.snapToNewDropzone": {
        const detail = customEvent.detail
        const dragAndDroppable = detail.element as HTMLElement
        const stepIndex = detail.stepIndex as number
        const wireIndex = detail.wireIndex as number
        this.appendLog(event, `${dragAndDroppable.tagName} (stepIndex = ${stepIndex}, wireIndex = ${wireIndex})`)
        break
      }
      case "dragAndDroppable.ungrab": {
        const detail = customEvent.detail
        const dragAndDroppable = detail.element as HTMLElement
        const x = detail.x as number
        const y = detail.y as number
        this.appendLog(event, `${dragAndDroppable.tagName} (x = ${x}, y = ${y})`)
        break
      }
      case "dragAndDroppable.enddragging": {
        const detail = customEvent.detail
        const x = detail.x as number
        const y = detail.y as number
        this.appendLog(event, `x = ${x}, y = ${y}`)
        break
      }
      case "dragAndDroppable.trash": {
        const dragAndDroppable = customEvent.detail.element as HTMLElement
        this.appendLog(event, `${dragAndDroppable.tagName}`)
        break
      }
      case "step.drop": {
        const step = customEvent.detail.element as CircuitStepElement
        this.appendLog(event, `index = ${step.index}`)
        break
      }
    }
  }

  private appendLog(event: Event, logString: string): void {
    this.logTarget.value += `${event.type}: ${logString}\n`
    this.logTarget.scrollTop = this.logTarget.scrollHeight
  }
}
