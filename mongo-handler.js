

module.exports = {

  write : function (msg){


  var MongoClient = require('mongodb').MongoClient

  var currentDate = new Date();

    //For testing outside of a container
    //MongoClient.connect('mongodb://46.101.46.152:27017/hello', function(err, db) {

    //For docker where the link is alised as mongolink
    MongoClient.connect('mongodb://' + 'mongolink' + ':' + process.env.MONGOLINK_PORT_27017_TCP_PORT + '/hello', function(err, db) {
        if(err) throw err;
     
        var collection = db.collection('col');
        collection.insert({"message":msg, "date":currentDate}, function(err, docs) {
        	      // Locate all the entries using find 

            console.log("Written message %s to collection", msg);
          	collection.find({},{"_id":0}).limit(1).toArray(function(err, results) {
            	console.dir(results);
            	db.close();
        	});
        });
    });

  }

}