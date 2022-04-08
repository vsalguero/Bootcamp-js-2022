const juan = {
  nombre: "Juan",
  apellido: "Rodríguez",
  edad: 30,
  direccion: {
    ciudad: "Chalatenango",
    municipio: "Chalatenango",
  },
};

//crea una copia de un objeto
//const juan2 = Object.assign({}, juan);
//juan2.apellido = "Pérez";

const juan2 = {
  ...juan,
  apellido: "Pérez",
  telefono: "23470000",
  direccion: {
    ...juan.direccion,
    municipio: "El Paraíso",
    aldea: "Aldea 1",
  },
};

console.log("Juan: ", juan);
console.log("Juan 2: ", juan2);

//arreglos inmutables
const numeros = [1, 2, 3];
const numeros2 = [0, ...numeros, 4];

const index = numeros.indexOf(2);
const numeros3 = [...numeros.slice(0, index), 1.5, ...numeros.slice(index)];
//numeros2.push(4);
const numeros4 = numeros.filter((x) => x != 2);

const numeros5 = numeros.map((x) => (x == 2 ? 100 : x));

console.log("Números: ", numeros);

console.log("Números 2: ", numeros2);

console.log("Números 3: ", numeros3);

console.log("Números 4: ", numeros4);

console.log("Números 5: ", numeros5);
