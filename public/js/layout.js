async function loadpartial(targetid, url) {
  const el=document.getElementById(targetid);
  if(!el) return;

  try {
    const res=await fetch(url);
    const html=await res.text();
    el.innerHTML=html;
  } catch (err) {
    console.log("could not load partial", url);
  }
}

function setactivenav() {
  const page=document.body.dataset.page;
  if(!page) return;

  const links=document.querySelectorAll("[data-nav]");
  for(let i=0;i<links.length;i++){
    links[i].classList.remove("active");
    if(links[i].dataset.nav===page){
      links[i].classList.add("active");
    }
  }
}

async function loadlayout() {
  await loadpartial("site-header","/partials/header.html");
  await loadpartial("site-footer","/partials/footer.html");
  setactivenav();
  document.dispatchEvent(new Event("layoutloaded"));
}

loadlayout();
