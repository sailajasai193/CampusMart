const mongoose=require("mongoose")
const Schema=mongoose.Schema

const SellerSchema = new Schema ({
    itemName:{
        type:String,
        required:true,
    },
    personName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    image: {
    type: String,
    required: true
    },
    soldStatus:{
        type:Boolean,
        default: false

    },
    sellerId:String,
});
const sellerModel=mongoose.model("Item",SellerSchema);
module.exports=sellerModel;
