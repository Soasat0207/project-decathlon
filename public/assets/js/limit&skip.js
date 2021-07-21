
function limit(c){
    return this.filter((x,i)=>{
        if(i<=(c-1)){return true}
    })
}
Array.prototype.limit= limit;
function skip(c){
    return this.filter((x,i)=>{
    if(i>(c-1)){return true}
    })
}
Array.prototype.skip = skip;