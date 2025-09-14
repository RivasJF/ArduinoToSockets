import inquirer from 'inquirer';
import { withErrorHandling } from "./utils/errorHandler.js";

/**
 * Muestra un menú de selección única de puertos seriales.
 * @returns {Promise<string>} Una promesa que se resuelve con el path del puerto seleccionado por el usuario.
 */
async function selectSerialPortFromMenuFn(availablePorts) {
    // Mapea la lista de puertos para crear las opciones del menú de Inquirer
    const choices = availablePorts.map(portPath => ({
      name: portPath,
      value: portPath
    }));

    // Configura la pregunta de selección única
    const question = {
      type: 'list', // Cambiado de 'checkbox' a 'list'
      name: 'selectedPort',
      message: 'Selecciona el puerto serial que deseas usar:',
      choices: choices
    };

    // Muestra el menú y espera la respuesta del usuario
    const answers = await inquirer.prompt(question);

    // Retorna el path del puerto seleccionado
    return answers.selectedPort;
}

export const selectSerialPortFromMenu = withErrorHandling(selectSerialPortFromMenuFn);