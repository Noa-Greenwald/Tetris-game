document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleUser();
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handleUser();
});
0
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    console.log("Sign Up button clicked");
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    console.log("Sign In button clicked");
    container.classList.remove("sign-up-mode");
});
const allin = document.getElementsByTagName('input')
console.log(allin);
const namein = allin[0]
const passwordin = allin[1]
const nameup = allin[3]
const mailup = allin[4]
const passwordup = allin[5]
let playerName
let passwordnow
let flag = true;
let allUsers
function Player(nameup, mailup, passwordup) {
    this.nameup = nameup
    this.mailup = mailup
    this.passwordup = passwordup
}
function addUser(value) {
    let player1 = {
        "name": nameup.value,
        "mail": mailup.value,
        "password": passwordup.value
    };
    if(value == 'in')
    localStorage.setItem('currentUser', JSON.stringify(namein.value));
    else
    localStorage.setItem('currentUser', JSON.stringify(nameup.value));


    if (localStorage.getItem("users") == null) {
        allUsers = [];
    } else {
        allUsers = JSON.parse(localStorage.getItem("users"));
    }
    if (value == 'in') {
        debugger
        if (allUsers != null) {
            for (let index = 0; index < allUsers.length; index++) {
                playerName = allUsers[index].name;
                passwordnow = allUsers[index].password
                if (playerName == namein.value && passwordnow == passwordin.value) {
                    window.location.href = './tetris.html';
                    flag = false
                }

            }


               if(flag==true) 

                  alert('אנחנו לא מכירים אותך עדיין יש להירשם')
        }
    }

    else {
        allUsers.push(player1)
        alert('נרשמת בהצלחה!')
        window.location.href = './tetris.html'
        localStorage.setItem("users", JSON.stringify(allUsers))


    }

}