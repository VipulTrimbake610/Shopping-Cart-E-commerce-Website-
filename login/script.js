if(localStorage.getItem('loggedInUser')){
    location.href = '../shop/index.html';
    alert('You are already Logged IN');
}else{
    const email = document.getElementById('iEmail');
    const password = document.getElementById('iPassword');
    const btnLogin = document.getElementById('btnLogin');
    
    btnLogin.addEventListener('click',(e)=>{
        e.preventDefault();
    if(email.value.trim() === '' || password.value.trim() === ''){
        alert("Fields are Mandatory");
    }
    else{
        let users = JSON.parse(localStorage.getItem('users'));
        if(users){
            let currentUser = users.find(user=>{
                return user.email === email.value.trim();
            });
            if(currentUser){
                // console.log(currentUser);
                if(password.value.trim() === currentUser.password){
                    localStorage.setItem('loggedInUser',currentUser.token);
                    alert("Logged In Successfully!");
                    location.href = '../profile/index.html';
                }else{
                    alert("Incorrect Password!");
                }
            }else{
                alert("You have not signed up yet");
            }
        }else{
            alert("You have not signed up yet");
        }
        
    }
});

}