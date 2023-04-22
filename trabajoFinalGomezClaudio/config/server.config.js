import parseArgs from 'minimist'

/* Configuracion mediante parametros por consola */
const argv = parseArgs(process.argv.slice(2), {
    alias: {
        p: 'port'
    },
    default: {
        port: 8080,
        NODE_ENV: 'DEV'
    }
})

export default {
    PORT: argv.port
}