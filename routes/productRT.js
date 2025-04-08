const express=require('express');
const router=express.Router();
const Product=require('../models/productModel')

//create Route to Store Product
router.post('/create',async (req,res)=>{
   try{
    const {name,price,description,ratings}=req.body;

    const newProduct= new Product({
        name,
        price,
        description,
        ratings
    });
    await newProduct.save();
    res.status(200).json({code:1,message:"successfully added Product",product:newProduct})
   }catch(error){
    res.status(500).json({ code:0,message:"Error storing new product",error:error.message})
   }
})

//get route to fetch all Products 
router.get('/getAll',async(req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).json({code:1,products})
    }catch(error){
        res.status(500).json({code:0,message:"Error in fetching products",error:error.message})
    }
})


//get route to fetch product by id
router.get('/getProduct/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const getproduct=await Product.findById(id);
    res.status(200).json({code:1,getproduct})
}catch(error){
    res.status(500).json({code:0,message:"Error in fetching product by id",error:error.message})
}
})

// put route to update product by id
router.put('/updateProduct/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const {name,price,description,ratings}=req.body;
    if(!name || !price || !ratings){
        res.status(400).json({code:0,message:"name, price and ratings are required for update"})
    }
    const updatedProduct= await Product.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json({code:1,updatedProduct})
}catch(error){
    res.status(500).json({code:0,message:"error in Updating Product",error:error.message})
}
})

//delete route to remove all product
router.delete('/deleteAll',async(req,res)=>{
    try{
        const deleteAllProduct= await Product.deleteMany();
        res.status(200).json({code:1,deleteAllProduct})
    }catch(error){
        res.status(500).json({code:0,message:"error in deleting all product",error:error.message})
    }
})

//delete route to delete product by id 
router.delete('/deleteProduct/:id',async(req,res)=>{
    try{
    const {id}=req.params;
    const deletedProduct=await Product.findByIdAndDelete(id);
    res.status(200).json({code:1,deletedProduct})
}catch(error){
    res.status(500).json({code:0,message:"Error in delete product",error:error.message})

}
})

module.exports=router;