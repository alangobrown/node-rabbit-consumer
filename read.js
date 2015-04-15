


var q = 'hello';
 
function bail(err) {
  console.error(err);
  process.exit(1);
}


// Consumer 
function consumer(conn) {
  var ok = conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}

require('amqplib/callback_api')
  .connect('amqp://guest:guest@46.101.46.152:5672', function(err, conn) {
    if (err != null) bail(err);
    consumer(conn);
      
  });