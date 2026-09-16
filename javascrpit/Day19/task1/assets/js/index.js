function greet(callback) {
    callback();
}

greet(() => {
    console.log("Hello");
});

///promises syntax
let promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Success");
    } else {
        reject("Failed");
    }

});

promise.then((result) => {
    console.log(result);
});