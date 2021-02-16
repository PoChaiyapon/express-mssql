const mypool = require('./connect');
const dbResponse = require('./dbResponse');

async function getQuerySQL (qry, parameters, isMultiset, callback) {
  await mypool.poolConnect;
  try{
    //request object
    const request = mypool.pool.request();

    //add parameter
    parameters.forEach(function(p) {
      request.input(p.name, p.type, p.value);
    });

    //declare dataset
    var dataset = [];

    //request
    await request.query(qry, function(err, result) {
      if(err) {
        callback(err,null);
        // dbResponse(err,result,callback);
      }else {
        if(isMultiset === false) {
          dataset = result.recordset;
        }else {
          dataset = result.recordsets;
        }
        //callback
        // console.dir(result);
        callback(err,dataset);
        // dbResponse(err, dataset, callback);
      }
    })
  }
  catch(err) {
    console.log('SQL Error:'+ err)
    callback(err);
  }
}

module.exports = {
  getQuery: getQuerySQL
}