(function(){
  var readline = require('readline');
  var spawn = require('child_process').spawn;

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  var buffer = '';
  var timer = null;
  
  rl.on('line', function (input) {
    buffer += input + "\n"
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){
      process.stderr.write('Got error:\r\n')
      spawn("growlnotify", ['-m', buffer])
    }, 500)
  })
})()
