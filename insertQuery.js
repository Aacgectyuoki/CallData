let obj = require("mongoose"); 
let fs =require("fs");
obj.Promise= global.Promise;  
let url = "mongodb://localhost:27017/meanstack";
fs.readFile('call_data.json', 'utf8', function(err, data){
    const mongooseDbOption ={   
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    let jsonData = data;

    obj.connect(url,mongooseDbOption); 
    let db = obj.connection;  
    db.on("error",(err)=>console.log(err));
    db.once("open",()=>{
    
        let callSchema = new obj.Schema({
            _id:Number,
            source:String,
            destination:String,
            sourceLocation:String,
            destinationLocation:String,
            callDuration:String,
            roaming:String,
            callCharge:String
        });

        let Product = obj.model("",callSchema,"callData");
    
        let parsedJSON = JSON.parse(jsonData); 
 
        for (item of parsedJSON){
        let p1 = new Product({
            _id:item._id,
            source:item.source,
            destination:item.destination,
            sourceLocation:item.sourceLocation,
            destinationLocation:item.destinationLocation,
            callDuration:item.callDuration,
            roaming:item.roaming,
            callCharge:item.callCharge
        });
        p1.save((err,result)=>{
            if(!err){
                console.log("record inserted successfully"+result)
            }else {
                console.log(err);
            }
            obj.disconnect();      
        })
    }
});
})
