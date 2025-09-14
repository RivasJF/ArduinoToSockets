import { SerialPort } from "serialport";
import { findAllSerialPorts as DeteccionPuerto } from "./src/serialport.js"
import { selectSerialPortFromMenu } from "./src/menu.js";
import { withErrorHandling } from "./src/utils/errorHandler.js";

async function mainFn() {
  const availablePorts = await DeteccionPuerto();
  const puertoSeleccionado = await selectSerialPortFromMenu(availablePorts);

  if (!puertoSeleccionado) {
    console.log("No se seleccionó ningún puerto.");
    return;
  }

  console.log('Puerto seleccionado:', puertoSeleccionado);
  const port = new SerialPort({
    path: puertoSeleccionado,
    baudRate: 9600
  });

  port.on('open', () => {
    console.log('Comunicación serial abierta. Enviando comandos...');

    setTimeout(() => {
      port.write('a');
      console.log('Comando "A" enviado.');
    }, 2000);


    setTimeout(() => {
      port.write('b');
      console.log('Comando "B" enviado.');
      port.close(err => {
        if (err) {
          return console.log('Error al cerrar el puerto:', err.message);
        }
        console.log('El puerto serial ha sido cerrado.');
      });
    }, 5000);
  });

  port.on('error', err => {
    console.error('Error en el puerto:', err.message);
  });
}

const main = withErrorHandling(mainFn);

main();