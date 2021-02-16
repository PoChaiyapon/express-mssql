module.exports = function(err, data, callback) {
  if(err) {
    callback(err);
    console.log('dbResponse Error: '+err);
  }else {
    callback(null, data);
  }
}