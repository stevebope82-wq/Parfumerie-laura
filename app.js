const products = [
    // --- FLORAL ---
    { id: 1, name: "YSL Libre", price: 145, cat: "Floral", notes: "Lavande & Fleur d'Oranger", img: "images/libre.jpg" },
    { id: 2, name: "Bombshell", price: 95, cat: "Floral", notes: "Fruit de la passion & Pivoine", img: "images/bombshell.jpg" },
    { id: 3, name: "Miss Dior", price: 130, cat: "Floral", notes: "Pivoine & Rose de Grasse", img: "images/missdior.jpg" },
    { id: 4, name: "J'adore Dior", price: 155, cat: "Floral", notes: "Ylang-Ylang & Jasmin Sambac", img: "images/jadore.jpg" },
    { id: 5, name: "Flora Gorgeous", price: 110, cat: "Floral", notes: "Gardénia blanc & Jasmin", img: "images/flora.jpg" },
    { id: 6, name: "Flowerbomb", price: 125, cat: "Floral", notes: "Orchidée & Patchouli", img: "images/flowerbomb.jpg" },
    { id: 7, name: "My Way", price: 120, cat: "Floral", notes: "Tubéreuse & Vanille de Madagascar", img: "images/myway.jpg" },

    // --- BOISÉ ---
    { id: 8, name: "Sauvage Elixir", price: 165, cat: "Boisé", notes: "Cannelle, Muscade & Santal", img: "images/sauvage.jpg" },
    { id: 9, name: "Bleu de Chanel", price: 140, cat: "Boisé", notes: "Cèdre & Santal", img: "images/bleu.jpg" },
    { id: 10, name: "Mousuf Oud", price: 45, cat: "Boisé", notes: "Oud précieux & Chocolat", img: "images/mousuf.jpg" },
    { id: 11, name: "Terre d'Hermès", price: 115, cat: "Boisé", notes: "Silex, Agrumes & Benjoin", img: "images/terre.jpg" },
    { id: 12, name: "Oud Wood", price: 250, cat: "Boisé", notes: "Bois de Rose & Cardamome", img: "images/oudwood.jpg" },
    { id: 13, name: "Stronger With You", price: 105, cat: "Boisé", notes: "Marron glacé & Cèdre", img: "images/stronger.jpg" },
    { id: 14, name: "Invictus Victory", price: 95, cat: "Boisé", notes: "Encens & Vanille intense", img: "images/invictus.jpg" },

    // --- ORIENTAL ---
    { id: 15, name: "Khamrah Lattafa", price: 60, cat: "Oriental", notes: "Dattes, Praliné & Vanille", img: "images/khamrah.jpg" },
    { id: 16, name: "Asad Lattafa", price: 55, cat: "Oriental", notes: "Poivre noir, Café & Tabac", img: "images/asad.jpg" },
    { id: 17, name: "Baccarat Rouge", price: 280, cat: "Oriental", notes: "Safran & Ambre Gris", img: "images/baccarat.jpg" },
    { id: 18, name: "Good Girl", price: 135, cat: "Oriental", notes: "Fève Tonka & Cacao", img: "images/goodgirl.jpg" },
    { id: 19, name: "Black Opium", price: 125, cat: "Oriental", notes: "Café noir & Vanille", img: "images/blackopium.jpg" },
    { id: 20, name: "Shaghaf Oud", price: 75, cat: "Oriental", notes: "Safran, Rose & Oud", img: "images/shaghaf.jpg" },
    { id: 21, name: "L'Interdit", price: 110, cat: "Oriental", notes: "Fleurs blanches & Patchouli", img: "images/interdit.jpg" },

    // --- FRAIS ---
    { id: 22, name: "Acqua di Gio", price: 115, cat: "Frais", notes: "Notes marines & Bergamote", img: "images/gio.jpg" },
    { id: 23, name: "Versace Eros", price: 90, cat: "Frais", notes: "Menthe fraîche & Citron italien", img: "images/eros.jpg" },
    { id: 24, name: "Light Blue", price: 100, cat: "Frais", notes: "Citron de Sicile & Pomme", img: "images/lightblue.jpg" },
    { id: 25, name: "Dior Sport", price: 120, cat: "Frais", notes: "Bergamote & Ambre", img: "images/diorsport.jpg" },
    { id: 26, name: "Boss Bottled", price: 95, cat: "Frais", notes: "Pomme rouge & Cannelle", img: "images/boss.jpg" },
    { id: 27, name: "L'Aventure", price: 65, cat: "Frais", notes: "Agrumes & Patchouli", img: "images/laventure.jpg" },
    { id: 28, name: "One Million Lucky", price: 105, cat: "Frais", notes: "Noisette & Prune", img: "images/onemillion.jpg" }
];

let cart = JSON.parse(localStorage.getItem('laura_cart')) || [];

const app = {
    init: function() {
        if(document.getElementById('productGrid')) {
            this.renderProducts(products);
        }
        if(document.getElementById('cartList')) {
            this.renderCart();
        }
        this.updateCartCount();
    },

    renderProducts: function(data) {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        grid.innerHTML = data.map(p => `
            <div class="product-card">
                <div class="img-container">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x500?text=Indisponible'">
                </div>
                <h3>${p.name}</h3>
                <p class="notes">${p.notes}</p>
                <p class="price"><b>${p.price} $</b></p>
                <button class="add-to-cart-btn" onclick="app.addToCart(${p.id})">Ajouter au Panier</button>
            </div>
        `).join('');
    },

    filter: function() {
        const input = document.getElementById('searchInput');
        if(!input) return;
        const term = input.value.toLowerCase();
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.notes.toLowerCase().includes(term) ||
            p.cat.toLowerCase().includes(term)
        );
        this.renderProducts(filtered);
    },

    filterCat: function(cat, btn) {
        const filtered = (cat === 'Tous') ? products : products.filter(p => p.cat === cat);
        this.renderProducts(filtered);
        document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');
    },

    addToCart: function(id) {
        const product = products.find(p => p.id === id);
        const existing = cart.find(item => item.id === id);
        if (existing) { existing.quantity++; } else { cart.push({...product, quantity: 1}); }
        this.save();
        this.updateCartCount();
        alert(`${product.name} ajouté ! ✨`);
    },

    // --- MODIFICATION ICI : AJOUT DES BOUTONS + ET - ---
    renderCart: function() {
        const list = document.getElementById('cartList');
        if (!list) return;
        if (cart.length === 0) {
            list.innerHTML = "<p style='text-align:center; padding:40px;'>Votre panier est vide.</p>";
            this.calculateTotal();
            return;
        }
        list.innerHTML = cart.map(item => `
            <div class="cart-item" style="display:flex; align-items:center; border-bottom:1px solid #eee; padding:15px 0;">
                <img src="${item.img}" style="width:70px; height:80px; object-fit:cover; border-radius:5px;">
                <div style="flex:1; padding-left:15px;">
                    <h4 style="margin:0;">${item.name}</h4>
                    <p style="margin:5px 0;">${item.price} $</p>
                    
                    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                        <button onclick="app.changeQty(${item.id}, -1)" style="width:25px; height:25px; border-radius:50%; border:1px solid #ddd; cursor:pointer; background:#f8f8f8;">-</button>
                        <b style="font-size:1.1rem;">${item.quantity}</b>
                        <button onclick="app.changeQty(${item.id}, 1)" style="width:25px; height:25px; border-radius:50%; border:1px solid #ddd; cursor:pointer; background:#f8f8f8;">+</button>
                    </div>
                </div>
                <div style="text-align:right;">
                   <p style="margin-bottom:10px; font-weight:bold; color:var(--gold);">${item.price * item.quantity} $</p>
                   <button onclick="app.removeFromCart(${item.id})" style="background:none; border:none; color:#e74c3c; cursor:pointer; font-size:1.2rem;">
                        <i class="fas fa-trash"></i>
                   </button>
                </div>
            </div>
        `).join('');
        this.calculateTotal();
    },

    // --- NOUVELLE FONCTION POUR CHANGER LA QUANTITÉ ---
    changeQty: function(id, delta) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity < 1) return this.removeFromCart(id);
            this.save();
            this.renderCart();
            this.updateCartCount();
        }
    },

    removeFromCart: function(id) {
        cart = cart.filter(item => item.id !== id);
        this.save();
        this.renderCart();
        this.updateCartCount();
    },

    calculateTotal: function() {
        const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        if(document.getElementById('sub')) document.getElementById('sub').innerText = total + " $";
        if(document.getElementById('total')) document.getElementById('total').innerText = total + " $";
    },

    updateCartCount: function() {
        const countEl = document.getElementById('cart-count');
        if (countEl) countEl.innerText = cart.reduce((acc, i) => acc + i.quantity, 0);
    },

    save: function() {
        localStorage.setItem('laura_cart', JSON.stringify(cart));
    },

    generateWhatsAppReceipt: function() {
        const nom = document.getElementById('lastName')?.value;
        const postnom = document.getElementById('postName')?.value;
        const prenom = document.getElementById('firstName')?.value;
        const tel = document.getElementById('userPhone')?.value;
        const email = document.getElementById('userEmail')?.value;
        const radioPaiement = document.querySelector('input[name="payment"]:checked');
        
        if (!nom || !prenom || !tel) return alert("Veuillez remplir les informations obligatoires !");
        if (cart.length === 0) return alert("Votre panier est vide !");

        const mode = radioPaiement ? radioPaiement.value : "Non précisé";

        let msg = `✨ *COMMANDE LMK PARFUMERIE* ✨\n\n`;
        msg += `👤 *CLIENT :* ${nom.toUpperCase()} ${postnom} ${prenom}\n`;
        msg += `📞 *TÉL :* ${tel}\n`;
        msg += `📧 *EMAIL :* ${email}\n\n`;
        msg += `📦 *DÉTAILS DES PRODUITS :*\n`;
        msg += `----------------------------------\n`;
        
        cart.forEach(i => {
            msg += `🔹 ${i.name} (x${i.quantity}) - ${i.price * i.quantity} $\n`;
        });

        const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        msg += `----------------------------------\n`;
        msg += `💰 *TOTAL À PAYER : ${total} $* \n`;
        msg += `💳 *MODE DE PAIEMENT :* ${mode}\n\n`;
        msg += `🙏 _Merci de valider ma commande._`;

        const myNumber = "243XXXXXXXXX"; 
        window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());