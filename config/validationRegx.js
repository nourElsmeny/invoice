exports.validationRgex = {
    fullName: /^[_ a-zA-Z]{3,36}$/,
    email: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]*\.([a-zA-Z]{2,4})$/,
    mobile: /^[0-9]{7,15}/,
    amount: /^[0-9]{0,5}$|^[0-9]{0,5}[.][0-9]{0,2}$/,
    duDate: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]]))$/,
    pagNum: /^[0-9]{1,100}$/,
}