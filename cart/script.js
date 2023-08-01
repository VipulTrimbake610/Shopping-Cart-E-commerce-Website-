if(localStorage.getItem('loggedInUser')){

    if(localStorage.getItem('cartItems')!=null && JSON.parse(localStorage.getItem('cartItems')).length !== 0){
        
        const cProducts = document.getElementById('cProducts');
        const checkOut = document.getElementById('checkOut');
        const checkOutItems = document.querySelector('#checkOut .cItems');
        
        let cartitems = JSON.parse(localStorage.getItem('cartItems'));
        // console.log(cartitems);
        let total=0;
        cartitems.forEach((e)=>{
            let item = document.createElement('div');
            item.className = `item ${e.id}`;
            item.innerHTML = `<img src="${e.image}" alt="">
            <div class="title">${e.title}</div>
            <div class="price">$${e.price}</div>
            <button class="btnRemove" id="${e.id}">Remove From Cart</button>`;
            cProducts.appendChild(item);
            
            
            let btnRemove = document.getElementById(e.id);
            btnRemove.addEventListener('click',(e)=>{
                cartitems.forEach((elem,i)=>{
                    if(e.target.id == elem.id){
                        cartitems.splice(i,1);
                    localStorage.setItem('cartItems',JSON.stringify(cartitems));
                    alert('Item has been Removed!!!');
                    location.reload();
                }
            })
            // let index = cartitems.indexOf(e.target.id);
            // console.log(index);
            // console.log(e.target.id);
            // cartitems.splice(e.target.id);
        })
        
        let citem = document.createElement('div');
        citem.className = `citem ${e.id}`
        citem.innerHTML = `
        <div class="cTitle">${e.title}</div>
        <div class="cPrice">$${e.price}</div>`;
        checkOutItems.appendChild(citem);
        
        total += e.price;
    });
    
    let totalDiv = document.createElement("section");
    totalDiv.setAttribute('id','total');
    totalDiv.setAttribute('class','total');
    totalDiv.innerHTML = `<div class="tTitle">Total</div>
    <div class="tPrice">$${total.toFixed(2)}</div>`;
    checkOut.appendChild(totalDiv);
    
    let btn = document.createElement('button');
    btn.setAttribute('id','btnCheckOut');
    btn.innerText = 'Click to Checkout';
    checkOut.appendChild(btn);
    
    btn.addEventListener('click',(e)=>{
        const token = localStorage.getItem('loggedInUser');
        const users = JSON.parse(localStorage.getItem('users'));
        const currentUser = users.find((user)=>{
            return user.token === token;
        });
        console.log(total);
        var options = {
            key: "rzp_test_z7rHwFCUZtaFki", // Enter the Key ID generated from the Dashboard
            amount: parseInt(total)*100*82.25, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "MyShop Checkout",
            description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                // This function will be called after a successful payment
                if(response.razorpay_payment_id){
                    
                    localStorage.removeItem('cartItems');
                    alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                    location.href = '../index.html';
                }else{
                    alert('Payment Failed!');
                }
              },
              prefill: {
                name: 'John Doe',
                email: 'john@example.com',
                contact: '9876543210',
              },
            theme: {
              color: "red",
            },
            image:
              "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
          };
        
          var rzpy1 = new Razorpay(options);
          rzpy1.open();
          // clear mycart - localStorage
    })
    
}else{
    let main = document.getElementsByTagName('main')[0];
    main.innerText = 'Cart is Empty!';
    main.style.fontSize = '30px';
    main.style.fontWeight = 'bold';
    main.style.textAlign = 'Center'
}
}else{
    location.href = '../login/index.html';
}