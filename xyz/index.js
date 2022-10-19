var http = require("http")
// var events  = require("events")
http.createServer(function(req,res){
    res.write("Hello Amisha Radadiya.................");
    res.end();
    log(fib(8));
}).listen(5555)

// console.log("This is the first statement");
   
// setTimeout(function(){
//     console.log("This is the second statement");
// }, 5000);
   
// console.log("This is the third statement");
var fib = function(n) {
    if (n === 1) {
      return [0, 1];
    } else {
      var arr = fib(n - 1);
      arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
      return arr;
    }
  };
  
  console.log(fib(8));