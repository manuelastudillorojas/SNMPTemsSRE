var snmp = require ("net-snmp"); 
const request = require("request");

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

var session = snmp.createSession ("localhost", "public", options);
//var session = snmp.createSession ("localhost", "public");
//CPU
var oids = ["1.3.6.1.4.1.2021.4.5.0","1.3.6.1.4.1.2021.4.6.0","1.3.6.1.4.1.2021.4.11.0","1.3.6.1.4.1.2021.4.13.0","1.3.6.1.4.1.2021.4.14.0", "1.3.6.1.4.1.2021.4.15.0","1.3.6.1.4.1.2021.4.3.0","1.3.6.1.4.1.2021.4.4.0"];
//var oids = ["1.3.6.1.2.1.1.3.0"];
let obj = [];
let obj2 = [];
let obj1 = [];
let vard;
mem();

//vard=Cpu();
//console.log('OTRO MOVIDA :',vard);

function insertEventNRSNMPRam(obj) {
    // console.log("--------------");

   //console.log('totalfech',totalfech);


   console.log('PARAM Afuera obj2 :',obj[0]);
   console.log('PARAM Afuera obj2 :',obj[1]);
   console.log('PARAM Afuera obj2 :',obj[2]);
   console.log('PARAM Afuera obj2 :',obj[3]);
   console.log('PARAM Afuera obj2 :',obj[4]);
   console.log('PARAM Afuera obj2 :',obj[5]);
   console.log('PARAM Afuera obj2 :',obj[6]);
   console.log('PARAM Afuera obj2 :',obj[7]);


   
        console.log('llegue a insertar -----------------------------------');
        var headers = {
            'Content-Type': 'json/application',
            'X-Insert-Key': '812744935a47996068ade6ccab1bb6858084NRAL'
            };
            var options = {
               // url: "https://log-api.newrelic.com/log/v1",
                url: "https://insights-collector.newrelic.com/v1/accounts/3270870/events",
                headers: headers
                }
       // envio por logs
       
        options['body'] = JSON.stringify(
        {
        'eventType': 'Reiniermem',
        'Total': obj[0],
        'Used': obj[1],
        'Free': obj[2],
        'Shared': obj[3],
        'Buffered': obj[4],
        'Cached': obj[5],
        'Swap': obj[6],
        'Swap': obj[7],
        
       }
        );
     
        console.log('DATOS ENVIADOS A NEWRELIC:'+options);

        console.log('options:'+options);
        try {
    
          request.post(options, 
            function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error(' failed Speed test:', err);
            }
            console.log(' successful!  SpeedTest:', body);
          });
    
     }
        catch (error) {
          console.error(error);
        }
        console.log('FIN Agent method insertEventNRICOM  ');
    
        }


function mem(){

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
               
               console.log(obj[i]);
          

    }
//console.log('PARAM SOLO :',obj);
insertEventNRSNMPRam(obj);
return obj;

    session.close ();
});


}
session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.error (error);
});