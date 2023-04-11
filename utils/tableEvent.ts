
const EVENT_NAME = 'refreshTable'


const subscribe = (listener: EventListener) => {
    document.addEventListener(EVENT_NAME, listener)
}

const unsubscribe = (listener: EventListener) => {
    document.removeEventListener(EVENT_NAME, listener)
}

const publishRefreshTable = () => {
    const event = new Event(EVENT_NAME)
    document.dispatchEvent(event)
}

export {
    subscribe,
    unsubscribe,
    publishRefreshTable
}
