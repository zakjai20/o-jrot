var Rot = require("./index");
var express = require('express');

var app = express();

app.use("/api/Rot", Rot.app);

app.listen(3000);

var log = console.log;



console.log(require('./index.js', ["zakria"]))



// var razAZ09 = new Rot({
//     data : Rot.create({s:"a",e:"z"}, {s:"A",e:"Z"}, {s:"0",e:"9"}),
//     rc : 13
// });

// var raz09AZ = new Rot({
//     data : Rot.create({s:"a",e:"z"}, {s:"0",e:"9"}, {s:"A",e:"Z"}),
//     rc : 13
// });

// var rAZaz09 = new Rot({
//     data : Rot.create({s:"A",e:"Z"}, {s:"a",e:"z"}, {s:"0",e:"9"}),
//     rc : 13
// });

// var rAZ09az = new Rot({
//     data : Rot.create({s:"A",e:"Z"}, {s:"0",e:"9"}, {s:"a",e:"z"}),
//     rc : 13
// });

// var r09AZaz = new Rot({
//     data : Rot.create({s:"0",e:"9"}, {s:"A",e:"Z"}, {s:"a",e:"z"}),
//     rc : 13
// });

// var r09azAZ = new Rot({
//     data : Rot.create({s:"0",e:"9"}, {s:"a",e:"z"}, {s:"A",e:"Z"}),
//     rc : 13
// });


// var jz_random1 = new Rot({
//     data : Rot.create({s:90,e:120}, {s:20,e:70}, {s:800,e:1000}),
//     rc   : 2048
// });

// var jz_random1 = new Rot({
//     data : "r1"
// });

// log(Rot.resetPackages());

// Rot.addPackage(razAZ09.get(), ["aA0-1", "aA0", "azAZ09"]);
// Rot.addPackage(raz09AZ.get(), ["aA0-2", "a0A", "az09AZ"]);
// Rot.addPackage(rAZaz09.get(), ["aA0-3", "Aa0", "AZaz09"]);
// Rot.addPackage(rAZ09az.get(), ["aA0-4", "A0a", "AZ09az"]);
// Rot.addPackage(r09AZaz.get(), ["aA0-5", "0Aa", "09AZaz"]);
// Rot.addPackage(r09azAZ.get(), ["aA0-6", "0aA", "09azAZ"]);

// Rot.addPackage(jz_random1.get(), ["random1", "r1", "jz-r1"]);


// var d = "zakaria jaidi ok ZAKARIA JAIDI OK DONE  \nRot.create({s:20,e:60}, {s:90,e:100}, {s:900,e:950}).join('')";
// var de= jz_random1.encode(d);
// var dd= jz_random1.decode(de);
// log(Rot);
// log({d,de,dd});
// log(d.length, de.length, dd.length)

// for(var i in d){
//     log(d[i]," ==",i,"== ", de[i]);
// }