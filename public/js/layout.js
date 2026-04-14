async function loadPartial(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const res = await fetch(url);
    const html = await res.text();
    target.innerHTML = html;
  } catch (err) {
    console.log("partial load nahi hua", url);
  }
}

function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;

  const links = document.querySelectorAll("[data-nav]");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
    if (links[i].dataset.nav === page) {
      links[i].classList.add("active");
    }
  }
}

async function initLayout() {
  await loadPartial("site-header", "/partials/header.html");
  await loadPartial("site-footer", "/partials/footer.html");
  setActiveNav();
  document.dispatchEvent(new Event("layoutloaded"));
}

initLayout();
