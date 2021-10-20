const snmp = require ("net-snmp");
//llamamos a Express
           
const fs = require('fs');
const { Console } = require("console");

// Default options

let oidsCPU = ["1.3.6.1.4.1.2021.10.1.3.1","1.3.6.1.4.1.2021.10.1.3.2","1.3.6.1.4.1.2021.10.1.3.3",
            "1.3.6.1.4.1.2021.11.9.0","1.3.6.1.4.1.2021.11.50.0","1.3.6.1.4.1.2021.11.10.0","1.3.6.1.4.1.2021.11.52.0",
            "1.3.6.1.4.1.2021.11.11.0","1.3.6.1.4.1.2021.11.53.0"];
let DatosCPU=["1 min carga","2 min carga","3 min carga","Porcentaje of user CPU","raw user cpu time","percentages of system CPU time",
                "raw system cpu time","percentages of idle CPU time","raw idle cpu tim"];

//var session = snmp.createSession ("localhost", "public");
//var oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.4.1.2021.10.1.3.1","1.3.6.1.4.1.2021.10.1.3.3","1.3.6.1.4.1.2021.11.9.0", "1.3.6.1.4.1.2021.4.6.0"];
//var oids = ["1.3.6.1.4.1.2021.10.1.3.1","1.3.6.1.4.1.2021.10.1.3.2","1.3.6.1.4.1.2021.10.1.3.3"];
//var oids = ["1.3.6.1.4.1.2021.4.3.0","1.3.6.1.4.1.2021.4.5.0","1.3.6.1.4.1.2021.4.6.0","1.3.6.1.4.1.2021.4.11.0"];


//disco         
//var oids = ["1.3.6.1.4.1.2021.9.1.2.1","1.3.6.1.4.1.2021.9.1.7.1","1.3.6.1.4.1.2021.9.1.8.1","1.3.6.1.4.1.2021.9.1.9.1"];
// cpu 1,3,5 minutos de carga,percentage of user CPU,raw user cpu time,percentages of system CPU time
//raw system cpu time,percentages of idle CPU time,raw idle cpu tim


let valoresObtenidos = [];
let nombre;
let numero;
let valor;
CPU();         
function CPU(){
    
    

    let options = {
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

   
    let session = snmp.createSession ("localhost", "public", options);
 
   
        session.get (oidsCPU, function (error, varbinds) {
           
        if (error) {
           
            console.error (error);
        } else {
          
            for (var i = 0; i < varbinds.length; i++)
                if (snmp.isVarbindError (varbinds[i])){
                    console.error (snmp.varbindError (varbinds[i]))
                }else{
                   // console.log(varbinds[0]);
                   //valoresObtenidos = varbinds[i]; 
                   //console.log (" Valores  = "+ varbinds[4].value);
                  //numero=varbinds[4].value;
                   //console.log(numero);
                   valoresObtenidos.push(parseFloat(varbinds[i].value));
                    //console.log ((parseFloat(varbinds[i].value)));
                   //console.log (varbinds[i].value);
                    //console.log (varbinds[i].value);
          
                    //console.log(DatosCPU[i]+' + '+varbinds[i].oid+' + '+varbinds[i].value)
                
               //console.log(DatosCPU[i]+' + '+varbinds[i].oid+' + '+varbinds[i].value)
                //nombre='';
                //numero='';
                //valor='';
                //nombre=nombre+'+'+DatosCPU[i];
                //console.log(nombre);
                //numero="'"+varbinds[i].oid+"'";
                //valor="'"+varbinds[i].value+"'";
                /*numero=123;
                valor=123;
                valoresObtenidos.push({
                    nombre:nombre,
                    numero: numero,
                    valor: valor,
                });
               */
            }
               
    }            
   /*
    valoresObtenidos.map((valoresObtenido) => {
        console.log(valoresObtenido.nombre+'-'+valoresObtenido.numero);
     });
   */
  
     //
    
    
      console.log(valoresObtenidos);
      return valoresObtenidos;
      session.close ();
     
    });   


    //
}


module.exports = {
    CPU
}