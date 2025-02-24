var getUser = (id , callback) => {
    var user = {
        id: id,
        name: 'Omar'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};



getUser(45, (userObj) => {
    console.log(userObj);
});

