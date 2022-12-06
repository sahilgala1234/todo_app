const mongoose=require('mongoose');

const Todoschema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
   description:{
        type:String,
        required: true,
          },
    status:{
        type:String,
        required: true,
    }

});

module.exports=new mongoose.model("Todo",Todoschema);