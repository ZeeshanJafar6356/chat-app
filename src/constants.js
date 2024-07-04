let ENV = {
  PROD: {
    SERVER_URL: "https://chat-app-ten-beryl.vercel.app",
  },
  DEV: {
    SERVER_URL: "http://localhost:3001",
  },
};

// module.exports = {
//   SERVER_URL: `${ENV[process.env.STAGE].SERVER_URL}`,
// };

// let CONSTANTS = {
//   SERVER_URL: `${ENV[process.env.STAGE].SERVER_URL}`,
// };

// export default CONSTANTS;
