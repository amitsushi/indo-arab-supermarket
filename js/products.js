<script>
// Simple product catalog (edit freely). Images should exist at /images/...
window.PRODUCTS = [
  { id:"FR-APL-001", name:"Fresh Apples", price:5.00, unit:"/kg", category:"Fruits",    image:"images/apple.jpg" },
  { id:"FR-ORG-002", name:"Oranges",      price:3.50, unit:"/kg", category:"Fruits",    image:"images/orange.jpg" },
  { id:"VG-ONI-010", name:"Red Onions",   price:2.00, unit:"/kg", category:"Vegetables", image:"images/onion.jpg" },
  { id:"VG-TMT-011", name:"Tomatoes",     price:2.20, unit:"/kg", category:"Vegetables", image:"images/tomato.jpg" },
  { id:"SP-CRM-101", name:"Cardamom",     price:9.90, unit:"/100g",category:"Spices",    image:"images/cardamom.jpg" },
  { id:"SP-CMN-102", name:"Cumin Seeds",  price:4.50, unit:"/100g",category:"Spices",    image:"images/cumin.jpg" },
  { id:"MT-CHK-201", name:"Fresh Chicken",price:6.80, unit:"/kg", category:"Meat",       image:"images/chicken.jpg" },
  { id:"MT-BEF-202", name:"Beef",         price:11.50,unit:"/kg", category:"Meat",       image:"images/beef.jpg" },
  { id:"DR-RIC-301", name:"Basmati Rice", price:14.00,unit:"/5kg",category:"Dry Goods",  image:"images/rice.jpg" },
  { id:"DR-OLV-302", name:"Olive Oil",    price:7.50, unit:"/1L", category:"Dry Goods",  image:"images/olive-oil.jpg" },
  { id:"BK-NAN-401", name:"Fresh Naan",   price:1.50, unit:"/pc", category:"Bakery",     image:"images/naan.jpg" },
  { id:"BK-PIT-402", name:"Pita Bread",   price:2.50, unit:"/pack",category:"Bakery",    image:"images/pita.jpg" }
];
// For category list
window.CATEGORIES = [...new Set(window.PRODUCTS.map(p=>p.category))];
</script>
