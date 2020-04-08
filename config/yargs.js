const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Estado de completado o pendiente de la tarea'
}

const { argv } = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado de proceso de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Lista la totalidad de tareas registradas', {})
    .command('Borrar', 'Elimina la tarea con la descripción ingresada', {
        descripcion
    })
    .help();

module.exports = {
    argv
}