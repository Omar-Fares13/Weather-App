console.log('Starting App');


setTimeout(() => {console.log('inside callback')} , 1000);

setTimeout(() => {console.log('second set timeout')} , 0);


console.log('Finishing App');

