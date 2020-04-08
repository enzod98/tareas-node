const { argv } = require('./config/yargs');
const porhacer = require('./por-hacer/por-hacer');
const colors = require('colors');


let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porhacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        porhacer.getListado()
            .then(listado => {
                console.log("=======Por Hacer======".green);
                for (let tarea of listado) {
                    console.log(tarea.descripcion);
                    console.log("Estado: " + tarea.completado);
                    console.log("=======================".green);
                }
            })
            .catch(error => console.log(error));
        break;

    case 'actualizar':
        let actualizado = porhacer.actualizar(argv.descripcion, argv.completado);
        if (actualizado) {
            console.log('Tarea actualizada correctamente');
        } else {
            console.log('Hubo un error. Verifique.')
        }
        break;

    case 'borrar':
        console.log(porhacer.borrar(argv.descripcion));
        break;

    default:
        console.log('El comando ingresado no es válido');
        break;
}