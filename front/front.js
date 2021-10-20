var CronJob = require('cron').CronJob;
const backend=require('../backend/backend.js');  ;
require('dotenv').config()

//backend.CPU();
let oidsCPU = ["1.3.6.1.4.1.2021.10.1.3.1","1.3.6.1.4.1.2021.10.1.3.2","1.3.6.1.4.1.2021.10.1.3.3",
"1.3.6.1.4.1.2021.11.9.0","1.3.6.1.4.1.2021.11.50.0","1.3.6.1.4.1.2021.11.10.0","1.3.6.1.4.1.2021.11.52.0",
"1.3.6.1.4.1.2021.11.11.0","1.3.6.1.4.1.2021.11.53.0"];//var oids = ["1.3.6.1.2.1.1.3.0"];

/*let DatosCPU=["carga1Min","carga2Min","carga3Min","PorcentajeUserCPU","rawUserCpuTime","percentagesSystemCPUtime",
                "rawSystemCpuTime","percentagesIdleCPUTime","rawIdleCpuTim"];
*/
var job = new CronJob('* * * * *', function() {

    console.log('INICIANDO SECUENCIA DE DATOS');

    backend.Cpu(oidsCPU);

}, null, true, 'America/Santiago');

job.start();    