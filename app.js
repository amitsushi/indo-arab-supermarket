\
/**
 * Simple static site script:
 * - Renders products from products.json
 * - Search, category filters
 * - LocalStorage cart
 * - EN/AR toggle with RTL support
 */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const i18n = {
  en: {
    brand: "Indo&Arab Supermarket",
    search: "Search products…",
    cart: "Cart",
    categories: "Popular Categories",
    featured: "Featured Deals",
    add: "Add",
    added: "Added",
    qty: "Qty",
    price: "Price",
    remove: "Remove",
    empty: "Your cart is empty.",
    subtotal: "Subtotal",
    checkout: "Checkout",
    offers: "Weekly Offers",
    halal: "100% Halal guaranteed",
    delivery: "Fast delivery across Doha",
    shopNow: "Shop Now",
  },
  ar: {
    brand: "سوبرماركت إندو وعرب",
    search: "ابحث عن منتجات…",
    cart: "السلة",
    categories: "أقسام شائعة",
    featured: "عروض مميزة",
    add: "أضف",
    added: "تمت الإضافة",
    qty: "الكمية",
    price: "السعر",
    remove: "إزالة",
    empty: "سلتك فارغة.",
    subtotal: "الإجمالي",
    checkout: "إتمام الشراء",
    offers: "عروض الأسبوع",
    halal: "مضمون 100% حلال",
    delivery: "توصيل سريع داخل الدوحة",
    shopNow: "تسوق الآن",
  }
};
let lang = localStorage.getItem("lang") || "en";
function t(k){ return (i18n[lang]||i18n.en)[k] || k }

function setLang(next){
  lang = next;
  localStorage.setItem("lang", next);
  if (document.documentElement) {
    document.documentElement.classList.toggle("rtl", next==="ar");
    document.documentElement.setAttribute("dir", next==="ar" ? "rtl" : "ltr");
  }
  renderText();
  if (location.pathname.endsWith("cart.html")) renderCart();
  else renderHome();
}

function renderText(){
  $$(".i18n-brand").forEach(el => el.textContent = t("brand"));
  $$(".i18n-search").forEach(el => el.placeholder = t("search"));
  $$(".i18n-cart").forEach(el => el.textContent = t("cart"));
  $$(".i18n-categories").forEach(el => el.textContent = t("categories"));
  $$(".i18n-featured").forEach(el => el.textContent = t("featured"));
  $$(".i18n-offers").forEach(el => el.textContent = t("offers"));
  $$(".i18n-delivery").forEach(el => el.textContent = t("delivery"));
  $$(".i18n-halal").forEach(el => el.textContent = t("halal"));
  $$(".i18n-shopNow").forEach(el => el.textContent = t("shopNow"));
}

async function loadProducts(){
  const res = await fetch("products.json");
  const list = await res.json();
  return list;
}

function money(q) { return `QAR ${q.toFixed(2)}` }

// Cart helpers
function getCart(){ try { return JSON.parse(localStorage.getItem("cart")||"{}") } catch(e){ return {} } }
function setCart(c){ localStorage.setItem("cart", JSON.stringify(c)); }
function cartCount(){ return Object.values(getCart()).reduce((a,b)=>a+b,0) }
function addToCart(id){
  const cart = getCart();
  cart[id] = (cart[id]||0)+1;
  setCart(cart);
  updateCartBubble();
}
function removeFromCart(id){
  const cart = getCart();
  delete cart[id];
  setCart(cart);
  renderCart();
  updateCartBubble();
}
function updateCartBubble(){
  const n = cartCount();
  $$(".cart-badge").forEach(b => b.textContent = n>0 ? n : "");
}

function headerHTML(){
  return `
  <div class="container header-inner">
    <a href="index.html" class="brand">
      <img src="assets/logo.svg" alt="logo"><span class="name i18n-brand">${t("brand")}</span>
    </a>
    <div class="searchbar">
      <input class="i18n-search" placeholder="${t("search")}" oninput="onSearch(this.value)" />
      <a class="btn" href="cart.html">🛒 <span class="i18n-cart">${t("cart")}</span> <span class="pill cart-badge"></span></a>
      <button class="btn" onclick="setLang(lang==='en'?'ar':'en')">${lang==='en'?'العربية':'EN'}</button>
    </div>
  </div>
  `
}

function footerHTML(){
  const year = new Date().getFullYear();
  return `
  <div class="container">
    <div class="cols">
      <div><strong>${t("brand")}</strong><p>${t("delivery")}</p></div>
      <div><div class="badge">Doha</div><div class="badge">Same-day before 6pm</div></div>
      <div>${t("halal")}</div>
      <div><small>© ${year} Indo&Arab Supermarket — Qatar</small></div>
    </div>
  </div>`
}

// Home rendering
let ALL_PRODUCTS = [];
async function renderHome(){
  if (!$("#home")) return;
  if (!ALL_PRODUCTS.length) ALL_PRODUCTS = await loadProducts();
  // Featured
  const featured = ALL_PRODUCTS.slice(0,6).map(p => productCard(p)).join("");
  $("#featured").innerHTML = featured;
  // Categories
  const cats = Array.from(new Set(ALL_PRODUCTS.map(p=>p.category)));
  $("#categories").innerHTML = cats.map(c => `
    <a class="card" href="listing.html?cat=${encodeURIComponent(c)}">
      <div class="img">🏷️</div>
      <div style="font-weight:700">${c}</div>
      <div class="muted">${ALL_PRODUCTS.filter(p=>p.category===c).length} items</div>
    </a>`).join("");
  updateCartBubble();
  renderText();
}

function productCard(p){
  const name = lang==="ar" ? p.name_ar : p.name_en;
  return `
  <div class="card product-card">
    <a href="product.html?id=${encodeURIComponent(p.id)}" class="img">${p.emoji||"🧺"}</a>
    <a href="product.html?id=${encodeURIComponent(p.id)}" style="font-weight:700">${name}</a>
    <div class="pill">${p.badge||""}</div>
    <div class="price">${money(p.price)}</div>
    <div class="ctas">
      <button class="btn primary" onclick="addToCart('${p.id}')">${t("add")}</button>
      <a class="btn" href="product.html?id=${encodeURIComponent(p.id)}">Details</a>
    </div>
  </div>`
}

// Listing page
async function renderListing(){
  if (!$("#listing")) return;
  if (!ALL_PRODUCTS.length) ALL_PRODUCTS = await loadProducts();
  const url = new URL(location.href);
  const cat = url.searchParams.get("cat");
  const list = ALL_PRODUCTS.filter(p => !cat || p.category===cat);
  $("#listing-title").textContent = cat || t("featured");
  $("#listing").innerHTML = list.map(productCard).join("");
  updateCartBubble();
  renderText();
}

// Product page
async function renderProduct(){
  if (!$("#product")) return;
  if (!ALL_PRODUCTS.length) ALL_PRODUCTS = await loadProducts();
  const url = new URL(location.href);
  const id = url.searchParams.get("id");
  const p = ALL_PRODUCTS.find(x=>x.id===id) || ALL_PRODUCTS[0];
  $("#prod-name").textContent = lang==="ar" ? p.name_ar : p.name_en;
  $("#prod-emoji").textContent = p.emoji || "🧺";
  $("#prod-price").textContent = money(p.price);
  $("#prod-badge").textContent = p.badge || "";
  $("#prod-add").onclick = ()=> addToCart(p.id);
  updateCartBubble();
  renderText();
}

// Cart page
async function renderCart(){
  if (!$("#cart")) return;
  if (!ALL_PRODUCTS.length) ALL_PRODUCTS = await loadProducts();
  const cart = getCart();
  const ids = Object.keys(cart);
  if (!ids.length){
    $("#cart").innerHTML = `<div class="alert">${t("empty")}</div>`;
    updateCartBubble();
    return;
  }
  const rows = ids.map(id=>{
    const p = ALL_PRODUCTS.find(x=>x.id===id);
    const qty = cart[id];
    const line = p.price*qty;
    return `<tr>
      <td>${p.emoji||"🧺"} ${lang==="ar"?p.name_ar:p.name_en}</td>
      <td>${qty}</td>
      <td>${money(line)}</td>
      <td><button class="btn" onclick="removeFromCart('${id}')">${t("remove")}</button></td>
    </tr>`
  }).join("");
  const subtotal = ids.reduce((s,id)=>{
    const p = ALL_PRODUCTS.find(x=>x.id===id);
    return s + p.price*cart[id];
  },0);
  $("#cart").innerHTML = `
    <table class="table">
      <thead><tr><th>Item</th><th>${t("qty")}</th><th>${t("price")}</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
      <strong>${t("subtotal")}: ${money(subtotal)}</strong>
      <a class="btn primary">${t("checkout")}</a>
    </div>
  `;
  updateCartBubble();
  renderText();
}

// Search (home only)
async function onSearch(q){
  if (!$("#featured")) return;
  if (!ALL_PRODUCTS.length) ALL_PRODUCTS = await loadProducts();
  const list = ALL_PRODUCTS.filter(p => (p.name_en+p.name_ar).toLowerCase().includes(q.toLowerCase()));
  $("#featured").innerHTML = list.map(productCard).join("") || `<div class="alert">No results</div>`;
}

// Boot
window.addEventListener("DOMContentLoaded", () => {
  $(".header").innerHTML = headerHTML();
  $(".footer").innerHTML = footerHTML();
  document.documentElement.classList.toggle("rtl", lang==="ar");
  document.documentElement.setAttribute("dir", lang==="ar" ? "rtl" : "ltr");
  renderHome();
  renderListing();
  renderProduct();
  renderCart();
  updateCartBubble();
});
