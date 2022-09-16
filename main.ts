// Code by student: Dan

let TOO_COLD = 0
let TOO_HOT = 1
let IN_RANGE = 2

let state: number = IN_RANGE
let temperature: number = 0

let strip = neopixel.create(DigitalPin.P4, 4, NeoPixelMode.RGB)

function show_red() {
    strip.showColor(neopixel.rgb(255, 0, 0))
    strip.show()
}

function show_green() {
    strip.showColor(neopixel.rgb(0, 255, 0))
    strip.show()
}

function show_blue() {
    strip.showColor(neopixel.rgb(0, 0, 255))
    strip.show()
}

function readTemperature() {
    let analogValue = pins.analogReadPin(AnalogPin.P0)
    return Math.map(analogValue, 0, 1023, -10, 80)
}

function updateSystem() {
    temperature = readTemperature()
    serial.writeLine(temperature.toString())
}

function evaluateState(state: number) {
    if (temperature > 20 && temperature <= 30) {
        return IN_RANGE
    }
    else if (temperature <= 20) {
        return TOO_COLD
    }
    else if (temperature > 30) {
        return TOO_HOT
    }
    else {
        return state
    }
}
function reactToState(state: number) {
    if (state == TOO_COLD) {
        show_red()
        heater_on()
        cooler_off()
    }
    else if (state == TOO_HOT) {
        show_blue()
        heater_off()
        cooler_on()
    }
    else {
        show_green()
        heater_off()
        cooler_off()
    }
}

function heater_on() {
    pins.digitalWritePin(DigitalPin.P1, 1)
}

function heater_off() {
    pins.digitalWritePin(DigitalPin.P1, 0)
}

function cooler_on() {
    pins.digitalWritePin(DigitalPin.P2, 1)
}

function cooler_off() {
    pins.digitalWritePin(DigitalPin.P2, 0)
}

basic.forever(function () {
    updateSystem()
    state = evaluateState(state)
    reactToState(state)
})


