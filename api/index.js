//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require('axios');
const { conn, Country} = require('./src/db.js');
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ alter: true })

server.listen(PORT, async () => {
  console.log('Server raised in port: ' + PORT);
  // let filteredDb=[];
  // try{
  //   const response = await axios.get(`https://restcountries.com/v3/all`)
  //     if(response.data[0].status){
  //         response.data.forEach(element => {
  //         let {cca3, name, flags, region, capital, subregion, area, population} = element
  //         if(typeof(capital)==='object') capital=capital[0]
  //         filteredDb.push({
  //             ide:cca3,name: name.common,flagImage: flags[1],region,capital,subregion,area,population});
  //       })
  //       console.log(filteredDb[0]);
  //     }else throw Error('salio mal');

  //     await Country.bulkCreate(filteredDb);
      
  //   }catch(err){
  //       console.log(err);
  //   }
});

