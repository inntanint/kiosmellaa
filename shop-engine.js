// ===========================================================
// SHOP ENGINE — dipakai bareng oleh SEMUA menu Kios Mellaa
// (Food, Voucher, Altam & Albeg, Badas, Diamond, Koin, Alat Up, Akun)
//
// KERANJANG SEKARANG SATU UNTUK SEMUA MENU (disimpan di localStorage
// browser), jadi kalau nambah item di Food terus pindah ke Badas,
// itemnya tetap kebawa di keranjang yang sama.
//
// Cara pakai di tiap halaman:
// 1. Sebelum tag ini, load data menu: <script src="NAMA-data.js"></script>
//    Data harus berupa: const ITEMS = [ {name, price, level?, category?, img?}, ... ];
// 2. Kasih config kecil sebelum shop-engine.js:
//      <script>
//        window.SHOP_CONFIG = {
//          menuId: "food",            // ID unik per menu, WAJIB beda tiap halaman
//          itemLabel: "makanan",      // sebutan barang di halaman ini
//          fallbackIcon: "🍞",        // emoji kalau item tidak punya gambar
//          step: 5                    // kelipatan +/- (opsional, default 5)
//        };
//      </script>
// 3. Baru load: <script src="shop-engine.js"></script>
// ===========================================================
(function(){
  const CART_STORAGE_KEY = "kiosMellaaCart"; // satu keranjang untuk semua halaman

  const cfg = window.SHOP_CONFIG || {};
  const STEP = cfg.step || 5; // kelipatan penambahan quantity tiap klik +/- (default 5, bisa diubah per halaman)
  const menuId = cfg.menuId || "menu";
  const itemLabel = cfg.itemLabel || "barang";
  const fallbackIcon = cfg.fallbackIcon || "📦";

  function rupiah(n){ return 'Rp ' + n.toLocaleString('id-ID'); }
  function cartKeyFor(id){ return menuId + '::' + id; }

  function loadCart(){
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {};
    } catch(e){
      return {};
    }
  }
  function saveCart(){
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }

  let cart = loadCart(); // { "food::3": {name, price, img, qty}, "badas::0": {...}, ... }

  ITEMS.forEach((f,i)=> f.id = i);

  const grid = document.getElementById('grid');
  const showingLabel = document.getElementById('showingLabel');
  const chipRow = document.getElementById('chipRow');
  const levelInput = document.getElementById('levelInput');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const cartFab = document.getElementById('cartFab');
  const overlay = document.getElementById('overlay');
  const drawer = document.getElementById('drawer');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const waBtn = document.getElementById('waBtn');
  const drawerItemsEl = document.getElementById('drawerItems');

  // state
  let query = "";
  let activeChip = "all";
  let level = levelInput ? (parseInt(levelInput.value) || Infinity) : Infinity;
  let sort = sortSelect ? sortSelect.value : "name-asc";

  // filter kategori otomatis nyala kalau ada data category & elemen chipRow
  const CATEGORIES = [...new Set(ITEMS.filter(f=>f.category).map(f=>f.category))].sort();
  const hasCategory = CATEGORIES.length > 0 && !!chipRow;

  if (hasCategory){
    chipRow.innerHTML = ['all', ...CATEGORIES].map(m =>
      `<div class="chip ${m==='all'?'active':''}" data-m="${m}">${m==='all' ? 'Semua' : m}</div>`
    ).join('');
    chipRow.querySelectorAll('.chip').forEach(el=>{
      el.addEventListener('click', ()=>{
        activeChip = el.dataset.m;
        chipRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        el.classList.add('active');
        render();
      });
    });
  } else if (chipRow){
    chipRow.style.display = 'none';
  }

  function getFiltered(){
    return ITEMS.filter(f =>
      (typeof f.level !== 'number' || f.level <= level) &&
      (!hasCategory || activeChip === 'all' || f.category === activeChip) &&
      (query.trim()==='' ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        (f.category && f.category.toLowerCase().includes(query.toLowerCase())))
    );
  }

  function sortItems(items){
    const arr = [...items];
    if (sort==='level-asc') arr.sort((a,b)=>(a.level??0)-(b.level??0));
    else if (sort==='level-desc') arr.sort((a,b)=>(b.level??0)-(a.level??0));
    else if (sort==='price-asc') arr.sort((a,b)=>a.price-b.price);
    else if (sort==='price-desc') arr.sort((a,b)=>b.price-a.price);
    else arr.sort((a,b)=>a.name.localeCompare(b.name));
    return arr;
  }

  function thumbHtml(f){
    return `${typeof f.level === 'number' ? `<span class="lvl">Lvl ${f.level}</span>` : ''}
      ${f.img ? `<img src="${f.img}" alt="${f.name}" style="width:100%; height:100%; object-fit:cover;">` : fallbackIcon}`;
  }

  // ---- keranjang: baca/ubah langsung dari objek cart global ----
  function qtyOf(id){
    const entry = cart[cartKeyFor(id)];
    return entry ? entry.qty : 0;
  }

  function updateQty(key, delta, snapshot){
    const current = cart[key] ? cart[key].qty : 0;
    const next = Math.max(0, current + delta);
    if (next === 0){
      delete cart[key];
    } else {
      cart[key] = { name: snapshot.name, price: snapshot.price, img: snapshot.img || '', qty: next };
    }
    saveCart();
    render();
  }

  // dipanggil dari kartu produk di grid (item milik halaman ini)
  window.changeQty = function(id, delta){
    const f = ITEMS[id];
    updateQty(cartKeyFor(id), delta, { name: f.name, price: f.price, img: f.img || '' });
  };

  // dipanggil dari drawer keranjang (item bisa dari menu manapun)
  window.changeCartQty = function(key, delta){
    const existing = cart[key];
    if (!existing) return;
    updateQty(key, delta, existing);
  };

  function render(){
    if (!grid) return;
    const filtered = sortItems(getFiltered());
    if (showingLabel) showingLabel.textContent = `${filtered.length} ${itemLabel}`;

    if (filtered.length === 0){
      grid.innerHTML = `<div class="empty">Tidak ada ${itemLabel} yang cocok.</div>`;
    } else {
      grid.innerHTML = filtered.map(f => `
        <div class="card">
          <div class="thumb">${thumbHtml(f)}</div>
          <div class="body">
            <div class="name">${f.name}</div>
            ${f.category ? `<div class="machine">${f.category}</div>` : ''}
            <div class="price">${rupiah(f.price)}</div>
            <div class="add-row">
              <div class="stepper">
                <button onclick="changeQty(${f.id}, -${STEP})">−</button>
                <span class="qty">${qtyOf(f.id)}</span>
                <button onclick="changeQty(${f.id}, ${STEP})">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // ---- total & isi drawer diambil dari SELURUH keranjang (semua menu) ----
    const cartEntries = Object.entries(cart); // [ [key, {name,price,img,qty}], ... ]
    const totalQty = cartEntries.reduce((s,[,e])=> s + e.qty, 0);
    const totalPrice = cartEntries.reduce((s,[,e])=> s + e.price*e.qty, 0);

    const fabCount = document.getElementById('fabCount');
    const fabPrice = document.getElementById('fabPrice');
    const drawerTotalQty = document.getElementById('drawerTotalQty');
    const drawerTotal = document.getElementById('drawerTotal');
    if (fabCount) fabCount.textContent = totalQty;
    if (fabPrice) fabPrice.textContent = rupiah(totalPrice);
    if (drawerTotalQty) drawerTotalQty.textContent = totalQty + ' item';
    if (drawerTotal) drawerTotal.textContent = rupiah(totalPrice);

    if (drawerItemsEl){
      if (cartEntries.length === 0){
        drawerItemsEl.innerHTML = '<div class="drawer-empty">Keranjang masih kosong.</div>';
      } else {
        drawerItemsEl.innerHTML = cartEntries.map(([key, f])=>{
          return `
            <div class="drawer-row">
              <div class="ic">${f.img ? `<img src="${f.img}" style="width:100%;height:100%;object-fit:cover;">` : fallbackIcon}</div>
              <div class="info">
                <div class="n">${f.name}</div>
                <div class="p">${rupiah(f.price)} × ${f.qty} = ${rupiah(f.price*f.qty)}</div>
              </div>
              <div class="stepper">
                <button onclick="changeCartQty('${key}', -${STEP})">−</button>
                <span class="qty" style="font-weight:800;">${f.qty}</span>
                <button onclick="changeCartQty('${key}', ${STEP})">+</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  if (levelInput){
    levelInput.addEventListener('input', e=>{
      level = parseInt(e.target.value) || 1;
      render();
    });
  }
  if (searchInput){
    searchInput.addEventListener('input', e=>{
      query = e.target.value;
      render();
    });
  }
  if (sortSelect){
    sortSelect.addEventListener('change', e=>{
      sort = e.target.value;
      render();
    });
  }

  function openDrawer(){ overlay.classList.add('open'); drawer.classList.add('open'); }
  function closeDrawer(){ overlay.classList.remove('open'); drawer.classList.remove('open'); }
  if (cartFab && overlay && drawer){
    cartFab.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);
  }
  if (clearCartBtn){
    clearCartBtn.addEventListener('click', ()=>{
      cart = {};
      saveCart();
      render();
    });
  }

  if (waBtn){
    waBtn.addEventListener('click', ()=>{
      const cartEntries = Object.entries(cart);
      if (cartEntries.length === 0){
        alert('Keranjang masih kosong, yuk pilih barang dulu.');
        return;
      }
      const lines = cartEntries.map(([,f])=>{
        const subtotal = f.price * f.qty;
        return `• ${f.name} x${f.qty} = ${rupiah(subtotal)}`;
      });
      const totalPrice = cartEntries.reduce((s,[,f])=> s + f.price*f.qty, 0);
      const totalQty = cartEntries.reduce((s,[,f])=> s + f.qty, 0);
      const message =
        `Halo Kios Mellaa, saya ingin melakukan pemesanan berikut:\n\n` +
        lines.join('\n') +
        `\n\nTotal Barang: ${totalQty} item` +
        `\nTotal Harga: ${rupiah(totalPrice)}`;
      const waUrl = `https://wa.me/6283140914406?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    });
  }

  // sinkron kalau keranjang diubah dari tab lain (opsional, biar konsisten)
  window.addEventListener('storage', (e)=>{
    if (e.key === CART_STORAGE_KEY){
      cart = loadCart();
      render();
    }
  });

  // render pertama kali saat halaman dimuat
  render();
})();
