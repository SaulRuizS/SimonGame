const startButton = document.getElementById('start-button')

const greenBtn = document.getElementById('green-button')
const redBtn = document.getElementById('red-button')
const yellowBtn = document.getElementById('yellow-button')
const blueBtn = document.getElementById('blue-button')

const levelDisplay = document.getElementById('level-display')
const level = document.getElementById('level')

const maxSequenceLevel = 5

function startGame() {
    window.NewGame = new Simon()
}

class Simon {
    constructor() {
        this.start()
        this.generateSequence()
        setTimeout(this.nextLevel, 500) //Using parenthesis executes the function at the moment
    }

    start() {
        startButton.remove()
        level.innerHTML = 1
        let gameStarted = false
        if (gameStarted === false) {
            levelDisplay.hidden = false
        }
        this.nextLevel = this.nextLevel.bind(this)
        this.colorChoosed = this.colorChoosed.bind(this)
        this.currentLevel = 1
        this.colorButtons = {
            greenBtn,
            redBtn,
            yellowBtn,
            blueBtn
        }
    }

    generateSequence() {
        this.sequence = new Array(maxSequenceLevel)
            .fill(0)
            .map(
                (colorBtn) => Math.floor(
                    Math.random() * 4
                )
            )
    }

    nextLevel() {
        this.colorSequenceIterator = 0
        this.lightSequence()
        this.addClickEvent()
    }

    numbersToColors(number) {
        switch (number) {
            case 0:
                return 'greenBtn'
            case 1:
                return 'redBtn'
            case 2:
                return 'yellowBtn'
            case 3:
                return 'blueBtn'
        }
    }

    colorToNumber(color) {
        switch (color) {
            case 'greenBtn':
                return 0
            case 'redBtn':
                return 1
            case 'yellowBtn':
                return 2
            case 'blueBtn':
                return 3
        }
    }

    lightSequence() {
        for (let i = 0; i < this.currentLevel; i++) {
            let color = this.numbersToColors(this.sequence[i])
            setTimeout(
                () => this.lightColor(color), 1000 * i
            )
        }
    }

    lightColor(color) {
        this.colorButtons[color].classList.add('light')
        setTimeout(
            () => this.turnOffColor(color), 400
        )
    }

    turnOffColor(color) {
        this.colorButtons[color].classList.remove('light')
    }

    addClickEvent() {
        this.colorButtons.greenBtn.addEventListener('click', this.colorChoosed)
        this.colorButtons.redBtn.addEventListener('click', this.colorChoosed)
        this.colorButtons.yellowBtn.addEventListener('click', this.colorChoosed)
        this.colorButtons.blueBtn.addEventListener('click', this.colorChoosed)
    }

    removeClickEvent() {
        this.colorButtons.greenBtn.removeEventListener('click', this.colorChoosed)
        this.colorButtons.redBtn.removeEventListener('click', this.colorChoosed)
        this.colorButtons.yellowBtn.removeEventListener('click', this.colorChoosed)
        this.colorButtons.blueBtn.removeEventListener('click', this.colorChoosed)
    }

    levelEvaluation(colorNumber) {
        if (colorNumber === this.sequence[this.colorSequenceIterator]) {
            this.colorSequenceIterator++
            if (this.colorSequenceIterator === this.currentLevel) {
                this.currentLevel++
                this.removeClickEvent()
                this.colorSequenceIterator = 0
                if (this.currentLevel === maxSequenceLevel + 1) {
                    levelDisplay.innerHTML = 'Congratulations. You won!'
                    setTimeout(
                        () => location.reload(), 2000
                    )
                } else {
                    setTimeout(
                        () => {
                            level.innerHTML = this.currentLevel
                            this.nextLevel()
                        }, 1000)
                }
            }
        } else {
            levelDisplay.innerHTML = 'Wrong selection. Start again.'
            setTimeout(
                () => location.reload(), 1500
            )
        }
    }

    colorChoosed(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.colorToNumber(colorName)
        this.lightColor(colorName)
        this.levelEvaluation(colorNumber)
    }
}