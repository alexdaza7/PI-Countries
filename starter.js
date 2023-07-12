const {exec} = require('child_process');
const path = require('path');

const client = path.resolve(__dirname,'client/');
const server = path.resolve(__dirname,'api/');

//Ejecutar el front
const startClient = exec('npm start',{cwd: client});
startClient.stdout.pipe(process.stdout);
startClient.stdout.pipe(process.stderr);

//Ejecutar el back
const startApi = exec('npm start',{cwd: server});
startApi.stdout.pipe(process.stdout);
startApi.stdout.pipe(process.stderr);