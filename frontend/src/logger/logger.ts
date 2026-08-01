export function log(...data: unknown[]) {
    if (process.env.REACT_APP_LOG_LEVEL !== 'production') {
        console.log(...data)
    }
}