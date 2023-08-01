// Write your script here
if(localStorage.getItem('loggedInUser')){
    const users = JSON.parse(localStorage.getItem('users'));
    const token = localStorage.getItem('loggedInUser');
    console.log(users,token);
    const currentUser = users.find(user=>{
        return user.token === token;
    });
    
    const fname = document.getElementById('ifName');
    const lname = document.getElementById('ilName');
    const ioPassword = document.getElementById('ioPassword');
    const inPassword = document.getElementById('inPassword');
    const icPassword = document.getElementById('icPassword');
    const btnSaveinfo = document.getElementById('btnSaveinfo');
    
    console.log(currentUser);
    fname.value = currentUser.firstName;
    lname.value = currentUser.lastName;
    
    const btncPassword = document.getElementById('btncPassword');
    const btnLogout = document.getElementById('btnLogout'); 
    
    btnSaveinfo.addEventListener('click',(e)=>{
        // currentUser.firstName = fname.value;
        // currentUser.lastName = lname.value;
        
        users.forEach((e)=>{
            if(e.token === token){
                e.firstName = fname.value;
                e.lastName = lname.value;
            }
        })
        localStorage.setItem('users',JSON.stringify(users));
        alert("Your Name Has Been Changed!");
    });

    btncPassword.addEventListener('click',(e)=>{
        // console.log(currentUser.password);
        if(ioPassword.value == currentUser.password){
            if((inPassword.value === icPassword.value)){
                // console.log("Hello");
                users.forEach((e)=>{
                    if(e.token === token){
                      e.password = inPassword.value;
                        // console.log("hello5");
                        // location.reload();
                    }
                });
                localStorage.setItem('users',JSON.stringify(users));
                alert('Your Password Has Been Changed!');
            }else{
                alert('New Password and Confirm Password Not Matching!');
            }
        }else{
            alert('Please Provide Correct Old Password!');
        }
    });

    btnLogout.addEventListener('click',()=>{
        localStorage.removeItem('loggedInUser');
        alert("Logged Out Successully!");
        location.href = '../index.html';   
    })
}else{
    location.href = '../login/index.html'
}

