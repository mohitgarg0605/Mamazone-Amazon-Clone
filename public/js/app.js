const box=document.getElementById("productgrid");
const c2=document.getElementById("cartcount2");
const list=document.getElementById("cartlist");
const form=document.getElementById("contactform");
const status=document.getElementById("contactstatus");

let arr=[];

function upcart(){
  const c1=document.getElementById("cartcount");

  if(c1){
    c1.innerText=arr.length;
  }

  if(c2){
    c2.innerText=arr.length;
  }

  if(!list){
    return;
  }

  list.innerHTML="";

  for(let i=0;i<arr.length;i++){
    const li=document.createElement("li");
    li.innerText=arr[i].name+" - Rs."+arr[i].price;
    list.appendChild(li);
  }
}

function add(item){
  arr.push(item);
  upcart();
}

function show(data){
  if(!box){
    return;
  }

  box.innerHTML="";

  for(let i=0;i<data.length;i++){
    const item=data[i];
    const card=document.createElement("div");
    card.className="pcard";

    card.innerHTML=`
      <img src="${item.image}" alt="${item.name}">
      <div class="pinfo">
        <h3>${item.name}</h3>
        <p>Rs. ${item.price}</p>
        <button class="btn1">Add to Cart</button>
      </div>
    `;

    const btn=card.querySelector(".btn1");
    btn.addEventListener("click",function(){
      add(item);
    });

    box.appendChild(card);
  }
}

async function load(){
  if(!box){
    return;
  }

  try{
    const ctl=new AbortController();
    const timeoutId=setTimeout(function(){
      ctl.abort();
    },3000);

    const res=await fetch("/api/products",{signal:ctl.signal});
    clearTimeout(timeoutId);
    const data=await res.json();

    if(Array.isArray(data)&&data.length>0){
      show(data);
      return;
    }
  }catch(err){
    console.log("api failed, local chalega");
  }

  try{
    const res2=await fetch("/data/products.json");
    const data2=await res2.json();
    show(data2);
  }catch(err){
    console.log("local data bhi nahi mila");
  }
}

function setform(){
  if(!form){
    return;
  }

  form.addEventListener("submit",async function(e){
    e.preventDefault();

    const name=(document.getElementById("contactname")?.value||"").trim();
    const email=(document.getElementById("contactemail")?.value||"").trim();
    const message=(document.getElementById("contactmessage")?.value||"").trim();

    if(!name||!email||!message){
      if(status){
        status.innerText="sab fields bharo";
        status.style.color="#b02a37";
      }
      return;
    }

    if(status){
      status.innerText="sending...";
      status.style.color="#333";
    }

    try{
      const res=await fetch("/api/contact",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,message}),
      });

      const data=await res.json();

      if(!res.ok){
        throw new Error(data.msg||"kuch galat ho gaya");
      }

      form.reset();
      if(status){
        status.innerText="message bhej diya";
        status.style.color="#0f5132";
      }
    }catch(err){
      if(status){
        status.innerText=err.message||"message nahi gaya";
        status.style.color="#b02a37";
      }
    }
  });
}

load();
setform();
