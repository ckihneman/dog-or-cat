export function loadState() {
    try {
        const serializedState = window.localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error('loadState');
        return undefined;
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        window.localStorage.getItem('state', serializedState);
    } catch (e) {
        console.error('saveState', state);
        return undefined;
    }
}
