var CronJob = require('cron').CronJob;
const backend=require('../backend/backend.js');  ;
require('dotenv').config()

//backend.CPU();
let oidsCPU = ["1.3.6.1.4.1.2021.10.1.3.1","1.3.6.1.4.1.2021.10.1.3.2","1.3.6.1.4.1.2021.10.1.3.3",
"1.3.6.1.4.1.2021.11.9.0","1.3.6.1.4.1.2021.11.50.0","1.3.6.1.4.1.2021.11.10.0","1.3.6.1.4.1.2021.11.52.0",
"1.3.6.1.4.1.2021.11.11.0","1.3.6.1.4.1.2021.11.53.0"];//var oids = ["1.3.6.1.2.1.1.3.0"];
var oidsTime = ["1.3.6.1.2.1.1.1.0","1.3.6.1.2.1.1.3.0","1.3.6.1.2.1.1.5.0"];
var oidsRam = ["1.3.6.1.4.1.2021.4.5.0","1.3.6.1.4.1.2021.4.11.0","1.3.6.1.4.1.2021.4.13.0","1.3.6.1.4.1.2021.4.14.0", "1.3.6.1.4.1.2021.4.15.0","1.3.6.1.4.1.2021.4.3.0","1.3.6.1.4.1.2021.4.4.0"];
/*let DatosCPU=["carga1Min","carga2Min","carga3Min","PorcentajeUserCPU","rawUserCpuTime","percentagesSystemCPUtime",
                "rawSystemCpuTime","percentagesIdleCPUTime","rawIdleCpuTim"];
*/
var job = new CronJob('*/5 * * * *', function() {

    console.log('INICIANDO SECUENCIA DE DATOS');

    backend.Cpu(oidsCPU);
    backend.uptime(oidsTime);
    backend.mem(oidsRam);


}, null, true, 'America/Santiago');

job.start();    