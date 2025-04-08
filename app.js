const express=require('express');
const app =express();
require('./db/connect')
const scrapeProduct=require('./scraper/scrapeProduct')
const cron=require('node-cron');
const productRT=require('./routes/productRT')
app.use(express.json());
app.use(express.urlencoded({extended:true}))



cron.schedule('0 * * * *', () => {
    console.log('Running scheduled scraping...');
    scrapeProduct();
  });

app.use('/products',productRT)



app.get('/',(req,res)=>{
    res.send("server....")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")  
})