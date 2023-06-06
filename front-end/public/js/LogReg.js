const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');
const smallPL = document.getElementById('passwordFail');


formLogin.password.addEventListener("change", function () {
    ValidPassword(this);
});

const ValidPassword = function (inputPassword) {
    if (!/^[A-Z]$/.test(inputPassword.value)) {

    }
};