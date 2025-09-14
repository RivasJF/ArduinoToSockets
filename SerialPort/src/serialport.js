import { SerialPort } from "serialport";
import { withErrorHandling } from "./utils/errorHandler.js";

/**
 * Busca y retorna el path del primer puerto serial disponible.
 * @returns {Promise<string[]>} Una promesa que se resuelve con el path del puerto.
 * @throws {Error} Si no se encuentran puertos seriales.
 */
async function findAllSerialPortsFn() {
  const ports = await SerialPort.list();
  if (ports.length === 0) {
    throw new Error('No se encontraron puertos seriales.');
  }
  return ports.map(port => port.path);
}

export const findAllSerialPorts = withErrorHandling(findAllSerialPortsFn);