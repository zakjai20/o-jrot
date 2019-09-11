var fs = require("fs");
var express = require("express");

var stdoutFileName = process.argv[2];
console.log(process.argv)
console.log(require)

if(stdoutFileName){
    var stdout = fs.createWriteStream(stdoutFileName);
    var loger = new console.Console({stdout: stdout});
}else{
    var loger = new console.Console({stdout: process.stdout});
}

var dataPackages = require('./lib');


var log = loger.log;
var dir = loger.dir;


var app = express.Router();

app.use(express.json())

app.post("/encode",(req,res,next)=>{
    if(req.body){
        res.json({result: new Rot(req.body).encode(req.body.result)});
    }else{
        res.json({});
    }
})

app.post("/decode",(req,res,next)=>{
    if(req.body){
        res.json({result: new Rot(req.body).decode(req.body.result)});
    }else{
        res.json({});
    }
})

class Rot{
    constructor(obj){
        var s    = obj.start    || obj.s        || 1,
            e    = obj.end      || obj.e        || 126,
            data = obj.data     || Rot.chars(s,e),
            rc   = obj.rotcount || obj.rotCount || obj.rc || 48;

        if(typeof data === "string"){
            var found = false
            for(var pack of Rot.dataPackages){
                if(pack.indexOf(data) !== -1){
                    found = true;
                    var packname = pack[0];
                    var packdata = Rot.load(`./lib/${packname}`,".Rot");
                    this.data = packdata.data;
                    this.rc   = packdata.rc;
                }
            }
            if(!found){
                throw `this package (${data}) dosen't exists`;
            }
        }else if(Array.isArray(data)){
            this.data = data;
            this.rc   = rc;
        }else{
            throw `this data type of ${typeof data} is not accepted`;
        }

        this.encode = Rot.encode;
        this.decode = Rot.decode;
    }

    getDataAs(type="ar"){
        if(type === "ar"){
            return this.data
        }else
        if(type === "ac"){
            return Rot.charToCode(this.data);
        }else
        if(type === "sr"){
            return this.data.join("-:-");
        }else
        if(type === "sc"){
            return Rot.charToCode(this.data).join('-:-');
        }
        return this.data;
    }
    get(){
        return {
            data : this.data,
            rc   : this.rc
        }
    }
    save(n, e=".Rot"){
        var rgx = new RegExp(`.${e}$`);
        n = n.search(rgx) !== -1 ? n : `${n}${e}`;
        fs.createWriteStream(n).write(JSON.stringify(this));
    }

    static encode(str){
        var {data, rc} = this,
            {length}   = data;
        var out = "";
        for(var i of str){
            var indx = data.indexOf(i);
            if(indx !== -1){
                var ni = (indx + rc) % length;
                out += data[ni];
            }else{
                out += i;
            }
        }
        return out
    }

    static decode(str){
        var {data, rc} = this,
            {length}   = data;
        var out = "";
        for(var i of str){
            var indx = data.indexOf(i);
            if(indx !== -1){
                var ni = (indx - rc) % length;
                ni = ni <0 ? ni+length : ni;
                out += data[ni];
            }else{
                out += i;
            }
        }
        return out
    }

    static codes(s,e){
        if(Object.prototype.toString.call(s*e) === "[object Number]" && isNaN(e*s)){
            throw `one of arguments is not a Number we are accept only numbers { s: ${s}, e: ${e} }`;
        }
        var arr = [];
        var i   = s;
        if(e<s){
            i = e;
            e = s;
            s = i;
        }
        for(;i<=e;i++){
            arr.push(i);
        }
        return arr
    }

    static chars(s,e){
        var c = Rot.codes(s,e);
        return Rot.codeToChar(c);
    }

    static charToCode(a){
        return a.map((c)=>{
            return c.charCodeAt();
        });
    }

    static codeToChar(a){
        return a.map((c)=>{
            return String.fromCharCode(c);
        })
    }

    static create(){
        var args = [...arguments];
        var out  = [];
        args.forEach((d)=>{
            var e = d.end || d.e || d.End || d.END;
            var s = d.start || d.s || d.Start || d.START;
            var S,E;
            if(!(e && s)){
                throw `enter { d.end || d.e || d.End || d.END } { d.start || d.s || d.Start || d.START }`
            }
            if(typeof e === "number"){
                E = e
            }else
            if(typeof e === "string"){
                E = e.charCodeAt();
            }else{
                throw `we accept only Number & String<char> { e: ${e} }`;
            }
            if(typeof s === "number"){
                S = s
            }else
            if(typeof s === "string"){
                S = s.charCodeAt();
            }else{
                throw `we accept only Number & String<char> { s: ${s} }`;
            }
            Rot.codes(S,E).forEach((c)=>{
                if(out.indexOf(c) === -1){
                    out.push(c);
                }
            })
        })
        return Rot.codeToChar(out);
    }

    static load(p, e=".Rot"){
        var rgx = new RegExp(`.${e}$`);
        p = p.search(rgx) !== -1 ? p : `${p}${e}`;
        return JSON.parse(fs.readFileSync(p));
    }

    static addPackage(pack,names){
        if(typeof pack === "object" && pack.data && pack.rc && Array.isArray(pack.data) && Array.isArray(names)){
            var packname = names[0]
            var filename = `./lib/${packname}.Rot`;
            dataPackages.push(names);
            fs.writeFileSync(filename,JSON.stringify(pack));
            fs.writeFileSync("./lib/index.json",JSON.stringify(dataPackages));
            return true
        }
        return false
    }

    static resetPackages(){
        fs.readdirSync("lib").forEach((f)=>{
            fs.unlinkSync(`./lib/${f}`);
        })
        fs.writeFileSync("./lib/index.json","[]");
    }
}

Rot.dataPackages = dataPackages;
Rot.app = app;
// log("----------\n\n>>> ", stdoutFileName);

module.exports = Rot;