/*function mensaje(prefijo, formateador) {
    return function (texto) {
        return formateador(prefijo, texto);
    }
}

const formatoBienvenida = function (prefijo, texto) {
    return "¡" + prefijo + " " + texto + "!";
}*/

const mensaje = (prefijo, format) => (texto) => format(prefijo, texto);

const bienvenida = mensaje("Hola", (a, b) => `!${a} ${b}!`);
const despedida = mensaje("Adios", (a, b) => `${a} ${b}... :(`);

console.log(bienvenida("Mundo"));
console.log(despedida("Mundo"));
