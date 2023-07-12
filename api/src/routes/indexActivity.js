const { Router } = require('express');
const createActivity = require('../controllers/createActivity');
const getActivities = require('../controllers/getActivities');
// const getRelation = require('../controllers/getRelation');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const routesActivity = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


routesActivity.get('/',async (req,res)=>{
    try {
        let respuesta = await getActivities()
        res.status(201).json(respuesta)
        
    } catch (error) {
        return res.status(404).json({error: error.message})  
    }
});

routesActivity.post('/',async (req,res)=>{
    try {
        const {id, name, dificulty, duration, season}=req.body;
        // if(!id || !name || !dificulty || !duration || !season ){
        //     throw Error('datos incompletos')
        // }
        let data = {id, name, dificulty, duration, season}
        let respuesta = await createActivity(data)
        res.status(201).json(respuesta)
        
    } catch (error) {
        return res.status(404).json({error: error.message})  
    }
});

// routesActivity.get('/relation',async (req,res)=>{
//     try {
//         let respuesta = await getRelation()
//         res.status(201).json(respuesta)
        
//     } catch (error) {
//         return res.status(404).json({error: error.message})  
//     }
// });


module.exports = routesActivity;
