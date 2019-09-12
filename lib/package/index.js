const fs = require('fs');
const path = require('path');
const JData = require('../data');

class Jrot_package{
    constructor(p) {
        this.pack = require(p);
        if(fs.statSync(p).isDirectory()) 
            p = path.join(p, "index.json");
        this.path = p
        if(typeof this.pack === "object"){
            if(!this.pack.hasOwnProperty("packages")){
                this.pack.packages = {};
                this.save();
            }
            if(!this.pack.hasOwnProperty("alias")){
                this.pack.alias = {};
                this.save();
            }
        }
    }
    get(name){
        var {packages, alias} = this.pack;
        var pack = packages[name]
        if(!pack){
            pack = alias[name];
            if(pack) pack = packages[pack];
        }
        if(pack) return pack;
        return;
    }
    set(pack = {data: [[1,50], [60,99]], rc: 13, name: "test", alias: ["t1"]}, saveit= false){
        if(
            typeof pack === 'object' 
            && pack.data instanceof JData
            && pack.data.data.short.length !== 0
            && typeof pack.rc === 'number' 
            && typeof pack.name === 'string'
        ){
            this.pack.packages[pack.name] = {
                data: pack.data.data.short,
                rc: pack.rc
            }
            if(pack.alias){
                if(Array.isArray(pack.alias)){
                    pack.alias.forEach((name)=>{
                        if(typeof name === 'string') this.pack.alias[name] = pack.name;
                    })
                }else if(typeof pack.alias === 'string') this.pack.alias[pack.alias] = name;
            }
            if(saveit) this.save();
            return true
        }else if(Array.isArray(pack.data)){
            pack.data = new JData(...pack.data);
            return this.set(pack);
        }
        return false
    }
    save(){
        fs.writeFileSync(this.path, JSON.stringify(this.pack, '\n', '    '));
    }
}

// var p = new Jrot_package(`${__dirname}s`);

// console.log(p.set({
//     data: [],
//     rc: 7,
//     name: "zj",
//     alias: ["J","Z"]
// }))
// console.log(p.get("J"))
// console.dir(p, {depth: 20})

module.exports = Jrot_package