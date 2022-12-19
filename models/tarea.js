// Importamos paquetes que han sido instalados.

// El paquete 'uuid' es utilizado para crear distintos ID unicos.
import { v4 as uuidv4 } from 'uuid';

// Creamos una nueva clase llamada 'tarea' que se encargará de crear las tareas del programa.
class Tarea {

    // Se declaran sus propiedades.
    id = '';
    desc = '';
    completadoEn = null;

    /* El constructor permite crear una nueva instancia de 'tarea' 
    y es necesario recibir la 'desc' (descripción). */
    constructor(desc) {
        
        // Se asigna un ID unico utilizando la función 'uuidv4()' del paquete 'uuid'.
        this.id = uuidv4();

        /* Con la 'desc' (descripción) enviada como parámetro es asignada a 
        la desc (descripción) de la clase. */
        this.desc = desc;
        this.completadoEn = null;
    }

}

// Exportamos la clase.
export {
    Tarea
}