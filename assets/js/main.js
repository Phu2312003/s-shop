// Lấy các phần tử DOM
const searchInput = document.querySelector('.header__search-input');
const searchBtn = document.querySelector('.header__search-btn');
const searchHistoryList = document.querySelector('.header__search-history-list');

// Tải lịch sử tìm kiếm từ localStorage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Hàm cập nhật hiển thị lịch sử tìm kiếm
function updateSearchHistoryDisplay() {
    searchHistoryList.innerHTML = '';
    searchHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'header__search-history-item';
        li.innerHTML = `<a href="#">${item}</a>`;
        searchHistoryList.appendChild(li);
    });
}

// Hàm thêm từ khóa tìm kiếm mới vào lịch sử
function addToSearchHistory(term) {
    if (term.trim() === '') return;
    
    // Xóa nếu đã tồn tại
    searchHistory = searchHistory.filter(item => item !== term);
    
    // Thêm vào đầu mảng
    searchHistory.unshift(term);
    
    // Chỉ giữ lại 5 từ khóa gần nhất
    if (searchHistory.length > 5) {
        searchHistory = searchHistory.slice(0, 5);
    }
    
    // Lưu vào localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    // Cập nhật hiển thị
    updateSearchHistoryDisplay();
}

// Xử lý khi click nút tìm kiếm
searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    addToSearchHistory(searchTerm);
});

// Xử lý khi nhấn phím Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value;
        addToSearchHistory(searchTerm);
    }
});

// Hiển thị lịch sử tìm kiếm ban đầu
updateSearchHistoryDisplay();

// Các phần tử DOM cho form đăng nhập/đăng ký
const modal = document.querySelector('.modal');
const registerForm = document.querySelector('.auth-form:first-child');
const loginForm = document.querySelector('.auth-form:last-child');
const registerSwitchBtn = registerForm.querySelector('.auth-form__switch-btn');
const loginSwitchBtn = loginForm.querySelector('.auth-form__switch-btn');

// Hiển thị/Ẩn Modal
function showModal() {
    modal.classList.add('open');
}

function hideModal() {
    modal.classList.remove('open');
}

// Chuyển đổi giữa form đăng ký và đăng nhập
function switchToLogin() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
}

function switchToRegister() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

// Thêm sự kiện cho các nút
registerSwitchBtn.addEventListener('click', switchToLogin);
loginSwitchBtn.addEventListener('click', switchToRegister);

// Đóng modal khi click bên ngoài
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Đóng modal khi click nút trở lại
const backButtons = document.querySelectorAll('.auth-form__controls-back');
backButtons.forEach(button => {
    button.addEventListener('click', hideModal);
});

// Hiển thị modal khi click vào link đăng nhập/đăng ký
const loginLinks = document.querySelectorAll('.header__navbar-list-Item:last-child, .header__navbar-list-Item:nth-last-child(2)');
loginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
        // Mặc định hiển thị form đăng nhập
        switchToLogin();
    });
}); 