if(localStorage.getItem('loggedInUser')){
    location.href = '../shop/index.html';
    alert('You are already Logged IN');
}
else{

    const signupbtn = document.getElementById("btnSignup");
    const firstName = document.getElementById('iFname');
const lastname = document.getElementById('iLname');
const email = document.getElementById('iEmail');
const password = document.getElementById('iPassword');
const cpassword = document.getElementById('icPassword');

function checkIfUserExist(email){
    let users = JSON.parse(localStorage.getItem('users'));
    const obj = users.find(userObj=>{
        return userObj.email === email;
    });
    if(obj){
        return true;
    }else{
        return false;
    }
}
function generateToken() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}



function saveUser(fname,lname,mail,pwd){
    const token = generateToken();
    //   console.log(token); 
    let userObj = {
        firstName:fname,
        lastName:lname,
        email:mail,
        password:pwd,
        token:token,
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if(users === null){
        users = [];
    }
    users.push(userObj);
    localStorage.setItem('users',JSON.stringify(users));
    
    localStorage.setItem('loggedInUser',token);
    firstName.value = '';
    lastname.value = '';
    email.value = '';
    password.value = '';
    cpassword.value = '';
    alert('Sign up successful');
    window.location.href = '/profile/index.html'; 
}
signupbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(firstName.value.trim() === '' || 
    lastname.value.trim() === '' || 
    email.value.trim() === '' || 
    password.value.trim() === '' )
    {
        alert("All Fields Are Mandatory!");
    }else{
        if(password.value.trim() !== cpassword.value.trim()){
            alert('Password Not Matching!');
            password.value = '';
            cpassword.value = '';
        }else{
            if(localStorage.getItem('users')){
                if(checkIfUserExist(email.value)){
                    
                    alert('Email is linked with other account!');
                }else{
                    saveUser(firstName.value,lastname.value,email.value,password.value);
                }
            }else{
                saveUser(firstName.value, lastname.value, email.value, password.value);
            }
        }
    }
});
}