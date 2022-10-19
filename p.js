const seconds = new Date().getTime() / 1000;

setTimeout(() => {
  // prints out "2", meaning that the callback is not called immediately after 500 milliseconds.
  console.log(`Ran after ${new Date().getTime() / 1000 - seconds} seconds`);
}, 1000)

while (true) {
  if (new Date().getTime() / 1000 - seconds >= 4) {
    console.log("aaaaaaaaaaaaaaa, looped for 1 seconds");
    break;
  }
}