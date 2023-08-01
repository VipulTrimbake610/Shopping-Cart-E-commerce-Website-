// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

if(localStorage.getItem('loggedInUser')){
    location.href = '/shop/index.html';
}else{
    const login = document.getElementById('btnLogin');
    const signup = document.getElementById('btnSignup');
    
    login.addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/login/index.html';
    });
    signup.addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/signup/index.html';
    });
}