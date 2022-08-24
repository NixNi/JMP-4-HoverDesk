const board = document.querySelector("#board")
const {height, width} = document.body.getBoundingClientRect()
const colors1 = ['#005c9d', '#018abd', '#02b9f3', '#93e1ed', '#e2f3fb']
const colors2 = ['#FEF4C0', '#FDB10B', '#FE8535', '#FD292F', '#B20000']
const colors3 = ['#00003f', '#01008e', '#9001f5', '#fe00ea', '#ff0178']
const inRow = Math.floor(width / 20)
const inColumn = Math.floor(height / 20)
const SQUARE_NUMBER = inColumn * inRow
//console.log(height, width)

board.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('square'))
        setColor(event.target, colors1)
})

board.addEventListener('mouseout', (event) => {
    if (event.target.classList.contains('square'))
        removeColor(event.target)
})

board.addEventListener('click', (event)=> {
    if (event.target.classList.contains('square'))
        attack(event.target.sqidx, event.target.sqidy)
        //console.log(event.target.sqidx, event.target.sqidy)
        //setColor(event.target)
})

for (let i = 0; i < SQUARE_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.sqidx = i % (inRow); ;
    square.sqidy = Math.floor(i / (inRow))
    //square.classList.add('square')
    // square.addEventListener('mouseover', ()=> {
    //     setColor(square)
    // })
    // square.addEventListener('mouseleave', () => {
    //     removeColor(square)
    // })
    //square.addEventListener('mouseout')
    board.append(square)
}



function setColor(element, colors) {
    const color = getRandomColor(colors)
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor(colors) {
    const index = Math.floor(Math.random()* colors.length) 
    return colors[index]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


createCore()
let el;

function attack(x, y) {
    for (let i = x - 3; i <= x + 3; i++)
    {
        for (let j = y - 3 + (((i - x) > 0) ? (i - x) : (x - i)); j <= y + 3 - (((x - i) > 0) ? (x - i) : (i - x)); j++) {
            try {
                el = board.children[j * inRow + i]
                setColor(el, colors2)
                setTimeout(removeColor, 900, el)
            } catch (e) {
                
            }                    
        }
    }
    
}

function createCore() {
    const a = Math.floor(inRow / 2)
    //const b = Math.floor(inRow / 10)
    const c = Math.floor(inColumn / 2)
    const d = Math.min(Math.floor(inColumn / 10), Math.floor(inRow / 10))
    //console.log(a,b,c,d)
    for (let i = a - d; i <= a + d; i++)
        for (let j = c - d; j <= c + d; j++){
            if ((((i - a) ** 2) + ((j - c) ** 2)) <= (d ** 2) + (d-1) / 3.14) {
                const el = board.children[j * inRow + i]
                setInterval(setColor, 1000, el, colors1)
            }
        }
}


// function createEnemy() {
//     console.log('work')
//     let razm = getRandomNumber(2, Math.min(Math.floor(inColumn / 20), Math.floor(inRow / 20)))
//     let a = getRandomNumber(razm+1, inRow - razm)
//     let b = getRandomNumber(razm+1, inColumn - razm)
//     for (let i = a - razm; i <= a + razm; i++)
//         for (let j = b - razm; j <= b + razm; j++) {
//                 const el = board.children[j * inRow + i]
//                 setInterval(setColor, 1000, el, colors3)
//         }
// }



// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()
// createEnemy()

