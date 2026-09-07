// Data barang Badas — field: nama, level, category, img, harga
const ITEMS = [
  {name:"Krim", level:6, category:"Badas Susu", img:"images/2.1.jpeg", price:20},
  {name:"Mentega", level:9, category:"Badas Susu", img:"images/2.2.jpeg", price:20},
  {name:"Keju Sapi", level:12, category:"Badas Susu", img:"images/2.3.jpeg", price:20},
  {name:"Keju Kambing", level:33, category:"Badas Susu", img:"images/2.4.jpeg", price:20},

  {name:"Gula Coklat", level:7, category:"Badas Gula", img:"images/3.1.jpeg", price:20},
  {name:"Gula Putih", level:13, category:"Badas Gula", img:"images/3.2.jpeg", price:20},
  {name:"Sirup", level:18, category:"Badas Gula", img:"images/3.3.jpeg", price:20},

  {name:"Sarang Madu", level:39, category:"Badas Lebah", img:"images/16.1.jpeg", price:20},
  {name:"Madu", level:39, category:"Badas Lebah", img:"images/16.2.jpeg", price:30},
  {name:"Lilin Lebah", level:48, category:"Badas Lebah", img:"images/16.3.jpeg", price:30},

  {name:"Ikan", level:27, category:"Badas Kolam", img:"images/50.1.jpeg", price:20},
  {name:"Lobster", level:44, category:"Badas Kolam", img:"images/50.2.jpeg", price:30},
  {name:"Bulu Bebek", level:50, category:"Badas Kolam", img:"images/50.3.jpeg", price:30},

  {name:"Kecap Asin", level:54, category:"Badas Saus", img:"images/22.1.jpeg", price:40},
  {name:"Saus Kacang", level:54, category:"Badas Saus", img:"images/22.2.jpeg", price:40},
  {name:"Minyak Zaitun", level:60, category:"Badas Saus", img:"images/22.3.jpeg", price:40},
  {name:"Mayones", level:63, category:"Badas Saus", img:"images/22.4.jpeg", price:40},
  {name:"Saus Zaitun", level:66, category:"Badas Saus", img:"images/22.5.jpeg", price:40},
  {name:"Dadih Lemon", level:66, category:"Badas Saus", img:"images/22.6.jpeg", price:40},
  {name:"Saus Tomat", level:69, category:"Badas Saus", img:"images/22.7.jpeg", price:40},
  {name:"Salsa", level:77, category:"Badas Saus", img:"images/22.8.jpeg", price:40},
  {name:"Hummus", level:95, category:"Badas Saus", img:"images/22.9.jpeg", price:40},
  {name:"Saus Markisa", level:100, category:"Badas Saus", img:"images/22.10.jpeg", price:40},

  {name:"Roti Gandum", level:2, category:"Badas Lainnya", img:"images/1.1.jpeg", price:10},
  {name:"Kain Katun", level:18, category:"Badas Lainnya", img:"images/7.2.jpeg", price:20},
  {name:"Pasta Segar", level:67, category:"Badas Lainnya", img:"images/27.1.jpeg", price:25},
  {name:"Mi Beras", level:73, category:"Badas Lainnya", img:"images/27.2.jpeg", price:25},
  
];
ITEMS.forEach((f,i)=> f.id = i);
