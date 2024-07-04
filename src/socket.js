// frontend/src/socket.js
import { io } from "socket.io-client";
import CONSTANTS from "./constants";
const socket = io(CONSTANTS.SERVER_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 3,
});
export default socket;
