require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const rooms_routes = require("./routes/room");
const reqtemp_route = require('./routes/reqTemp');
const room = require("./models/room");
const reqtemp = require('./models/reqTemp');

app.use(cors());
const PORT = process.env.PORT || 5000;


app.get('/',(req, res)=>{
res.send({message : 'sorry we have no data for you'});
})

//middleware or to set router
app.use('/api/rooms',rooms_routes);
app.use('/api/reqtemp',reqtemp_route);
app.use(express.json());

//create room api
app.post('/api/rooms', async (req, res) => {
try{
    await connectDB(process.env.MONGODB_URI);
const rooms = await room.create(req.body);
res.status(200).json({status:true, data:rooms});
}catch(e){
res.status(500).json({status:false, message:e.message})
}
})

//get one product
app.get('/api/rooms/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await connectDB(process.env.MONGODB_URI);
    const rooms = await room.findById(id);
    res.status(200).json({status:true, data:rooms});
    }catch(e){
    res.status(500).json({status:false, message:e.message})
    }
    })

//update  product
app.put('/api/rooms/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await connectDB(process.env.MONGODB_URI);
    const rooms = await room.findByIdAndUpdate(id, req.body);
    if(!rooms){
        res.status(404).json({status:false, message:'room not found'})    
    }
     const updateRoom =  await room.findById(id);
    res.status(200).json({status:true, updateRoom});
    }catch(e){
    res.status(500).json({status:false, message:e.message})
    }
    })    

 //delet product
app.delete('/api/rooms/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await connectDB(process.env.MONGODB_URI);
    const rooms = await room.findByIdAndDelete(id);
    if(!rooms){
        res.status(404).json({status:false, message:'room not found'})    
    }
    res.status(200).json({status:true, message:'room has been deleted'});
    }catch(e){
    res.status(500).json({status:false, message:e.message})
    }
    })       

//Requested Temp
app.post('/api/reqtemp', async (req, res) => {
    try{
        await connectDB(process.env.MONGODB_URI);
    const reqtemps = await reqtemp.create(req.body);
    res.status(200).json({status:true, data:reqtemps});
    }catch(e){
    res.status(500).json({status:false, message:e.message})
    }
});

//Requested Temp fetch
app.get('/api/reqtemp', async (req, res) => {
    try{
        await connectDB(process.env.MONGODB_URI);
    const reqtemps = await reqtemp.find({});
    res.status(200).json({status:true, data:reqtemps});;
    }catch(e){
    res.status(500).json({status:false, message:e.message})
    }
});

//Requested Temp update
app.put('/api/reqtemp/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await connectDB(process.env.MONGODB_URI);
    const reqtemps = await reqtemp.findByIdAndUpdate(id, req.body);
    if(!reqtemps){
        res.status(404).json({status:false, message:'Requested Temperature not found'})    
    }
     const updatebuild =  await reqtemp.findById(id);
    res.status(200).json({status:true, updatebuild});
    }catch(e){
    res.status(500).json({status:false, message:e.message})
    }
});



const start = async () =>{
        try{
            await connectDB(process.env.MONGODB_URI);
            app.listen(PORT, () => {
                console.log(`server started on port ${PORT}`)
            })
        } catch(error) {
               console.log(error);
        }
};

start();
