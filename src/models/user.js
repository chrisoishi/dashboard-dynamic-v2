export default class User{
    static fromJSON(json){
        if(Array.isArray(json)){
            var list = [];
            for(var i of json){
                list.push(Event.fromJSON(i));
            }
            return list;
        }
        else return new User({id:json.id,data:json})
    } 

    constructor({id="",data={}} = {}){
        this.id = id;
        this.name = data.hasOwnProperty("name")?data.name:"";
        this.token = data.hasOwnProperty("token")?data.token:"";
    }
    object() {
        var obj = {}
        for (var key of Object.getOwnPropertyNames(this)) {
            if (key.indexOf("_") == -1) obj[key] = this[key];
        }
        console.log(obj);
        return obj;
    }




}