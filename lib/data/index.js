class Jrot_data{
    constructor(...args) {
        this.data = Jrot_data.create(...args);
    }
    static create(...args){
        var output = [];
        output.short = [];
        args.forEach(([k,v])=>{
            if(typeof k === 'number' && typeof v === 'number') {
                var d = Jrot_data.createFA([k,v]);
                output.push(...d);
                output.short.push(...d.short);
            }
            if(typeof k === 'string' && typeof v === 'string') {
                var d = Jrot_data.createFC([k,v]);
                output.push(...d);
                output.short.push(...d.short);
            }
        })
        return output;
    }
    static createFC(...args){
        return Jrot_data.createFA(...args.map(([k,v])=> [k.charCodeAt(), v.charCodeAt()]));
    }
    static createFA(...args){
        var output = []
        output.short = [];
        args.forEach(([s,e])=>{
            if(typeof s === 'number' && typeof e === 'number'){
                var c = e - s > 0 ? 1:0;
                if(c) for(var i=s; i<=e; i++) output.push(i);
                if(!c) for(var i=e; i<=s; i++) output.unshift(i);
                output.short.push([s,e]);
            }
        })
        return output;
    }
}

// var d = new Jrot_data([1,3], [70,80], [90,80]);

// var dc = Jrot_data.createFC(["c", "a"])
// var da = Jrot_data.createFA([70,70])
// console.log({
//     da,dc,d
// }, d.data.short)

module.exports = Jrot_data;