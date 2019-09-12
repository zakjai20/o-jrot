const JCore = require('./core');
const JPackage = require('./package');
const JData = require('./data');

const path = require('path');

class Jrot extends JCore{
    constructor(o={}, packagePath) {
        super({data: new JData([1,2]), rc: o.rc});
        var ExternalPackage;
        try {ExternalPackage = new JPackage(packagePath);}
        catch {ExternalPackage = null;}

        if(Array.isArray(o.data) && Array.isArray(o.data[0])) o.data = new JData(...o.data);
        if(typeof o.data === "string"){
            if(ExternalPackage instanceof JPackage){
                var pack = ExternalPackage.get(o.data);
                if(pack) o = {data: new JData(...pack.data), rc: pack.rc};
                else {
                    var pack = Jrot.LocalPackage.get(o.data);
                    if(pack) o = {data: new JData(...pack.data), rc: pack.rc};
                    else throw new Error(`package not found (${o.data})`);
                }
            }else{
                var pack = Jrot.LocalPackage.get(o.data);
                if(pack) o = {data: new JData(...pack.data), rc: pack.rc};
                else throw new Error(`package not found (${o.data})`);
            }
        }
        if(o.data instanceof JData){
            this.data = o.data;
            this.ExternalPackage = ExternalPackage;
        }
    }
    get(){
        return {data: this.data.short, rc: this.rc}
    }
}




// var r = new Jrot({
//     data: "name",
//     rc: 7
// }, path.join(__dirname, "index.json"))

// console.dir({
//     Jrot,
//     r
// }, {depth: 20})


module.exports = Jrot

module.exports.JCore    = JCore;
module.exports.JPackage = JPackage;
module.exports.JData    = JData;

module.exports.LocalPackage = new JPackage(path.join(__dirname, "packages"));