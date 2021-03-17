const SUCCESS_RATE = 0.8
const DELAY = 500

const sometimesRejects = () => {
    const isRejected = Math.random() > SUCCESS_RATE
    const percent = Math.round((1.0 - SUCCESS_RATE) * 100)
    return {
        isRejected,
        errorMessage: isRejected
            ? `Mock Server randomly rejects ${percent}% of the time`
            : null,
    }
}

const wait = () => new Promise(resolve => setTimeout(resolve, DELAY))

export { sometimesRejects, wait }
