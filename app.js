// --- BASE DE DONNÉES PRODUITS ---
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
    { id: 19, name: "Black Opium", price: 125, cat: "Oriental", notes: "Café noir & Vanille", img: "images/opium.jpg" },
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

// --- GESTION DU PANIER ---
let cart = JSON.parse(localStorage.getItem('laura_cart')) || [];

const app = {
    init: function() {
        if(document.getElementById('productGrid')) this.renderProducts(products);
        if(document.getElementById('cartList')) this.renderCart();
        this.updateCartCount();
    },

    renderProducts: function(data) {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        grid.innerHTML = data.map(p => `
            <div class="product-card">
                <div class="img-container">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x500?text=LMK'">
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
        if (existing) { 
            existing.quantity++; 
        } else { 
            cart.push({...product, quantity: 1}); 
        }
        this.save(); 
        this.updateCartCount();
        alert(`${product.name} ajouté ! ✨`);
    },

    renderCart: function() {
        const list = document.getElementById('cartList');
        if (!list) return;
        if (cart.length === 0) {
            list.innerHTML = "<p style='text-align:center; padding:40px;'>Votre panier est vide.</p>";
            this.calculateTotal(); 
            return;
        }
        list.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" style="width:70px; height:80px; object-fit:cover; border-radius:5px;">
                <div style="flex:1; padding-left:15px;">
                    <h4 style="margin:0;">${item.name}</h4>
                    <p style="margin:5px 0;">${item.price} $</p>
                    <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                        <button onclick="app.changeQty(${item.id}, -1)" class="qty-btn">-</button>
                        <b>${item.quantity}</b>
                        <button onclick="app.changeQty(${item.id}, 1)" class="qty-btn">+</button>
                    </div>
                </div>
                <div style="text-align:right;">
                   <p style="font-weight:bold; color:#d4af37;">${item.price * item.quantity} $</p>
                   <button onclick="app.removeFromCart(${item.id})" style="background:none; border:none; color:#e74c3c; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
        this.calculateTotal();
    },

    changeQty: function(id, delta) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity < 1) return this.removeFromCart(id);
            this.save(); this.renderCart(); this.updateCartCount();
        }
    },

    removeFromCart: function(id) {
        cart = cart.filter(item => item.id !== id);
        this.save(); this.renderCart(); this.updateCartCount();
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

    save: function() { localStorage.setItem('laura_cart', JSON.stringify(cart)); },

    // --- WHATSAPP & REÇU ---
    generateWhatsAppReceipt: function() {
        const nom = document.getElementById('lastName')?.value;
        const prenom = document.getElementById('firstName')?.value;
        const tel = document.getElementById('userPhone')?.value;
        const radioPaiement = document.querySelector('input[name="payment"]:checked');
        
        if (!nom || !prenom || !tel) return alert("Veuillez remplir vos coordonnées !");
        if (cart.length === 0) return alert("Votre panier est vide !");

        const mode = radioPaiement ? radioPaiement.value : "Non précisé";
        const total = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        const orderNum = Math.floor(1000 + Math.random() * 9000);

        let msg = `✨ *COMMANDE LMK-${orderNum}* ✨\n\n`;
        msg += `👤 *CLIENT :* ${nom.toUpperCase()} ${prenom}\n📞 *TÉL :* ${tel}\n\n📦 *PRODUITS :*\n`;
        cart.forEach(i => msg += `🔹 ${i.name} (x${i.quantity}) - ${i.price * i.quantity} $\n`);
        msg += `\n💰 *TOTAL : ${total} $* \n💳 *PAIEMENT :* ${mode}`;

        // Ouvre WhatsApp
        window.open(`https://wa.me/243XXXXXXXXX?text=${encodeURIComponent(msg)}`);

        // Affiche la facture visuelle
        this.showVisualReceipt(nom, prenom, total, orderNum, mode);
    },

    showVisualReceipt: function(nom, prenom, total, orderNum, mode) {
        const receiptHTML = `
            <div id="invoice-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; justify-content:center; align-items:center; padding:20px;">
                <div id="invoice-card" style="background:white; width:100%; max-width:450px; padding:30px; border-radius:8px; font-family:serif;">
                    <h2 style="text-align:center; color:#d4af37; letter-spacing:2px;">LMK PARFUMERIE</h2>
                    <hr>
                    <p><b>Facture N° :</b> #LMK-${orderNum}</p>
                    <p><b>Client :</b> ${nom.toUpperCase()} ${prenom}</p>
                    <table style="width:100%; margin:20px 0; border-collapse:collapse;">
                        ${cart.map(i => `<tr><td>${i.name} x${i.quantity}</td><td style="text-align:right;">${i.price * i.quantity}$</td></tr>`).join('')}
                    </table>
                    <h3 style="text-align:right; border-top:1px solid #ddd; padding-top:10px;">Total : ${total} $</h3>
                    <p style="font-size:12px; color:#777; text-align:center; margin-top:20px;">Merci pour votre achat !</p>
                    <div style="display:flex; gap:10px; margin-top:20px;">
                        <button onclick="window.print()" style="flex:1; padding:10px; background:#d4af37; color:white; border:none; cursor:pointer;">IMPRIMER</button>
                        <button onclick="document.getElementById('invoice-overlay').remove()" style="flex:1; padding:10px; background:#333; color:white; border:none; cursor:pointer;">FERMER</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', receiptHTML);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
