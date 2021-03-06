var snmp = require ("net-snmp"); 
const { CPU } = require("./backend_back");
const request = require('request');
require('dotenv').config()
// Default options
var options = {
    port: 161,
    retries: 1,
    timeout: 5000,
    backoff: 1.0,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1,
    backwardsGetNexts: true,
    idBitsSize: 32
};

const insertKey = process.env.INSERT_KEY;
const hostManolo = process.env.HOST_MANUEL;

var session = snmp.createSession ("localhost", "public", options);

//var session = snmp.createSession ("localhost", "public");
//CPU
/*let oidsCPU = ["1.3.6.1.4.1.2021.10.1.3.1","1.3.6.1.4.1.2021.10.1.3.2","1.3.6.1.4.1.2021.10.1.3.3",
            "1.3.6.1.4.1.2021.11.9.0","1.3.6.1.4.1.2021.11.50.0","1.3.6.1.4.1.2021.11.10.0","1.3.6.1.4.1.2021.11.52.0",
            "1.3.6.1.4.1.2021.11.11.0","1.3.6.1.4.1.2021.11.53.0"];//var oids = ["1.3.6.1.2.1.1.3.0"];
*/
let obj = [];
let obj1 = [];
let obj2 = [];
let obj3 = [];
let obj4 = [];
let obj5 = [];

let vard;

//vard=Cpu();
//console.log('OTRO MOVIDA :',vard);

function insertEventNRSNMPCPU(obj) {
    // console.log("--------------");

   //console.log('totalfech',totalfech);
   /* console.log('PARAM Afuera obj2 :',obj[0]);
   console.log('PARAM Afuera obj2 :',obj[1]);
   console.log('PARAM Afuera obj2 :',obj[2]);
  console.log('PARAM Afuera obj2 :',obj[3]);
   console.log('PARAM Afuera obj2 :',obj[4]);
   console.log('PARAM Afuera obj2 :',obj[5]);
   console.log('PARAM Afuera obj2 :',obj[6]);
   console.log('PARAM Afuera obj2 :',obj[7]);
   console.log('PARAM Afuera obj2 :',obj[8]);*/


   
        console.log('llegue a insertar -----------------------------------');
        var headers = {
            'Content-Type': 'json/application',
            'X-Insert-Key': insertKey
            };
            var options = {
               // url: "https://log-api.newrelic.com/log/v1",
                url: "https://insights-collector.newrelic.com/v1/accounts/3270870/events",
                headers: headers
                }
       // envio por logs
       
            options['body'] = JSON.stringify(
                {
                    'eventType': 'CPUSnmp',
                    'HOST':hostManolo,
                    'carga1Min': obj[0],
                    'carga2Min': obj[1],
                    'carga3Min': obj[2],
                    'PorcentajeUserCPU': obj[3],
                    'rawUserCpuTime': obj[4],
                    'percentagesSystemCPUtime': obj[5],
                    'rawSystemCpuTime': obj[6],
                    'percentagesIdleCPUTime': obj[7],
                    'rawIdleCpuTim': obj[8],
                }
        );
     
   
        console.log('DATOS ENVIADOS A NEWRELIC Manuel:'+options);
        try {
    
          request.post(options, 
            function optionalCallback(err, httpResponse, body) {
                if (err) {
                return console.error(' failed CpuMetodos:', err);
                }
                console.log(' successful!  CpuMetodos:', body);
             });
    
        }
        catch (error) {
          console.error(error);
        }
        console.log('FIN Agent method insertEventNRICOM  ');
    
}


function Cpu(oids){

session.get (oids, function (error, varbinds) {

    
    if (error) {
        console.error (error);
    } else {
        
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
             else
           // console.log (varbinds[i].oid + " Valores  = "+ varbinds[i].value);
              // console.log (parseFloat(varbinds[i].value));
              // console.log (varbinds[i].value);
               // obj.push(parseFloat(varbinds[3].value));
               obj1[i]=varbinds[i].value;
               obj.push(parseFloat(obj1[0]));
               obj.push(parseFloat(obj1[1]));
               obj.push(parseFloat(obj1[2]));
               obj.push(parseFloat(obj1[3]));
               obj.push(parseFloat(obj1[4]));
               obj.push(parseFloat(obj1[5]));
               obj.push(parseFloat(obj1[6]));
               obj.push(parseFloat(obj1[7]));
               obj.push(parseFloat(obj1[8]));
               
              // console.log(obj[i]);
          

    }
//console.log('PARAM SOLO :',obj);
if(obj!=null){
    insertEventNRSNMPCPU(obj);
}else{
    console.log(obj.push('Sin Dato'));
}

//return obj;

    //session.close ();
});


}

function insertEventNRSNMPTime(obj) {
    // console.log("--------------");

   //console.log('totalfech',totalfech);

/*
   console.log('PARAM Afuera obj2 :',obj[0]);
   console.log('PARAM Afuera obj2 :',obj[1]);
   console.log('PARAM Afuera obj2 :',obj[2]);
  */ 


         console.log('llegue a insertar -----------------------------------');
          var headers = {
            'Content-Type': 'json/application',
            'X-Insert-Key': insertKey
          };
           var options = {
             //url: "https://log-api.newrelic.com/log/v1",
             url: "https://insights-collector.newrelic.com/v1/accounts/3270870/events",
             headers: headers
            }
    //    // envio por logs
       
         options['body'] = JSON.stringify(
         {
         'eventType': 'IvanUptime',
         'HOST':hostManolo,
         'description': obj[0],
         'uptime': obj[1],
         'name': obj[2],
        
        }
        );
     
        console.log('Datos enviados a NewRelic:'+options);

        console.log('options:'+options);
        try {
    
          request.post(options, 
            function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error(' failed TimeMetodos:', err);
            }
            console.log(' successful!  TimeMetodos:', body);
          });
    
     }
        catch (error) {
          console.error(error);
        }
        console.log('FIN Agent method insertEventNRICOM  ');
    
}


function uptime(oids){

    session.get (oids, function (error, varbinds) {
    
        
        if (error) {
            console.error (error);
        } else {
            for (var i = 0; i < varbinds.length; i++)
                if (snmp.isVarbindError (varbinds[i]))
                    console.error (snmp.varbindError (varbinds[i]))
                 else
               // console.log (varbinds[i].oid + " Valores  = "+ varbinds[i].value);
                  // console.log (parseFloat(varbinds[i].value));
                  // console.log (varbinds[i].value);
                   // obj.push(parseFloat(varbinds[3].value));
                   obj3[i]=varbinds[i].value;
                   obj2.push(String(obj3[0]));
                   obj2.push(obj3[1]);
                   obj2.push(String(obj3[2]));
               
    
                   
                   //console.log(obj[i]);
              
    
        }
    //console.log('PARAM SOLO :',obj);
        if(obj2!=null){
            insertEventNRSNMPTime(obj2);
        }else{
            console.log(obj2.push('Sin Dato'));
        }
    });
    
    
}



function insertEventNRSNMPMem(obj) {
    // console.log("--------------");

   //console.log('totalfech',totalfech);

/*
   console.log('PARAM Afuera obj2 :',obj[0]);
   console.log('PARAM Afuera obj2 :',obj[1]);
   console.log('PARAM Afuera obj2 :',obj[2]);
   console.log('PARAM Afuera obj2 :',obj[3]);
   console.log('PARAM Afuera obj2 :',obj[4]);
   console.log('PARAM Afuera obj2 :',obj[5]);
   console.log('PARAM Afuera obj2 :',obj[6]);
   console.log('PARAM Afuera obj2 :',obj[7]);

*/
   
        console.log('llegue a insertar -----------------------------------');
        var headers = {
            'Content-Type': 'json/application',
            'X-Insert-Key': insertKey
            };
            var options = {
               // url: "https://log-api.newrelic.com/log/v1",
                url: "https://insights-collector.newrelic.com/v1/accounts/3270870/events",
                headers: headers
                }
       // envio por logs
       
        options['body'] = JSON.stringify(
        {
        'eventType': 'MemoriaSNMP',
        'HOST':hostManolo,
        'Total': obj[0],
        'Free': obj[1],
        'Shared': obj[2],
        'Buffered': obj[3],
        'Cached': obj[4],
        'Total Swap Size': obj[5],
        'Available Swap Space': obj[6],
        
       }
        );
     
        console.log('DATOS ENVIADOS A NEWRELIC:'+options);

        console.log('options:'+options);
        try {
    
          request.post(options, 
            function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error(' failed RamMetodos:', err);
            }
            console.log(' successful!  RamMetodos:', body);
          });
    
     }
        catch (error) {
          console.error(error);
        }
        console.log('FIN Agent method insertEventNRICOM  ');
    
}





function mem(oids){

    session.get (oids, function (error, varbinds) {
    
        
        if (error) {
            console.error (error);
        } else {
            for (var i = 0; i < varbinds.length; i++)
                if (snmp.isVarbindError (varbinds[i]))
                    console.error (snmp.varbindError (varbinds[i]))
                 else
               // console.log (varbinds[i].oid + " Valores  = "+ varbinds[i].value);
                  // console.log (parseFloat(varbinds[i].value));
                  // console.log (varbinds[i].value);
                   // obj.push(parseFloat(varbinds[3].value));
                   obj5[i]=varbinds[i].value;
                   obj4.push(parseFloat(obj5[0]));
                   obj4.push(parseFloat(obj5[1]));
                   obj4.push(parseFloat(obj5[2]));
                   obj4.push(parseFloat(obj5[3]));
                   obj4.push(parseFloat(obj5[4]));
                   obj4.push(parseFloat(obj5[5]));
                   obj4.push(parseFloat(obj5[6]));
                   
                   //console.log(obj[i]);
              
    
        }
    //console.log('PARAM SOLO :',obj);
        if(obj4!=null){
            insertEventNRSNMPMem(obj4);
        }else{
            console.log(obj4.push('Sin Dato'));
        }
    });
    
    
    }




session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.error (error);
});




module.exports = {
    Cpu,uptime,mem
}