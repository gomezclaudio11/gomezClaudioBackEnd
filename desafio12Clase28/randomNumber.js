const numbers = {}

for (let i = 0; i < cant; i++) {
const randomNumber = Math.floor(Math.random() * 1000)

if (!numbers[randomNumber]) {
numbers[randomNumber] = 0
}

numbers[randomNumber]++
}

process.on ("exit", () => {
    console.log("cerrrado")
})

process.on ("message", msg => {
    process.send(numbers)
    process.exit()
})

