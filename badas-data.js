// Data barang Badas — field: nama, level, category, img, harga
const ITEMS = [
  {name:"Krim", level:6, category:"Badas Susu", img:"images/1.jpeg", price:20},
  {name:"Mentega", level:9, category:"Badas Susu", img:"images/1.jpeg", price:20},
  {name:"Keju Sapi", level:12, category:"Badas Susu", img:"images/3.jpeg", price:20},
  {name:"Keju Kambing", level:33, category:"Badas Susu", img:"images/4.jpeg", price:20},

  {name:"Gula Coklat", level:7, category:"Badas Gula", img:"https://static.wikia.nocookie.net/hayday/images/0/02/Brown_Sugar.png/revision/latest?cb=20240205163705.jpg", price:20},
  {name:"Gula Putih", level:13, category:"Badas Gula", img:"https://static.wikia.nocookie.net/hayday/images/f/ff/White_Sugar.png/revision/latest?cb=20240205163815.jpg", price:20},
  {name:"Sirup", level:18, category:"Badas Gula", img:"https://static.wikia.nocookie.net/hayday/images/2/2f/Syrup.png/revision/latest?cb=20240205163903.jpg", price:20},

  {name:"Sarang Madu", level:39, category:"Badas Lebah", img:"https://static.wikia.nocookie.net/hayday/images/7/7c/Honeycomb.png/revision/latest?cb=20191025193524.jpg", price:20},
  {name:"Madu", level:39, category:"Badas Lebah", img:"https://static.wikia.nocookie.net/hayday/images/c/c6/Honey.png/revision/latest/scale-to-width-down/1000?cb=20240209012557.jpg", price:30},
  {name:"Lilin Lebah", level:48, category:"Badas Lebah", img:"https://static.wikia.nocookie.net/hayday/images/e/e4/Beeswax.png/revision/latest/scale-to-width-down/1000?cb=20240209012642.jpg", price:30},

  {name:"Ikan", level:27, category:"Badas Kolam", img:"https://static.wikia.nocookie.net/hayday/images/6/63/Fish_Fillet.png/revision/latest?cb=20150414211348.jpg", price:20},
  {name:"Lobster", level:44, category:"Badas Kolam", img:"https://static.wikia.nocookie.net/hayday/images/5/5d/Lobster_Tail.png/revision/latest?cb=20150411101115.jpg", price:30},
  {name:"Bulu Bebek", level:50, category:"Badas Kolam", img:"https://static.wikia.nocookie.net/hayday/images/f/f9/Duck_Feather.png/revision/latest?cb=20150414212143.jpg", price:30},

  {name:"Kecap Asin", level:54, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/9/97/Soy_Sauce.png/revision/latest?cb=20240210055302.jpg", price:40},
  {name:"Saus Kacang", level:54, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/5/58/Bean_Dip.png/revision/latest?cb=20260126210943.jpg", price:40},
  {name:"Minyak Zaitun", level:60, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/3/34/Olive_Oil.png/revision/latest/scale-to-width-down/1000?cb=20240210055734.jpg", price:40},
  {name:"Mayones", level:63, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/4/4e/Mayonnaise.png/revision/latest?cb=20240210055543.jpg", price:40},
  {name:"Saus Zaitun", level:66, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/3/32/Olive_Dip.png/revision/latest/scale-to-width-down/1000?cb=20240411151145.jpg", price:40},
  {name:"Dadih Lemon", level:66, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/e/ea/Lemon_Curd.png/revision/latest?cb=20240210055448.jpg", price:40},
  {name:"Saus Tomat", level:69, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/0/09/Tomato_Sauce.png/revision/latest/scale-to-width-down/1000?cb=20240210060131,jpg", price:40},
  {name:"Salsa", level:77, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/1/1e/Salsa.png/revision/latest?cb=20240210055852.jpg", price:40},
  {name:"Hummus", level:95, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/7/78/Hummus.png/revision/latest/scale-to-width-down/1000?cb=20240210055405.jpg", price:40},
  {name:"Saus Markisa", level:100, category:"Badas Saus", img:"https://static.wikia.nocookie.net/hayday/images/9/98/Tart_Dressing.png/revision/latest/scale-to-width-down/1000?cb=20240210060010.jpg", price:40},

  {name:"Roti Gandum", level:2, category:"Badas Lainnya", img:"https://static.wikia.nocookie.net/hayday/images/e/e1/Bread.png/revision/latest?cb=20240205073518.jpg", price:10},
  {name:"Kain Katun", level:18, category:"Badas Lainnya", img:"https://static.wikia.nocookie.net/hayday/images/0/01/Cotton_Fabric.png/revision/latest/scale-to-width-down/1000?cb=20240207155935.jpg", price:20},
  {name:"Pasta Segar", level:67, category:"Badas Lainnya", img:"https://static.wikia.nocookie.net/hayday/images/9/93/Fresh_Pasta.png/revision/latest/scale-to-width-down/1000?cb=20240211172634.jpg", price:25},
  {name:"Mi Beras", level:73, category:"Badas Lainnya", img:"https://static.wikia.nocookie.net/hayday/images/2/20/Rice_Noodles.png/revision/latest?cb=20240211172740.jpg", price:25},
  
];
ITEMS.forEach((f,i)=> f.id = i);
