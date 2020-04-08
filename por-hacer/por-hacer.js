const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, error => {
        if (error) throw new Error('No se pudo grabar', error);
    });


}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    }

    cargarDB();

    listadoPorHacer.push(porHacer);

    guardarDB();
    return porHacer;
}

const getListado = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(require('../db/data.json'));
        } catch (error) {
            reject('La lista de tareas está vacía')
        }
    })
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //con la función findIndex lo que hacemos es buscar el índice del elemento dentro de un arreglo que cumpla la conidición que especificamos con una función, en caso de no encontrar nada, devolverá -1

    if (index => 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return 'Se eliminó correctamente el elemento';
    } else {
        return 'No se pudo encontrar el elemento';
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}