
const produtc = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

let cart = [];
if(localStorage.getItem('cartItems')){
  cart = JSON.parse(localStorage.getItem('cartItems'));
}

const mensClothing = document.querySelector("#mensClothing .items");
const womensClothing = document.querySelector("#womensClothing .items");
const jewellery = document.querySelector("#jewellery .items");
const electronics = document.querySelector("#electronics .items");

const mclothing = document.getElementById("mensClothing");
const wclothing = document.getElementById("womensClothing");
const jwlry = document.getElementById("jewellery");
const elctron = document.getElementById("electronics");
let filter1 = document.querySelectorAll('.filter');

filter1.forEach((e)=>{
    e.addEventListener('click',(event)=>{
      for(let i=0;i<filter1.length;i++){
        filter1[i].className = "filter";
      }
        event.target.className = "filter active";

        if(event.target.innerText === "Mens"){
          mclothing.style.display = 'block';
          wclothing.style.display = 'none';
          jwlry.style.display = 'none';
          elctron.style.display = 'none';
        }
        if(event.target.innerText === "Womens"){
          mclothing.style.display = 'none';
          wclothing.style.display = 'block';
          jwlry.style.display = 'none';
          elctron.style.display = 'none';
        }
        if(event.target.innerText === "Jewellery"){
          mclothing.style.display = 'none';
          wclothing.style.display = 'none';
          jwlry.style.display = 'block';
          elctron.style.display = 'none';
        }
        if(event.target.innerText === "Electronics"){
          mclothing.style.display = 'none';
          wclothing.style.display = 'none';
          jwlry.style.display = 'none';
          elctron.style.display = 'block';
        }
        if(event.target.innerText === "All"){
          mclothing.style.display = 'block';
          wclothing.style.display = 'block';
          jwlry.style.display = 'block';
          elctron.style.display = 'block';
        }
    })
});



async function getData(){
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    let data1=data;

    const iSearch = document.getElementById('iSearch');
    const iRange = document.getElementById('iRange');
    const i025 = document.getElementById('0-25');
    const i2550 = document.getElementById('25-50'); 
    const i50100 = document.getElementById('50-100');
    const i100on = document.getElementById('100on');

    showData(data);
    

    // My Search Function 
    iSearch.addEventListener('keyup',(e)=>{

      let searchedValue = e.target.value;

      data1 = data.filter((e)=>{
          if(e.title.includes(searchedValue)){
              return true;
          }  
      });
      showData(data1);

    });

    iRange.addEventListener('change',(e)=>{
      let rate = e.target.value;
      data1 = data.filter((e)=>{
          let value = Math.round(e.rating.rate);
          if(value == rate){
              return true;
          }else{
              return false;
          }
      });
      showData(data1);
    });

    let arr = [];
    let d1,d2,d3,d4;
    // console.log(arr);
    i025.addEventListener('click',(e)=>{
      let value = e.target.checked;
      if(value === true){
          d1 = data.filter((e)=>{
            if(0<=e.price && e.price<=25){
                return true;
            }  
        });
        arr.push(...d1);
        showData(arr);
      }else{
        d1.forEach((e)=>{
          let index = arr.indexOf(e);
          arr.splice(index,1);
        })
        if(arr.length === 0){
          showData(data);
        }else{
          showData(arr);
        }
        // if(arr){
        //   arr.remove(...data1);
        // }
      } 
    });
    i2550.addEventListener('click',(e)=>{
      let value = e.target.checked;
      if(value === true){
          d2 = data.filter((e)=>{
            if(25<e.price && e.price<=50){
                return true;
            }  
        });
        arr.push(...d2);
        showData(arr);
      }else{
        d2.forEach((e)=>{
          let index = arr.indexOf(e);
          arr.splice(index,1);
        })
        if(arr.length === 0){
          showData(data);
        }else{
          showData(arr);
        }
      }
    
    });
    i50100.addEventListener('click',(e)=>{
      let value = e.target.checked;
      if(value === true){
          d3 = data.filter((e)=>{
            if(50<e.price && e.price<=100){
                return true;
            }  
        });
        arr.push(...d3);
        showData(arr);
      }else{
        d3.forEach((e)=>{
          let index = arr.indexOf(e);
          arr.splice(index,1);
        })
        if(arr.length === 0){
          showData(data);
        }else{
          showData(arr);
        }
      }
    });
    i100on.addEventListener('click',(e)=>{
      let value = e.target.checked;
      if(value === true){
          d4 = data.filter((e)=>{
            if(100<e.price){
                return true;
            }  
        });
        arr.push(...d4);
        showData(arr);
      }else{
        d4.forEach((e)=>{
          let index = arr.indexOf(e);
          arr.splice(index,1);
        })
        if(arr.length === 0){
          showData(data);
        }else{
          showData(arr);
        }
      }
    
    });

    function showData(data){
      mensClothing.innerHTML = '';
      womensClothing.innerHTML = '';
      jewellery.innerHTML = '';
      electronics.innerHTML = '';

      data.forEach((e) => {
        if(e.category === "men\'s clothing"){
              let item = document.createElement("div");
              item.className = `item ${e.id}`;
              item.innerHTML = ` <img src="${e.image}" alt="Item" />
              <div class="info">
                <div class="row">
                  <div class="price">$${e.price}</div>
                  <div class="sized">S,M,L</div>
                </div>
                <div class="colors">
                  Colors:
                  <div class="row">
                    <div class="circle" style="background-color: #000"></div>
                    <div class="circle" style="background-color: #4938af"></div>
                    <div class="circle" style="background-color: #203d3e"></div>
                  </div>
                </div>
                
              <div class="row" style="display:flex;align-items:center;justify-content:left;">Rating: ${e.rating.rate}<span style="color:#f7b20af5" class="star material-symbols-outlined">star_rate</span></div>
              </div>
              <button id="addBtn" class="addBtn">Add to Cart</button>`
             mensClothing.appendChild(item);
          }else if(e.category === "women\'s clothing"){
            let item = document.createElement("div");
            item.className = `item ${e.id}`;
            item.innerHTML = ` <img src="${e.image}" alt="Item" />
            <div class="info">
              <div class="row">
                <div class="price">$${e.price}</div>
                <div class="sized">S,M,L</div>
              </div>
              <div class="colors">
                Colors:
                <div class="row">
                  <div class="circle" style="background-color: #000"></div>
                  <div class="circle" style="background-color: #4938af"></div>
                  <div class="circle" style="background-color: #203d3e"></div>
                </div>
              </div>
              
              <div class="row" style="display:flex;align-items:center;justify-content:left;">Rating: ${e.rating.rate}<span style="color:#f7b20af5" class="star material-symbols-outlined">star_rate</span></div>
            </div>
            <button id="addBtn" class="addBtn">Add to Cart</button>`
           womensClothing.appendChild(item);
          }else if(e.category === "jewelery"){
            let item = document.createElement("div");
            item.className = `item ${e.id}`;
            item.innerHTML = ` <img src="${e.image}" alt="Item" />
            <div class="info">
              <div class="row">
                <div class="price">$${e.price}</div>
                <div class="sized">S,M,L</div>
              </div>
              <div class="colors">
                Colors:
                <div class="row">
                  <div class="circle" style="background-color: #000"></div>
                  <div class="circle" style="background-color: #4938af"></div>
                  <div class="circle" style="background-color: #203d3e"></div>
                </div>
              </div>
              <div class="row" style="display:flex;align-items:center;justify-content:left;">Rating: ${e.rating.rate}<span style="color:#f7b20af5" class="star material-symbols-outlined">star_rate</span></div>
            </div>
            <button id="addBtn" class="addBtn">Add to Cart</button>`
           jewellery.appendChild(item);
          }else if(e.category === "electronics"){
            let item = document.createElement("div");
            item.className = `item ${e.id}`;
            item.innerHTML = ` <img src="${e.image}" alt="Item" />
            <div class="info">
              <div class="row">
                <div class="price">$${e.price}</div>
                <div class="sized">S,M,L</div>
              </div>
              <div class="colors">
                Colors:
                <div class="row">
                  <div class="circle" style="background-color: #000"></div>
                  <div class="circle" style="background-color: #4938af"></div>
                  <div class="circle" style="background-color: #203d3e"></div>
                </div>
              </div>
              <div class="row" style="display:flex;align-items:center;justify-content:left;">Rating: ${e.rating.rate}<span style="color:#f7b20af5" class="star material-symbols-outlined">star_rate</span></div>
            </div>
            <button id="addBtn" class="addBtn">Add to Cart</button>`
           electronics.appendChild(item);
          }
      });
    }


    // My Add to Cart Functionality
    let addBtns = document.querySelectorAll('.items .addBtn');
    // console.log(addBtns);
    addBtns.forEach((e)=>{
      e.addEventListener('click',(event)=>{
        let id = event.target.parentElement.classList[1];
          let addedUser = data.find(user=>{
            return  user.id == id;
          });
          cart.push(addedUser);
          localStorage.setItem('cartItems',JSON.stringify(cart));
        })
    });

}

getData();

