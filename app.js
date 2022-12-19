// Importamos funciones propias.

import { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} from './helpers/inquirer.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

// Importamos clases propias.

import { Tareas } from './models/tareas.js';

console.clear();

// Entramos en la función pricipal del código.
const main = async() => {

    // Creamos la variable 'opt' (option) con la que se eligirá las opciones del menú.
    let opt = '';

    // Con la clase 'Tareas' iniciamos una nueva instancia de la clase.
    const tareas = new Tareas();

    /* Ejecuta la función 'leerDB' para leer las tareas que estén en el archivo creado.
    las guarda en 'tareasDB' */
    const tareasDB = leerDB();

    // Si existen tareas en el archivo creado, entonces ejecuta el siguiente código.
    if(tareasDB) {
        // Se cargan las Tareas al listado de tareas. Se envía como parámetro 'tareasDB'.
        tareas.cargarTareaFromArray(tareasDB);
    }

    // El ciclo 'do..while' hará que se repita el menú hasta que el usuario ingrese una opción correcta.
    do{
        // Espera la 'opt' (option) que es dada por inquirerMenu.
        opt = await inquirerMenu();
        
        // Ejecuta cada valor posible de 'opt' para ejecutar distintas funciones del programa.
        switch (opt) {
            case '1':
                /* Ejecuta la función 'leerInput' que es utilizada para que el usuario agregue 
                információn por consola. */
                const desc = await leerInput('Descripción:');

                /* Con la información agregada por el usuario 'desc', el método 'crearTarea' 
                de la clase 'tareas' se encargará de crear una tarea con esa descripción. */
                tareas.crearTarea(desc);
                break;
            case '2':
                // Se ejecuta el método de 'tareas' para mostrar todas las tareas.
                tareas.listadoCompleto();
                break;
            case '3':
                // Muestra las tareas que estén completadas.
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                // Muestra las tareas que estén pendientes.
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                /* Espera que el usuario ingrese las tareas que quiere completar o colocar como
                incompletas. Se envía el listado de tareas.
                Retornará los 'ids' de las taraes correspondientes. */
                const ids = await mostrarListadoChecklist(tareas.listadoArr);

                // Ejecuta el método para completar las tareas con los 'ids'.
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                /* Se espera que usuario elija la tarea que quiere borrar.
                Se envía como parámetro el arreglo de 'listadoArr'. y en 'id' se almacena el id
                de la tarea que va a ser borrada. */
                const id = await listadoTareasBorrar(tareas.listadoArr);

                // Si el id es diferente de cero se ejecura el código para borrar la tarea.
                if(id !== '0'){
                    // Se espera una confirmación del usuario. Retornará un valor booleano.
                    const ok = await confirmar('¿Está seguro?');
                    // Si el valor es 'true' se procede a borrar la tarea.
                    if(ok) {
                        /* Se ejecuta el método de 'borrarTarea' que recibe como parámetro el id
                        de la tarea */
                        tareas.borrarTarea(id);
                        // Muestra un mensaje en consola de que la tarea se borró.
                        console.log('Tarea Borrada');
                    }
                }
                break;
            case '0':
                break;
        }

        // Se guarda la lista de tareas en el archivo que simula ser la base de datos.
        guardarDB(tareas.listadoArr);

        await pausa();
    
    // Si la opción agregada o seleccionada es 0 se saldrá del menú.
    }while(opt !== '0');

}

// Ejecutamos la función principal del programa.
main();