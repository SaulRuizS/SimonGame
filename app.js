const startButton = document.getElementById('start-button')

const greenBtn = document.getElementById('green-button')
const redBtn = document.getElementById('red-button')
const yellowBtn = document.getElementById('yellow-button')
const blueBtn = document.getElementById('blue-button')

const levelDisplay = document.getElementById('level-display')
const level = document.getElementById('level')

function startGame() {
    window.NewGame = new Simon()
}

class Simon {
    constructor() {
        this.start()
        this.generateSequence()
        this.nextLevel()
        this.colorsClickRegister()
    }

    start() {
        startButton.remove()
        level.innerHTML = 1
        let gameStarted = false
        if (gameStarted === false) {
            levelDisplay.hidden = false
        }
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
        let maxSequenceLevel = 10
        this.sequence = new Array(maxSequenceLevel)
            .fill(0)
            .map(
                (colorBtn) => Math.floor(
                    Math.random() * 4
                )
            )
    }

    nextLevel() {
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

    colorChoosed(ev) {
        if (
            this.colorButtons.greenBtn
        ) {
            this.colorsClickRegister()
        }
        //console.log(ev)
    }

    colorsClickRegister(colorInput) {
        this.colorsClicksSequence = []
        this.colorsClicksCheck()
    }

    colorsClicksCheck() {

    }

}

        // for (let btn = 0; btn < 4; btn++) {
        //     if (this.sequence[btn] === 0) {
        //         greenBtn.classList.add('light')
        //     }
        //     else if (this.sequence[btn] === 1) {
        //         redBtn.classList.add('light')
        //     }
        //     else if (this.sequence[btn] === 2) {
        //         yellowBtn.classList.add('light')
        //     }
        //     else if (this.sequence[btn] === 3) {
        //         blueBtn.classList.add('light')
        //     }
        //     //debugger
        //     setTimeout(
        //         () => {
        //             greenBtn.classList.remove('light-green')
        //             redBtn.classList.remove('light-red')
        //             yellowBtn.classList.remove('light-yellow')
        //             blueBtn.classList.remove('light-blue')
        //         }, 1000
        //     )
        // }