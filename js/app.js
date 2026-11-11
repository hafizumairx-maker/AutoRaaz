// AutoRaaz app: login, search and filters, favourites, compare, sell form.
// Data comes from js/data.js, which is loaded before this file.

let currentPage = 1;
const perPage = 8;
let filteredList = [];
let compareList = [];
let currentDetailCar = null;

// Storage helpers
function getUsers() { return JSON.parse(localStorage.getItem('autoraaz_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('autoraaz_users', JSON.stringify(u)); }
function getCurrentUser() { return JSON.parse(localStorage.getItem('autoraaz_currentUser') || 'null'); }
function setCurrentUser(u) { u ? localStorage.setItem('autoraaz_currentUser', JSON.stringify(u)) : localStorage.removeItem('autoraaz_currentUser'); }
function getUserAds() { return JSON.parse(localStorage.getItem('autoraaz_userAds') || '[]'); }
function saveUserAds(ads) { localStorage.setItem('autoraaz_userAds', JSON.stringify(ads)); }
function getFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem('autoraaz_favs_' + user.id) || '[]');
}
function saveFavorites(favs) {
    const user = getCurrentUser();
    if (!user) return;
    localStorage.setItem('autoraaz_favs_' + user.id, JSON.stringify(favs));
}
function getRecent() { return JSON.parse(localStorage.getItem('autoraaz_recent') || '[]'); }
function saveRecent(ids) { localStorage.setItem('autoraaz_recent', JSON.stringify(ids.slice(0, 8))); }
function getAllCars() { return [...originalCars, ...getUserAds()]; }

// Toast
function showToast(msg, type = 'success') {
    const c = document.getElementById('toastContainer');
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}

// Theme
function loadTheme() {
    const saved = localStorage.getItem('autoraaz_theme');
    const btn = document.getElementById('themeBtn');
    if (saved === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
    } else {
        document.body.removeAttribute('data-theme');
        btn.textContent = '🌙';
    }
}
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeBtn');
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        btn.textContent = '🌙';
        localStorage.setItem('autoraaz_theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        localStorage.setItem('autoraaz_theme', 'dark');
    }
}

// Auth
function updateAuthUI() {
    const user = getCurrentUser();
    document.getElementById('loginBtn').style.display = user ? 'none' : 'inline-block';
    document.getElementById('userInfo').classList.toggle('show', !!user);
    if (user) document.getElementById('headerUserName').textContent = user.name.split(' ')[0];
    document.getElementById('mobileLoginLink').style.display = user ? 'none' : 'block';
    document.getElementById('mobileLogoutLink').style.display = user ? 'block' : 'none';
}
function openAuthModal(tab = 'login') {
    document.getElementById('authModal').classList.add('active');
    switchAuthTab(tab);
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
}
function closeAuthModal() { document.getElementById('authModal').classList.remove('active'); }
function switchAuthTab(tab) {
    document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
    document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
    document.getElementById('loginForm').classList.toggle('active', tab === 'login');
    document.getElementById('registerForm').classList.toggle('active', tab === 'register');
}
function registerUser() {
    if (!validateRegisterForm()) {
    return;
}
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const err = document.getElementById('registerError');
    if (!name || !email || !phone || !password) { err.textContent = 'Please fill all fields'; err.style.display = 'block'; return; }
    if (password.length < 8) { err.textContent = 'Password min 8 characters'; err.style.display = 'block'; return; }
    const users = getUsers();
    if (users.find(u => u.email === email)) { err.textContent = 'Email already registered'; err.style.display = 'block'; return; }
    const newUser = { id: Date.now(), name, email, phone, password };
    users.push(newUser); saveUsers(users); setCurrentUser(newUser);
    updateAuthUI(); closeAuthModal(); showToast('Account created! Welcome ' + name);
}
function loginUser() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const err = document.getElementById('loginError');
    if (!email || !password) { err.textContent = 'Enter email & password'; err.style.display = 'block'; return; }
    const user = getUsers().find(u => u.email === email && u.password === password);
    if (!user) { err.textContent = 'Invalid email or password'; err.style.display = 'block'; return; }
    setCurrentUser(user); updateAuthUI(); closeAuthModal(); showToast('Welcome back, ' + user.name.split(' ')[0] + '!');
}
function logoutUser() { setCurrentUser(null); updateAuthUI(); showToast('Logged out', 'info'); showHome(); }

// Favorites + Compare + Recent + Render + Filters (same as previous working code)
function toggleFavorite(id, e) {
    e.stopPropagation();
    const user = getCurrentUser();
    if (!user) { openAuthModal('login'); showToast('Please login to add favorites', 'error'); return; }
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
        showToast('Removed from favorites');
    } else {
        favs.push(id);
        showToast('Added to favorites');
    }
    saveFavorites(favs);
    applyFilters();
    if (document.getElementById('favoritesView').classList.contains('active')) renderFavorites();
}
function isFavorite(id) { return getFavorites().includes(id); }

function toggleCompare(id, e) {
    e.stopPropagation();
    if (compareList.includes(id)) {
        compareList = compareList.filter(c => c !== id);
    } else {
        if (compareList.length >= 3) {
            showToast('Maximum 3 cars can be compared', 'error');
            return;
        }
        compareList.push(id);
    }
    updateCompareBar();
    applyFilters();
}
function updateCompareBar() {
    const bar = document.getElementById('compareBar');
    const sel = document.getElementById('compareSelected');
    if (compareList.length === 0) { bar.classList.remove('show'); return; }
    bar.classList.add('show');
    const cars = getAllCars().filter(c => compareList.includes(c.id));
    sel.innerHTML = cars.map(c => `<div class="compare-chip">${c.make} ${c.model} <span onclick="toggleCompare(${c.id}, event)">×</span></div>`).join('');
}
function clearCompare() { compareList = []; updateCompareBar(); applyFilters(); }
function showCompare() {
    if (compareList.length < 2) { showToast('Select at least 2 cars', 'error'); return; }
    hideAllViews();
    document.getElementById('compareView').classList.add('active');
    const cars = getAllCars().filter(c => compareList.includes(c.id));
    let html = `<table class="compare-table"><thead><tr><th>Feature</th>`;
    cars.forEach(c => { html += `<th><img src="${c.img}"><br>${c.make} ${c.model}</th>`; });
    html += `</tr></thead><tbody>`;
    const rows = [
        ['Price', c => `PKR ${c.price} Lakh`],
        ['Year', c => c.year],
        ['Mileage', c => c.km + ' km'],
        ['Fuel', c => c.fuel],
        ['Transmission', c => c.trans],
        ['City', c => c.city]
    ];
    rows.forEach(([label, fn]) => {
        html += `<tr><td><strong>${label}</strong></td>`;
        cars.forEach(c => { html += `<td>${fn(c)}</td>`; });
        html += `</tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('compareContent').innerHTML = html;
    window.scrollTo(0, 0);
}

function addToRecent(id) {
    let recent = getRecent().filter(x => x !== id);
    recent.unshift(id);
    saveRecent(recent);
}
function renderRecent() {
    const ids = getRecent();
    if (ids.length === 0) { document.getElementById('recentSection').style.display = 'none'; return; }
    const list = getAllCars().filter(c => ids.includes(c.id));
    if (list.length === 0) { document.getElementById('recentSection').style.display = 'none'; return; }
    document.getElementById('recentSection').style.display = 'block';
    document.getElementById('recentContainer').innerHTML = list.map(car => `
        <div class="car-card visible" onclick="showDetail(${car.id})">
            <button class="fav-btn ${isFavorite(car.id) ? 'active' : ''}" onclick="toggleFavorite(${car.id}, event)">${isFavorite(car.id) ? '❤️' : '🤍'}</button>
            <img src="${car.img}" loading="lazy">
            <div class="car-info">
                <h4>${car.make} ${car.model}</h4>
                <div class="price">PKR ${car.price} Lakh</div>
                <div class="details">${car.year} • ${car.km} km • ${car.city}</div>
            </div>
        </div>
    `).join('');
}

function renderCars(list, limit = null) {
    const container = document.getElementById('carsContainer');
    const noResults = document.getElementById('noResults');
    const loadMoreWrap = document.getElementById('loadMoreWrap');
    if (!list || list.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'block';
        loadMoreWrap.style.display = 'none';
        return;
    }
    noResults.style.display = 'none';
    const showList = limit ? list.slice(0, limit) : list;
    container.innerHTML = showList.map(car => `
        <div class="car-card" onclick="showDetail(${car.id})">
            <button class="compare-btn ${compareList.includes(car.id) ? 'active' : ''}" onclick="toggleCompare(${car.id}, event)">${compareList.includes(car.id) ? '✓' : '+'}</button>
            <button class="fav-btn ${isFavorite(car.id) ? 'active' : ''}" onclick="toggleFavorite(${car.id}, event)">${isFavorite(car.id) ? '❤️' : '🤍'}</button>
            <img src="${car.img}" alt="${car.make} ${car.model}" loading="lazy">
            <div class="car-info">
                <h4>${car.make} ${car.model}</h4>
                <div class="price">PKR ${car.price} Lakh</div>
                <div class="details">${car.year} • ${car.km} km • ${car.fuel} • ${car.city}</div>
            </div>
        </div>
    `).join('');
    setTimeout(() => {
        document.querySelectorAll('#carsContainer .car-card').forEach((c, i) => setTimeout(() => c.classList.add('visible'), i * 70));
    }, 30);
    loadMoreWrap.style.display = (limit && list.length > limit) ? 'block' : 'none';
}

function applyFilters() {
    let list = getAllCars();
    const search = document.getElementById('searchInput').value.toLowerCase();
    const city = document.getElementById('cityFilter').value;
    const price = document.getElementById('priceFilter').value;
    const fuel = document.getElementById('fuelFilter').value;
    const trans = document.getElementById('transFilter').value;
    const year = document.getElementById('yearFilter').value;
    const sort = document.getElementById('sortFilter').value;

    list = list.filter(car => {
        const text = (car.make + ' ' + car.model).toLowerCase();
        if (search && !text.includes(search)) return false;
        if (city && car.city !== city) return false;
        if (price && car.price > parseFloat(price)) return false;
        if (fuel && car.fuel !== fuel) return false;
        if (trans && car.trans !== trans) return false;
        if (year && car.year < parseInt(year)) return false;
        return true;
    });

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'year-desc') list.sort((a, b) => b.year - a.year);
    else if (sort === 'year-asc') list.sort((a, b) => a.year - b.year);

    filteredList = list;
    currentPage = 1;
    renderCars(list, perPage);
    renderRecent();
}

function loadMore() {
    currentPage++;
    renderCars(filteredList, currentPage * perPage);
}

function showSkeleton() {
    document.getElementById('carsContainer').innerHTML = Array(8).fill(0).map(() => `
        <div class="skeleton-card"><div class="skeleton-img"></div>
        <div class="skeleton-text"><div class="skeleton-line"></div><div class="skeleton-line price"></div><div class="skeleton-line short"></div></div></div>
    `).join('');
}

function renderSimpleGrid(data, containerId) {
    document.getElementById(containerId).innerHTML = data.map(item => `
        <div class="car-card visible" onclick="showToast('${item.make} ${item.model} - PKR ${item.price} Lakh','info')">
            <img src="${item.img}" loading="lazy">
            <div class="car-info">
                <h4>${item.make} ${item.model}</h4>
                <div class="price">PKR ${item.price} Lakh</div>
                <div class="details">${item.year} • ${item.fuel || item.km}</div>
            </div>
        </div>
    `).join('');
}

// Views
function hideAllViews() {
    document.getElementById('homeView').style.display = 'none';
    ['detailView','sellView','accountView','favoritesView','compareView','newCarsView','bikesView','autoStoreView','videosView','blogView'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
}
function showHome() {
    hideAllViews();
    document.getElementById('homeView').style.display = 'block';
    applyFilters();
    window.scrollTo(0, 0);
}
function showNewCars() {
    hideAllViews();
    document.getElementById('newCarsView').classList.add('active');
    renderSimpleGrid(newCarsData, 'newCarsContainer');
    window.scrollTo(0, 0);
}
function showBikes() {
    hideAllViews();
    document.getElementById('bikesView').classList.add('active');
    renderSimpleGrid(bikesData, 'bikesContainer');
    window.scrollTo(0, 0);
}
function showAutoStore() {
    hideAllViews();
    document.getElementById('autoStoreView').classList.add('active');
    renderSimpleGrid(autoStoreData, 'autoStoreContainer');
    window.scrollTo(0, 0);
}
function showVideos() {
    hideAllViews();
    document.getElementById('videosView').classList.add('active');
    document.getElementById('videosContainer').innerHTML = videosData.map(v => `
        <div class="content-card">
            <img src="${v.img}" alt="${v.title}">
            <div class="body">
                <h4>${v.title}</h4>
                <p>${v.desc}</p>
                <div class="meta">${v.date}</div>
            </div>
        </div>
    `).join('');
    window.scrollTo(0,0);
}
function showBlog() {
    hideAllViews();
    document.getElementById('blogView').classList.add('active');
    document.getElementById('blogContainer').innerHTML = blogData.map(b => `
        <div class="content-card">
            <img src="${b.img}" alt="${b.title}">
            <div class="body">
                <h4>${b.title}</h4>
                <p>${b.desc}</p>
                <div class="meta">${b.date}</div>
            </div>
        </div>
    `).join('');
    window.scrollTo(0,0);
}
function showDetail(id) {
    const car = getAllCars().find(c => c.id === id);
    if (!car) return;
    currentDetailCar = car;
    addToRecent(id);
    hideAllViews();
    document.getElementById('detailView').classList.add('active');
    const imgs = car.images || [car.img];
    document.getElementById('detailImage').src = imgs[0];
    document.getElementById('galleryThumbs').innerHTML = imgs.map((src, i) => `
        <img src="${src}" class="${i === 0 ? 'active' : ''}" onclick="changeGalleryImage('${src}', this)">
    `).join('');
    document.getElementById('detailTitle').textContent = car.make + ' ' + car.model;
    document.getElementById('detailPrice').textContent = 'PKR ' + car.price + ' Lakh';
    document.getElementById('detailSpecs').innerHTML = `
        <div class="spec-item"><strong>Year</strong>${car.year}</div>
        <div class="spec-item"><strong>Mileage</strong>${car.km} km</div>
        <div class="spec-item"><strong>Fuel</strong>${car.fuel}</div>
        <div class="spec-item"><strong>Transmission</strong>${car.trans}</div>
        <div class="spec-item"><strong>City</strong>${car.city}</div>
        <div class="spec-item"><strong>Make</strong>${car.make}</div>`;
    document.getElementById('detailDesc').textContent = car.desc || '';
    window.scrollTo(0, 0);
}
function changeGalleryImage(src, el) {
    document.getElementById('detailImage').src = src;
    document.querySelectorAll('#galleryThumbs img').forEach(img => img.classList.remove('active'));
    el.classList.add('active');
}
function shareOnWhatsApp() {
    if (!currentDetailCar) return;
    const text = `Check this car on AutoRaaz: ${currentDetailCar.make} ${currentDetailCar.model} - PKR ${currentDetailCar.price} Lakh`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}
function shareOnFacebook() {
    if (!currentDetailCar) return;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
}

function showSell(editId = null) {
    hideAllViews();
    document.getElementById('sellView').classList.add('active');
    document.getElementById('editAdId').value = editId || '';
    if (editId) {
        const ad = getUserAds().find(a => a.id === editId);
        if (ad) {
            document.getElementById('sellFormTitle').textContent = 'Edit Your Ad';
            document.getElementById('sellSubmitBtn').textContent = 'Update Ad';
            document.getElementById('sellMake').value = ad.make;
            document.getElementById('sellModel').value = ad.model;
            document.getElementById('sellYear').value = ad.year;
            document.getElementById('sellPrice').value = ad.price;
            document.getElementById('sellCity').value = ad.city;
            document.getElementById('sellMileage').value = ad.km;
            document.getElementById('sellFuel').value = ad.fuel;
            document.getElementById('sellTrans').value = ad.trans;
            document.getElementById('sellDesc').value = ad.desc || '';
            document.getElementById('sellPhone').value = ad.phone || '';
        }
    } else {
        document.getElementById('sellFormTitle').textContent = 'Sell Your Car on AutoRaaz';
        document.getElementById('sellSubmitBtn').textContent = 'Post Your Ad';
        document.getElementById('sellMake').value = '';
        document.getElementById('sellModel').value = '';
        document.getElementById('sellYear').value = '';
        document.getElementById('sellPrice').value = '';
        document.getElementById('sellCity').value = '';
        document.getElementById('sellMileage').value = '';
        document.getElementById('sellFuel').value = 'Petrol';
        document.getElementById('sellTrans').value = 'Automatic';
        document.getElementById('sellDesc').value = '';
    }
    window.scrollTo(0, 0);
}

function showAccount() {
    const user = getCurrentUser();
    if (!user) { openAuthModal('login'); return; }
    hideAllViews();
    document.getElementById('accountView').classList.add('active');
    document.getElementById('profileInfo').innerHTML = `
        <div class="profile-item"><strong>Name</strong>${user.name}</div>
        <div class="profile-item"><strong>Email</strong>${user.email}</div>
        <div class="profile-item"><strong>Phone</strong>${user.phone}</div>
        <div class="profile-item"><strong>Member Since</strong>${new Date(user.id).toLocaleDateString()}</div>`;
    const myAds = getUserAds().filter(a => a.userId === user.id);
    const container = document.getElementById('myAdsContainer');
    if (myAds.length === 0) {
        container.innerHTML = '<p style="opacity:0.7;">You haven\'t posted any ads yet.</p>';
    } else {
        container.innerHTML = myAds.map(car => `
            <div class="car-card visible">
                <img src="${car.img}" style="height:140px;object-fit:cover;width:100%;" onclick="showDetail(${car.id})">
                <div class="car-info">
                    <h4 onclick="showDetail(${car.id})">${car.make} ${car.model}</h4>
                    <div class="price">PKR ${car.price} Lakh</div>
                    <div class="details">${car.year} • ${car.city}</div>
                    <div class="ad-actions">
                        <button class="btn-edit" onclick="editAd(${car.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteAd(${car.id})">Delete</button>
                    </div>
                </div>
            </div>`).join('');
    }
    window.scrollTo(0, 0);
}

function editAd(id) { showSell(id); }
function deleteAd(id) {
    if (!confirm('Are you sure you want to delete this ad?')) return;
    let ads = getUserAds().filter(a => a.id !== id);
    saveUserAds(ads);
    showToast('Ad deleted successfully');
    showAccount();
}

function showFavorites() {
    const user = getCurrentUser();
    if (!user) { openAuthModal('login'); return; }
    hideAllViews();
    document.getElementById('favoritesView').classList.add('active');
    renderFavorites();
    window.scrollTo(0, 0);
}
function renderFavorites() {
    const list = getAllCars().filter(c => getFavorites().includes(c.id));
    const container = document.getElementById('favoritesContainer');
    if (list.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;opacity:0.7;">No favorites yet.</p>';
        return;
    }
    container.innerHTML = list.map(car => `
        <div class="car-card visible" onclick="showDetail(${car.id})">
            <button class="fav-btn active" onclick="toggleFavorite(${car.id}, event)">❤️</button>
            <img src="${car.img}" loading="lazy">
            <div class="car-info">
                <h4>${car.make} ${car.model}</h4>
                <div class="price">PKR ${car.price} Lakh</div>
                <div class="details">${car.year} • ${car.km} km • ${car.city}</div>
            </div>
        </div>`).join('');
}

function handlePostAd() {
    const user = getCurrentUser();
    if (!user) { openAuthModal('login'); showToast('Please login to post an ad', 'error'); return; }
    document.getElementById('sellPhone').value = user.phone || '';
    showSell();
}

function submitSellForm(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) { showToast('Please login first', 'error'); return; }
    const editId = document.getElementById('editAdId').value;
    const adData = {
        make: document.getElementById('sellMake').value,
        model: document.getElementById('sellModel').value,
        year: parseInt(document.getElementById('sellYear').value),
        price: parseFloat(document.getElementById('sellPrice').value),
        city: document.getElementById('sellCity').value,
        km: document.getElementById('sellMileage').value,
        fuel: document.getElementById('sellFuel').value,
        trans: document.getElementById('sellTrans').value,
        desc: document.getElementById('sellDesc').value || 'No description provided.',
        phone: document.getElementById('sellPhone').value,
        img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop',
        images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop']
    };

    let ads = getUserAds();
    if (editId) {
        ads = ads.map(a => a.id === parseInt(editId) ? { ...a, ...adData } : a);
        showToast('Ad updated successfully!');
    } else {
        ads.unshift({ id: Date.now(), userId: user.id, ...adData });
        showToast('Ad posted successfully!');
    }
    saveUserAds(ads);
    e.target.reset();
    document.getElementById('editAdId').value = '';
    showHome();
}

// Dropdown helpers
function filterByCity(city) {
    showHome();
    document.getElementById('cityFilter').value = city;
    document.getElementById('searchInput').value = '';
    applyFilters();
    showToast(`Showing cars in ${city}`, 'info');
    setTimeout(() => document.getElementById('carsContainer').scrollIntoView({ behavior: 'smooth' }), 300);
}
function filterByModel(model) {
    showHome();
    document.getElementById('searchInput').value = model;
    document.getElementById('cityFilter').value = '';
    applyFilters();
    showToast(`Showing ${model} cars`, 'info');
    setTimeout(() => document.getElementById('carsContainer').scrollIntoView({ behavior: 'smooth' }), 300);
}
function showFeaturedCars() {
    showHome();
    document.getElementById('searchInput').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('sortFilter').value = 'year-desc';
    applyFilters();
    showToast('Showing Featured Used Cars', 'info');
}
function validateRegisterForm() {

    const error = document.getElementById("registerError");

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value;

    const country = document.getElementById("countryCode");
    const code = country.value;

    const requiredLength =
        Number(country.options[country.selectedIndex].dataset.length);

    if (!name) {
        error.textContent = "Please enter your full name.";
        error.style.display = "block";
        return false;
    }

    if (!/^[A-Za-zÀ-ÿ\s'-]{2,50}$/.test(name)) {
        error.textContent = "Please enter a valid name.";
        error.style.display = "block";
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
        error.textContent = "Please enter a valid email address.";
        error.style.display = "block";
        return false;
    }

    if (!/^\d+$/.test(phone)) {
        error.textContent ="Phone number must contain numbers only.";
        error.style.display = "block";
        return false;
    }

    if (phone.length !== requiredLength) {
        error.textContent =
            `${code} requires exactly ${requiredLength} digits after the country code.`;
        error.style.display = "block";
        return false;
    }

    if (password.length < 8) {
        error.textContent = "Password must be at least 8 characters.";
        error.style.display = "block";
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        error.textContent = "Password must contain at least one uppercase letter.";
        error.style.display = "block";
        return false;
    }

    if (!/[a-z]/.test(password)) {
        error.textContent = "Password must contain at least one lowercase letter.";
        error.style.display = "block";
        return false;
    }

    if (!/[0-9]/.test(password)) {
        error.textContent = "Password must contain at least one number.";
        error.style.display = "block";
        return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        error.textContent = "Password must contain at least one special character.";
        error.style.display = "block";
        return false;
    }

    error.textContent = "";
    error.style.display = "none";
    return true;
}

// Other
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
    document.getElementById('mobileOverlay').classList.toggle('active');
}
function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('mobileOverlay').classList.remove('active');
}
window.addEventListener('scroll', () => {
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 400);
});
document.getElementById('authModal').addEventListener('click', function(e) {
    if (e.target === this) closeAuthModal();
});

// INIT
loadTheme();
updateAuthUI();
showSkeleton();
setTimeout(() => applyFilters(), 800);
