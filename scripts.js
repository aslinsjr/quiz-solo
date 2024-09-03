const appContainer = document.querySelector(".app")
const startBtn = document.querySelector("#start-btn")

const modalBg = document.querySelector(".modal-bg")
const respostaSpan = document.querySelector("#resposta")

const nextBtn = document.querySelector("#next-btn")

let randomArray = []

let score = 0

async function getData() {
    const response = fetch("https://strengthened-treasure-houseboat.glitch.me/perguntas")
    try {

        const promisse = await response

        const data = await promisse.json()

        let questionsArray = data.perguntas

        getRandom(questionsArray)

    } catch (error) {
        console.log(error)
    }
}

function getRandom(array) {
    return randomArray = array.sort(function (a, b) {
        a = Math.floor(Math.random() * 10)
        b = Math.floor(Math.random() * 10)

        if (a > b) {
            return 1
        }

        if (b > a) {
            return -1
        }

        if (a === b) {
            return 0
        }

    })
}

function showingQuestion(randomicArray, index) {
    appContainer.innerHTML = `
                <header class="flex-center">
                    <span>${randomicArray.indexOf(randomicArray[index]) + 1}°</span>
                    <h2>Pergunta</h2>
                </header>
                <h3>${randomicArray[index].pergunta}</h3>
                <div class="button-grid">
                    <button class="alt-btn">a. ${randomicArray[index].a}</button>
                    <button class="alt-btn">b. ${randomicArray[index].b}</button>
                    <button class="alt-btn">c. ${randomicArray[index].c}</button>
                    <button class="alt-btn">d. ${randomicArray[index].d}</button>
                    <button class="alt-btn">e. ${randomicArray[index].e}</button>
                </div>
            `
}

function getAnswer(randomArray, index) {

    const altBtn = document.querySelectorAll(".alt-btn")

    altBtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()

            if (e.target.innerHTML[0] === randomArray[index].resposta) {
                respostaSpan.innerHTML = "acertou"

                score = score + 1

            }else {
                respostaSpan.innerHTML = "errou"
            }

            modalBg.classList.remove("hide")

            nextBtn.addEventListener("click", () => {

                modalBg.classList.add("hide")

                index = index + 1

                if(index == 10) {
                    appContainer.innerHTML = `
                    <h2>Você acertou ${score} questões</h2>
                    <button id="reload-btn">Voltar</button>
                    `
                    const reloadBtn = document.querySelector("#reload-btn")
                    
                    reloadBtn.addEventListener("click", () => {
                        window.location.reload()
                    })

                }else {
                    showingQuestion(randomArray, index)

                    getAnswer(randomArray, index)
                }
            })
        })
    })
}

function app() {
    getData()

    let index = 0

    startBtn.addEventListener("click", () => {

        showingQuestion(randomArray, index)

        getAnswer(randomArray, index)
    })

}


app()






