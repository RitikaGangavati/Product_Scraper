const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    ratings:{
        type:String,
        required:true
    }
},{timestamps:true})

const Product=mongoose.model('Product',productSchema,'Product')
module.exports=Product;