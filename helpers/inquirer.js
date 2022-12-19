// Importamos paquetes que han sido instalados.

/*'inquirer' es utilizado para crear el menú y todas las funciones relacionada a eso
 de la aplicación de consola. */
import inquirer from 'inquirer';

// 'Colors' es utilizado para mostrar String coloridos en consola.
import 'colors';

/* Se crea un arreglo de objetos llamado 'preguntas' que permite crear las opción del menú de una 
forma que 'inquirer' pueda entender */
const preguntas = [
    {   
        // El tipo de información. En este caso, una lista.
        type: 'list',
        // El nombre del valor que el usuario ingresará.
        name: 'opcion',
        // El mensaje que se mostrará en la consola.
        message: '¿Que desea hacer?',
        // Las opciones del menú
        choices: [
            {
                // El valor de la opción.
                value: '1',
                // El nombre de la opción.
                name: `${'1.'.blue} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.blue} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.blue} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.blue} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.blue} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.blue} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.blue} Salir`
            },
        ]
    }
];

// Se crea la función 'inquirerMenu' para crear el menú principal de la aplicación. Es una función asíncrona.
const inquirerMenu = async() => {

    // Se limpia la consola y se crea el encabezado de la aplicación de consola.
    console.clear();
    console.log('========================'.blue);
    console.log(' Seleccione una opción');
    console.log('========================\n'.blue);

    /* Se espera una respuesta del usuario correspondiente a las opciones del menú.
    El valor de la opción es proveniente de los 'values' dentro de 'choice' de preguntas. 
    Se desectructura el arreglo porque si no se retorná un arreglo con el valor 'opcion' 
    lo que se quiere es solamente el valor de 'opcion'. */
    const {opcion} = await inquirer.prompt(preguntas);

    // Se retorna el valor de la opción elegida por el usuario.
    return opcion;

}

/* Se crea la función 'pausa' que permite mostrar un mensaje antes de saltar de pantalla en la aplicación.
es una función asíncrona */
const pausa = async() => {

    // Se crea el arreglo de objeto 'preguntaConfirmar' para mostrar un mensaje de continuar.
    const preguntaConfirmar = [
        {   
            // El tipo de información. En este caso, se recibe datos.
            type: 'input',
            /* Nombre del de valor que el usuario asignará. No es tan importante. 
            El usuario ingresará cualquier valor para confirmar */
            name: 'enter',
            // El mensaje que se mostrará en consola.
            message: `Presione ${'Enter'.blue} para continuar\n`
        }
    ]

    // Se muestra un salto de línea en consola.
    console.log('\n');
    // Se espera que el usuario ingrese un valor para 'preguntaConfirmar'
    await inquirer.prompt(preguntaConfirmar);

    //Es una función que no retorna ningún valor, solo se ejecuta.
}

/* La función 'leerInput' permite leer información que el usuario ingrese. Es una función asíncrona.
Recibe como parámetro 'message' (mensaje) que será el mensaje que tendrá el input. */
const leerInput = async(message) => {

    // Se crea el arreglo de objeto 'question'
    const question = [
        {
            // El tipo de información. En este caso, se recibe datos.
            type: 'input',
             // Nombre del de valor que el usuario asignará. Será el valor que retorne la función.
            name: 'desc',
            // Es el mensaje que se mostrará en consola, se recibe como parámetro de la función.
            message,
            // Se valida que el usuario haya ingresado un valor.
            validate(value) {
                /* Si el usuario no ingresa nada, se mostrará un mensaje en consola. 
                Si ingresa información, retornara 'true'. */
                if(value.length === 0) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];

    /* Se espera la respuesta del usuario a lo que queremos que ingrese. Se desectructura el arreglo porque
    si no se retorná un arreglo con el valor 'desc' lo que se quiere es solamente el valor de 'desc'. */
    const {desc} = await inquirer.prompt(question);

    // Se retorna 'desc' (descripción).
    return desc;

}

// Función para borrar las tareas. Recibe un arreglo de las tareas.
const listadoTareasBorrar = async(tareas = []) => {

    /* Se recorre cada tarea de 'tareas' utilizando el método 'map'. Recibe como parametro las tarea 
    y el índice en el array. */ 
    const choices = tareas.map( (tarea, i) => {
        // Se creó para mostrar un número antes de la descripción de la tarea.
        const idx = `${i + 1}.`.blue;
        // Retorna un objeto que será utilizado para la lista de tareas
        return {
            // El value será el id de la tarea.
            value: tarea.id,
            // El mensaje que mostrará en la lista será el número más la descripción de la tarea.
            name: `${idx} ${tarea.desc}`
        }
    });

    // Antes de la lista de las tarea se agrega la opción de cancelar.
    choices.unshift({
        value: '0',
        name: '0. '.blue + 'Cancelar'
    });

    // Se crea la lista de tareas.
    const preguntas = [
        {
            // El tipo de información. En este caso, una lista.
            type: 'list',
            // El nombre del valor que retornará 'inquirer.prompt()'.
            name: 'id',
            // El mensaje que será mostrado en la consola.
            message: 'borrar',
            // Las tareas a elegir para ser borradas.
            choices
        }
    ];
    // Se espera que el usuario elija la tarea  que desea borrar y será retornado el valor de esa tarea. 
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

// Mensaje de confirmación para borrar la tarea.
const confirmar = async(message) => {
    
    // Se utiliza para mostrar el mensaje de confirmación.
    const question = [
        {
            // Es tipo de dato que se recibirá. En este caso es una confirmación (Y/n).
            type: 'confirm',
            // Nombre del valor que retornará.
            name: 'ok',
            // El mensaje que será mostrado en pantalla.
            message
        }
    ];

    // Se espera la confirmación del usuario.
    const {ok} = await inquirer.prompt(question);

    // Se retorna el valor de la confirmación. Un booleano.
    return ok;

}

/* Función para mostrar el listado de las tareas que se completarán o se colocarán como incompletas.
recibe como parámetros un arreglo de tareas. */
const mostrarListadoChecklist = async(tareas = []) => {

    /* Para mostrar las tareas que se marcarán. Se recorre las tareas con un '.map' recibe una tarea y
    su posición en el array */
    const choices = tareas.map( (tarea, i) => {
        // Se crea el número que irá antes de la descripción de la tarea.
        const idx = `${i + 1}.`.blue;
        // Retorna un arreglo de cada tarea.
        return {
            // El id de la tarea.
            value: tarea.id,
            // El nombre que se mostrará en consola.
            name: `${idx} ${tarea.desc}`,
            // El estado de la tarea (true = completa | false = incompleta).
            checked: (tarea.completadoEn) ? true : false,
        }
    });

    // Para mostrar las tareas que se seleccionarán.
    const pregunta = [
        {
            // Es tipo de dato que se recibirá. En este caso es un checkbox (true/false).
            type: 'checkbox',
            // El nombre del valor que retornará.
            name: 'ids',
            // El mensaje que mostrá en consola.
            message: 'Seleccione',
            // Las tareas para seleccionar.
            choices
        }
    ];

    // Se espera que el usuario ingrese sus elecciones.
    const {ids} = await inquirer.prompt(pregunta);
    
    // Se retornan los ids de las tareas que se completarán o se marcarán como incompletas.
    return ids;

}

//Exportamos las funciones.
export {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}