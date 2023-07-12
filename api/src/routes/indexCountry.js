const { Router } = require('express');
const getCountires = require('../controllers/getCountires');
const getCountriesById = require('../controllers/getCountriesById');
const getCountriesByName= require('../controllers/getCountriesByName');
const getCoAscendentByName= require('../controllers/getCoAscendentByName');
const getCoDescendentByName= require('../controllers/getCoDescendentByName');
const getCoDescendentByPob= require('../controllers/getCoDescendentByPob');
const getCoAscendentByPob= require('../controllers/getCoAscendentByPob');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const routesCountry = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


routesCountry.get('/',async (req,res)=>{
    try {
        const {name,ascByName,dscByName,ascByPob,dscByPob}=req.query
        if(ascByName){
            let respuesta = await getCoAscendentByName()
            res.status(200).json(respuesta)
            return
        }
        if(dscByName){
            let respuesta = await getCoDescendentByName()
            res.status(200).json(respuesta)
            return
        }
        if(ascByPob){
            let respuesta = await getCoAscendentByPob()
            res.status(200).json(respuesta)
            return
        }
        if(dscByPob){
            let respuesta = await getCoDescendentByPob()
            res.status(200).json(respuesta)
            return
        }
        if(!name){
            let respuesta = await getCountires()
            res.status(200).json(respuesta)
            return
        }
        let respuesta2 = await getCountriesByName(name);
        res.status(200).json(respuesta2)
        

    } catch (error) {
        return res.status(404).json({error: error.message})  
    }
});

routesCountry.get('/:idPais',async (req,res)=>{
    try {
        let {idPais} = req.params
        if(!idPais) {
            throw Error('Es necesario que introduzca un id valido')
        }
        const respuesta = await getCountriesById(idPais)
        res.status(200).json(respuesta)

    } catch (error) {
        return res.status(404).json({error: error.message})  
    }
});



module.exports = routesCountry;
