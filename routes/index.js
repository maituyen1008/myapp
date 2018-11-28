var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:time',function(req,res){
  var date = req.params.time;
  var unix = null;
  var normal = null;
  if (+date >=0){
    unix= +date;
    normal = unixToNor(unix);
  }
  if(isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()){
    unix = norToUnix(date);
    normal= unixToNor(unix);
  }
  var dateObj={'unix': unix, 'utc': normal};
  res.json(dateObj);
})

function unixToNor(date){
  return moment(date, "MMMM D, YYYY").format("X");
}

function norToUnix(unix){
  return moment.unix(unix).format("MMMM D, YYYY");
}
module.exports = router;