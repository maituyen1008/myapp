var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:time', function(req, res){
  var date = req.params.time;
  var unix = null;
  var natural = null;
  
  if (+date >=0){
    unix = +date;
    natural = unixToNa(unix);
  }
  else if(isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()){
    unix = naToUnix(date);
    natural= unixToNa(unix);
  }
  var dateObj = {'unix': unix, 'utc': natural};
  res.json(dateObj);
 })

function naToUnix(date){
  return moment(date, "MMMM D, YYYY").format("X");
}

function unixToNa(unix){
  return moment.unix(unix).format("MMMM D, YYYY");
}
module.exports = router;