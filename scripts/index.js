class Setup {
  constructor() {
    this.container = document.getElementById("timers-setup")
    this.input = document.getElementById("timer-input")
    this.addBtn = document.getElementById("add-timer")

    this.error = document.getElementById("error")

    this.setupEventListeners()
  }

  addTimer() {
    let time = this.input.value
    if (time && time > 0) {
      const timer = new Timer(time)
      timer.startTimer()
      this.error.classList.add("visually-hidden")
      this.input.value = ""
    } else {
      this.error.classList.remove("visually-hidden")
      this.error.textContent = "Ошибка ввода. Введите время в секундах"
    }
  }

  setupEventListeners() {
    this.addBtn.addEventListener("click", () => this.addTimer())
  }
}

class Timer {
  constructor(seconds) {
    this.template = document.querySelector("#timer").content
    this.container = document.getElementById("timers")

    this.element = this.template.querySelector(".timer").cloneNode(true)

    this.deleteTimerBtn = this.element.querySelector(".delete-button")
    this.stopTimerBtn = this.element.querySelector(".stop-button")

    this.timeContainer = this.element.querySelector(".time")

    this.hoursContent = this.element.querySelector(".hours")
    this.minutesContent = this.element.querySelector(".minutes")
    this.secondsContent = this.element.querySelector(".seconds")

    this._time = seconds
    this.intervalId = null

    this.render()
    this.setupEventListeners()

    this._active = true
  }

  setupEventListeners() {
    this.deleteTimerBtn.addEventListener("click", () => this.deleteTimer())
    this.stopTimerBtn.addEventListener("click", () => this.stopTimer())
  }

  _setInactive() {
    this.stopTimerBtn.classList.add("inactive")
    this.timeContainer.classList.add("inactive")
    this._active = false
  }

  _setActive() {
    this.timeContainer.classList.remove("inactive")
    this.stopTimerBtn.classList.remove("inactive")
    this._active = true
  }

  startTimer() {
    this.intervalId = setInterval(() => this._updateTimer(), 1000)
    this._setActive()
  }

  deleteTimer() {
    clearInterval(this.intervalId)
    this.container.removeChild(this.element)
  }

  stopTimer() {
    if (this._active) {
      clearInterval(this.intervalId)
      this._setInactive()
    } else {
      this.startTimer()
    }
  }

  _updateTimer() {
    if (this._time > 0) {
      this._time--
      this._updateElement()
    } else {
      this.deleteTimer()
    }
  }

  _updateElement() {
    let hours = Math.floor(this._time / 3600)
    let minutes = Math.floor((this._time % 3600) / 60)
    let seconds = this._time % 60

    this.hoursContent.textContent = hours.toString().padStart(2, "0")
    this.minutesContent.textContent = minutes.toString().padStart(2, "0")
    this.secondsContent.textContent = seconds.toString().padStart(2, "0")
  }

  render() {
    this._updateElement()
    this.container.append(this.element)
  }
}

const setup = new Setup()

console.log("made by github.com/akseee")
