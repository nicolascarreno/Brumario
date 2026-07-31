export function log(...data: unknown[]) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(...data)
    }
}