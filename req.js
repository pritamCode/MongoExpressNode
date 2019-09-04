
/* // callBack function
console.log('before');
test((user)=>{
    console.log('user',user);
});

function test(callback) {
    setTimeout(() => {
        callback({'fname':'abc','lname':'efg'});
    }, 2000);
}
console.log('after');
*/

var promises = new Promise((res,rej)=>{
    setTimeout(() => {
        res(console.log('promise resolve'));
    }, 2000);
});

console.log(promises);

