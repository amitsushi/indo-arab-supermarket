<script>
/** Simple cart powered by localStorage **/
const CART_KEY = "ias_cart_v1";

function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch(e){ return []; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){
  const count = getCart().reduce((s,i)=>s + Number(i.qty||0), 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => el.textContent = count);
}
function addToCart(productId, qty=1){
  const cart = getCart();
  const item = cart.find(i=>i.id===productId);
  if(item){ item.qty += Number(qty); } else { cart.push({ id:productId, qty:Number(qty) }); }
  saveCart(cart);
  showToast("Added to cart");
}
function setQty(productId, qty){
  qty = Math.max(1, Number(qty)||1);
  const cart = getCart();
  const item = cart.find(i=>i.id===productId);
  if(item){ item.qty = qty; saveCart(cart); }
}
function removeFromCart(productId){
  const cart = getCart().filter(i=>i.id!==productId);
  saveCart(cart);
}
function emptyCart(){ saveCart([]); }

// Helpers
function findProduct(id){ return window.PRODUCTS.find(p=>p.id===id); }
function money(n){ return "₹" + (Number(n).toFixed(2)); } // change currency if needed
function showToast(msg){
  const t = document.querySelector(".toast");
  if(!t) return;
  t.textContent = msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"), 1200);
}
document.addEventListener("DOMContentLoaded", updateCartCount);
</script>
