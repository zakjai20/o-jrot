const JData = require('../data');
class Jrot_core{
    constructor(o) {
        this.data = o.d || o.data || o.Data;
        this.rc = o.rc || o.rcount || o.Rcount;
        const {data, rc} = this

        if(!data instanceof JData)
            throw new TypeError(`data must be instanceof of Jrot_data`);
        if(!typeof rc === "number")
            throw new TypeError(`rc must be typeof number not typeof ${typeof rc}`);

        this.encode = Jrot_core.encode;
        this.decode = Jrot_core.decode;
    }
    static encode(input){
        var {data, rc} = this,
            {length}   = data;
        var output = "";
        for(var i of input){
            var indx = data.indexOf(i);
            if(indx !== -1){
                var ni = (indx + rc) % length;
                output += data[ni];
            }else{
                output += i;
            }
        }
        return output
    }
    static decode(input){
        var {data, rc} = this,
            {length}   = data;
        var output = "";
        for(var i of input){
            var indx = data.indexOf(i);
            if(indx !== -1){
                var ni = (indx - rc) % length;
                ni = ni <0 ? ni+length : ni;
                output += data[ni];
            }else{
                output += i;
            }
        }
        return output
    }
}

module.exports = Jrot_core;