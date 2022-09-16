let TOO_COLD = 0
let TOO_HOT = 1
let IN_RANGE = 2

let state:number = IN_RANGE
let temperature: number = 0

let strip = neopixel.create(DigitalPin.P4, 4, NeoPixelMode.RGB)

function updateSystem(){
    
}

function evaluateState(state:number){
   
}
function reactToState(state:number){
    
}
basic.forever(function() {
    //updateSystem()
    //state = evaluateState(state)
    reactToState(state)
})

