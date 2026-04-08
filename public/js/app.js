const productbox=document.getElementById("productgrid");
const cartcount2=document.getElementById("cartcount2");
const cartlist=document.getElementById("cartlist");
const contactform=document.getElementById("contactform");
const contactstatus=document.getElementById("contactstatus");

let cart=[];

function fallbackimg(name) {
  const safe=name||"product";
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'>
    <rect width='100%' height='100%' fill='#ececec'/>
    <text x='50%' y='45%' text-anchor='middle' dominant-baseline='middle' fill='#333' font-size='36' font-family='Arial'>image not available</text>
    <text x='50%' y='60%' text-anchor='middle' dominant-baseline='middle' fill='#222' font-size='34' font-family='Arial'>${safe}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}

function money(p) {
  return "Rs. "+p;
}

function titlecase(text) {
  if(!text) return "";
  return text.replace(/\w\S*/g, function (w) {
    return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
  });
}

function updatecart() {
  const cartcount=document.getElementById("cartcount");
  if(cartcount) cartcount.innerText=cart.length;
  if(cartcount2) cartcount2.innerText=cart.length;

  if(!cartlist) return;
  cartlist.innerHTML="";
  for (let i=0; i<cart.length; i++) {
    const li=document.createElement("li");
    li.innerText=titlecase(cart[i].name)+" - "+money(cart[i].price);
    cartlist.appendChild(li);
  }
}

function addtocart(item) {
  cart.push(item);
  updatecart();
}

function createproductcard(item) {
  const onecard=document.createElement("div");
  onecard.className="product-card";

  const imgsrc=item.image||fallbackimg(item.name);

  onecard.innerHTML = `
    <img src="${imgsrc}" alt="${item.name}">
    <div class="product-info">
      <h3>${titlecase(item.name)}</h3>
      <p>${money(item.price)}</p>
      <button class="add-btn">Add to Cart</button>
    </div>
  `;

  const img=onecard.querySelector("img");
  img.addEventListener("error", function () {
    img.src=fallbackimg(item.name);
  });

  const btn=onecard.querySelector(".add-btn");
  btn.addEventListener("click", function () {
    addtocart(item);
  });

  return onecard;
}

function showproducts(arr) {
  if(!productbox) return;
  productbox.innerHTML="";

  for (let i=0; i<arr.length; i++) {
    const card=createproductcard(arr[i]);
    productbox.appendChild(card);
  }
}

async function loadproducts() {
  if(!productbox) return;
  let shareddata=[];

  try {
    const shared=await fetch("/data/products.json");
    shareddata=await shared.json();

    if (Array.isArray(shareddata)&&shareddata.length>0) {
      showproducts(shareddata);
    }
  } catch (e) {
    console.log("shared data load failed");
  }

  try {
    const ctrl=new AbortController();
    const timeoutid=setTimeout(function () {
      ctrl.abort();
    }, 1500);

    const res=await fetch("/api/products", { signal: ctrl.signal });
    clearTimeout(timeoutid);

    const data=await res.json();
    if (Array.isArray(data)&&data.length>0) {
      showproducts(data);
    } else if (Array.isArray(shareddata)&&shareddata.length>0) {
      showproducts(shareddata);
    }
  } catch (e) {
    if (Array.isArray(shareddata)&&shareddata.length>0) {
      showproducts(shareddata);
    }
  }
}

async function savecontactmessage(payload) {
  const res=await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res;
}

function setupcontactform() {
  if(!contactform) return;

  contactform.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name=(document.getElementById("contactname")?.value||"").trim();
    const email=(document.getElementById("contactemail")?.value||"").trim();
    const message=(document.getElementById("contactmessage")?.value||"").trim();

    if(!name||!email||!message){
      if(contactstatus){
        contactstatus.innerText="please fill all fields";
        contactstatus.style.color="#b02a37";
      }
      return;
    }

    if(contactstatus){
      contactstatus.innerText="saving message...";
      contactstatus.style.color="#333";
    }

    try {
      const res=await savecontactmessage({ name, email, message });
      const data=await res.json();

      if(!res.ok){
        throw new Error(data.msg||"submit failed");
      }

      contactform.reset();
      if(contactstatus){
        contactstatus.innerText="message saved";
        contactstatus.style.color="#0f5132";
      }
    } catch (err) {
      if(contactstatus){
        contactstatus.innerText=err.message||"could not save message";
        contactstatus.style.color="#b02a37";
      }
    }
  });
}

loadproducts();
setupcontactform();
