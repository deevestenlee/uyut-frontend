import React, { useState, useEffect } from 'react';

const translations = {
  RU: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'домашняя выпечка',
    address: '📍 Сеул, Каннам-гу 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: 'Поиск...',
    allCategories: 'Все',
    addToCart: 'В корзину +',
    loginBtn: 'Login',
    exitBtn: 'Exit',
    editBannerTitle: '🖼️ Управление баннером',
    uploadBannerLabel: 'Загрузить новый баннер (заменит текущий):',
    removeBannerBtn: 'Удалить баннер',
    adminEditMenuTitle: '🛠️ Управление меню и товарами',
    editItem: 'Редактировать',
    deleteItem: 'Удалить',
    saveChanges: 'Сохранить изменения',
    addNewItemBtn: '+ Добавить товар',
    addNewCatBtn: '+ Добавить категорию',
    dishNamePlaceholder: 'Название блюда',
    pricePlaceholder: 'Новая цена (₩)',
    oldPricePlaceholder: 'Старая цена (₩)',
    descPlaceholder: 'Описание',
    photoLabel: 'Фото (файл или ссылка):',
    addButton: 'Добавить в меню',
    addCatButton: 'Создать категорию',
    catNamePlaceholder: 'Название категории',
    cancel: 'Отмена',
    checkoutTitle: '📋 Оформление заказа',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Alexander',
    phoneLabel: 'Телефон (010-****-****) *',
    deliveryTypeLabel: 'Способ получения *',
    pickup: '🏃 Самовывоз',
    delivery: '🛵 Доставка',
    addressLabel: 'Адрес доставки *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: 'Комментарий',
    commentPlaceholder: 'Пожелания...',
    confirmButton: 'Подтвердить заказ ➔',
    selectedItems: 'Выбрано тов.',
    total: 'Итого:',
    checkoutBtn: 'Оформить ➔',
    homeTab: 'Домой',
    searchTab: 'Поиск',
    likesTab: 'Нравится',
    ordersTab: 'Мои заказы',
    emptyLikes: 'В разделе «Нравится» пока ничего нет ❤️',
    emptyOrders: 'История заказов пуста 📦',
    orderHistoryTitle: '📦 История ваших заказов',
    orderDate: 'Дата и время:',
    statusCompleted: 'Принят в работу ✅',
    adminLoginTitle: 'Вход для администратора',
    adminPasswordPlaceholder: 'Введите пароль',
    login: 'Войти',
    badgeHit: 'ХИТ',
    badgeNew: 'НОВИНКА',
    badgePrem: 'ПРЕМИУМ',
    notFound: 'Ничего не найдено 😢',
    menuMain: 'Главная',
    menuPromos: 'Акции',
    menuContacts: 'Контакты',
    menuAbout: 'О нас',
    aboutText: 'Sweet Bakery — семейная пекарня в самом сердце Сеула. Мы готовим для вас традиционную французскую выпечку по авторским рецептам, используя только натуральные и свежие ингредиенты премиум-класса каждый день.',
    contactsText: 'Мы ждем вас ежедневно с 09:00 до 21:00 по адресу: Сеул, Каннам-гу 12-3. Телефон для предзаказа: 010-1234-5678.',
    promoSectionTitle: '✨ Специальные предложения и акции'
  },
  EN: {
    bakeryName: 'Sweet Bakery',
    bakerySub: 'home baking',
    address: '📍 Seoul, Gangnam-gu 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: 'Search...',
    allCategories: 'All',
    addToCart: 'Add to cart +',
    loginBtn: 'Login',
    exitBtn: 'Exit',
    editBannerTitle: '🖼️ Banner Management',
    uploadBannerLabel: 'Upload new banner (replaces current):',
    removeBannerBtn: 'Remove banner',
    adminEditMenuTitle: '🛠️ Menu & Item Management',
    editItem: 'Edit',
    deleteItem: 'Delete',
    saveChanges: 'Save changes',
    addNewItemBtn: '+ Add item',
    addNewCatBtn: '+ Add category',
    dishNamePlaceholder: 'Dish name',
    pricePlaceholder: 'New price (₩)',
    oldPricePlaceholder: 'Old price (₩)',
    descPlaceholder: 'Description',
    photoLabel: 'Photo (file or URL):',
    addButton: 'Add to menu',
    addCatButton: 'Create category',
    catNamePlaceholder: 'Category name',
    cancel: 'Cancel',
    checkoutTitle: '📋 Checkout',
    nameLabel: 'Your name *',
    namePlaceholder: 'Alexander',
    phoneLabel: 'Phone (010-****-****) *',
    deliveryTypeLabel: 'Delivery method *',
    pickup: '🏃 Pickup',
    delivery: '🛵 Delivery',
    addressLabel: 'Delivery address *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: 'Comment',
    commentPlaceholder: 'Wishes...',
    confirmButton: 'Confirm order ➔',
    selectedItems: 'Selected items',
    total: 'Total:',
    checkoutBtn: 'Checkout ➔',
    homeTab: 'Home',
    searchTab: 'Search',
    likesTab: 'Favorites',
    ordersTab: 'My Orders',
    emptyLikes: 'No favorite items yet ❤️',
    emptyOrders: 'Order history is empty 📦',
    orderHistoryTitle: '📦 Your Order History',
    orderDate: 'Date & Time:',
    statusCompleted: 'Accepted ✅',
    adminLoginTitle: 'Admin Login',
    adminPasswordPlaceholder: 'Enter password',
    login: 'Log in',
    badgeHit: 'HIT',
    badgeNew: 'NEW',
    badgePrem: 'PREMIUM',
    notFound: 'Nothing found 😢',
    menuMain: 'Home',
    menuPromos: 'Promotions',
    menuContacts: 'Contacts',
    menuAbout: 'About us',
    aboutText: 'Sweet Bakery is a family bakery in the heart of Seoul. We bake traditional French pastries using only premium natural ingredients every day.',
    contactsText: 'We are open daily from 09:00 to 21:00 at Seoul, Gangnam-gu 12-3. Phone: 010-1234-5678.',
    promoSectionTitle: '✨ Special Offers & Promos'
  },
  KO: {
    bakeryName: 'Sweet Bakery',
    bakerySub: '홈 베이킹',
    address: '📍 서울 강남구 12-3',
    phone: '📞 010-1234-5678',
    searchPlaceholder: '검색...',
    allCategories: '전체',
    addToCart: '담기 +',
    loginBtn: 'Login',
    exitBtn: '나가기',
    editBannerTitle: '🖼️ 배너 관리',
    uploadBannerLabel: '새 배너 업로드 (기존 교체):',
    removeBannerBtn: '배너 삭제',
    adminEditMenuTitle: '🛠️ 메뉴 및 상품 관리',
    editItem: '수정',
    deleteItem: '삭제',
    saveChanges: '저장',
    addNewItemBtn: '+ 상품 추가',
    addNewCatBtn: '+ 카테고리 추가',
    dishNamePlaceholder: '상품명',
    pricePlaceholder: '새 가격 (₩)',
    oldPricePlaceholder: '할인 전 가격 (₩)',
    descPlaceholder: '설명',
    photoLabel: '사진 (파일 또는 URL):',
    addButton: '추가하기',
    addCatButton: '카테고리 생성',
    catNamePlaceholder: '카테고리 이름',
    cancel: '취소',
    checkoutTitle: '📋 주문하기',
    nameLabel: '이름 *',
    namePlaceholder: 'Alexander',
    phoneLabel: '전화번호 (010-****-****) *',
    deliveryTypeLabel: '수령 방법 *',
    pickup: '🏃 픽업',
    delivery: '🛵 배달',
    addressLabel: '주소 *',
    addressPlaceholder: 'Seoul, Gangnam-gu...',
    commentLabel: '요청사항',
    commentPlaceholder: '요청사항...',
    confirmButton: '주문 확정 ➔',
    selectedItems: '선택됨',
    total: '합계:',
    checkoutBtn: '결제하기 ➔',
    homeTab: '홈',
    searchTab: '검색',
    likesTab: '찜',
    ordersTab: '내 주문',
    emptyLikes: '찜한 상품이 없습니다 ❤️',
    emptyOrders: '주문 내역이 없습니다 📦',
    orderHistoryTitle: '📦 주문 내역',
    orderDate: '날짜:',
    statusCompleted: '접수 완료 ✅',
    adminLoginTitle: '관리자 로그인',
    adminPasswordPlaceholder: '비밀번호 입력',
    login: '로그인',
    badgeHit: '인기',
    badgeNew: '신메뉴',
    badgePrem: '프리미엄',
    notFound: '검색 결과가 없습니다 😢',
    menuMain: '홈',
    menuPromos: '이벤트',
    menuContacts: '연락처',
    menuAbout: '소개',
    aboutText: '스위트 베이커리는 서울 중심부에 위치한 홈 베이커리입니다. 매일 신선한 천연 재료로 정성껏 빵을 굽습니다.',
    contactsText: '매일 오전 9시부터 오후 9시까지 운영합니다. 주소: 서울 강남구 12-3. 전화: 010-1234-5678.',
    promoSectionTitle: '✨ 스페셜 이벤트 및 프로모션'
  }
};

export default function App() {
  const [lang, setLang] = useState('RU');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Все');
  
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const resetViewportZoom = () => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0');
      setTimeout(() => {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }, 50);
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (isSearchActive && !e.target.closest('.search-container')) {
        setIsSearchActive(false);
        resetViewportZoom();
      }
      if (showBurgerMenu && !e.target.closest('.burger-menu-container')) {
        setShowBurgerMenu(false);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isSearchActive, showBurgerMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowBottomNav(false);
      } else {
        setShowBottomNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [customLogo] = useState('🧁');
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  const [categories, setCategories] = useState(['Круассаны', 'Торты', 'Пироги', 'Печенье', 'Напитки']);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBadge, setNewBadge] = useState('ХИТ');

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('010');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');

  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setPasswordInput('');
    } else {
      alert('Неверный пароль!');
    }
  };

  const handleExit = () => {
    setIsAdminLoggedIn(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || newPrice === '') return;
    const newItem = {
      id: Date.now(),
      names: { RU: newTitle, EN: newTitle, KO: newTitle },
      category: newCat,
      price: Number(newPrice) || 0,
      oldPrice: newOldPrice !== '' ? Number(newOldPrice) : null,
      rating: 5.0,
      descs: { RU: newDesc || 'Домашняя выпечка', EN: newDesc || 'Home baking', KO: newDesc || '홈 베이킹' },
      image: newImage || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      badge: newBadge
    };
    setProducts([newItem, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewOldPrice('');
    setNewDesc('');
    setNewImage('');
    setShowAddModal(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    if (!categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
    }
    setNewCategoryName('');
    setShowAddCatModal(false);
  };

  const handleSaveEditedProduct = (e) => {
    e.preventDefault();
    const updated = {
      ...editingProduct,
      price: editingProduct.price !== '' ? Number(editingProduct.price) : 0,
      oldPrice: editingProduct.oldPrice !== '' && editingProduct.oldPrice !== null ? Number(editingProduct.oldPrice) : null
    };
    setProducts(products.map(p => p.id === updated.id ? updated : p));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Удалить этот товар из меню?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const [products, setProducts] = useState([
    { 
      id: 1, 
      names: { RU: 'Миндальный круассан', EN: 'Almond Croissant', KO: '아몬드 크루아상' },
      category: 'Круассаны', 
      price: 4500, 
      oldPrice: 5000,
      rating: 4.9, 
      descs: { 
        RU: 'Изысканное слоеное тесто на французском масле с нежным франжипаном...', 
        EN: 'Crispy pastry made with French butter and smooth frangipane cream...', 
        KO: '프랑스 버터로 만든 바삭한 페이스트리와 부드러운 프랑지판 크림...' 
      },
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', 
      badge: 'ХИТ' 
    },
    { 
      id: 2, 
      names: { RU: 'Шоколадный бриошь', EN: 'Chocolate Brioche', KO: '초콜릿 브리오슈' },
      category: 'Торты', 
      price: 5500, 
      oldPrice: 6500,
      rating: 4.8, 
      descs: { 
        RU: 'Пышное сдобное тесто ручной работы, бельгийский шоколад и какао...', 
        EN: 'Soft handmade brioche dough with Belgian cocoa...', 
        KO: '정성껏 만든 부드러운 브리오슈 반죽에 벨기에산 코코아...' 
      },
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', 
      badge: 'НОВИНКА' 
    }
  ]);

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (!val.startsWith('010')) {
      val = '010' + val.replace(/^0+/, '');
    }
    if (val.length > 11) val = val.slice(0, 11);
    let formatted = '010';
    if (val.length > 3) formatted += '-' + val.slice(3, 7);
    if (val.length > 7) formatted += '-' + val.slice(7, 11);
    setClientPhone(formatted);
  };

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁㄱ-ㅎㅏ-ㅣ가-힣\s]/g, '');
    setClientName(val);
  };

  const toggleLike = (productId) => {
    if (likes.includes(productId)) {
      setLikes(likes.filter(id => id !== productId));
    } else {
      setLikes([...likes, productId]);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (productId) => {
    const existing = cart.find(item => item.id === productId);
    if (existing.quantity > 1) {
      setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
    } else {
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 13) {
      alert('Заполните имя и телефон.');
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: Date.now(),
      date: dateStr,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      clientName,
      clientPhone,
      deliveryType,
      clientAddress
    };

    setOrdersHistory([newOrder, ...ordersHistory]);
    setCart([]);
    setShowCheckoutModal(false);
    setActiveTab('orders');
    alert('Заказ успешно оформлен!');
  };

  const filteredProducts = products.filter(item => {
    const itemName = item.names[lang] || item.names['RU'];
    const matchesCat = activeCategory === 'Все' || activeCategory === 'All' || activeCategory === '전체' || item.category === activeCategory;
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 110px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;500;600&display=swap');
        .premium-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px !important;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #ffffff;
          white-space: nowrap;
          line-height: 1.1;
        }
        .premium-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 10px !important;
          color: #fcd34d;
          font-weight: 400;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
      `}</style>

      {/* МОДАЛКА ПРОСМОТРА ТОВАРА */}
      {selectedProduct && (
        <div onClick={() => setSelectedProduct(null)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.92)', backdropFilter: 'blur(10px)',
          zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '24px', padding: '20px', width: '100%', maxWidth: '380px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)', position: 'relative'
          }}>
            <button onClick={() => setSelectedProduct(null)} style={{
              position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer'
            }}>✕</button>

            <div style={{ width: '100%', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', border: '1px solid rgba(245,158,11,0.2)' }}>
              <img src={selectedProduct.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#fff' }}>
              {selectedProduct.names[lang] || selectedProduct.names['RU']}
            </h2>

            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              {selectedProduct.descs[lang] || selectedProduct.descs['RU']}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#fcd34d' }}>{selectedProduct.price.toLocaleString()} ₩</div>
                {selectedProduct.oldPrice && (
                  <div style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'line-through' }}>{selectedProduct.oldPrice.toLocaleString()} ₩</div>
                )}
              </div>
              <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} style={{
                background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer'
              }}>
                {t.addToCart}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛКА РЕДАКТИРОВАНИЯ ТОВАРА ДЛЯ АДМИНА */}
      {editingProduct && (
        <div onClick={() => setEditingProduct(null)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)',
          zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '380px', maxHeight: '90dvh', overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.editItem}</h3>
            <form onSubmit={handleSaveEditedProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder={t.dishNamePlaceholder} value={editingProduct.names[lang] || editingProduct.names['RU']} onChange={(e) => {
                const val = e.target.value;
                setEditingProduct({...editingProduct, names: {...editingProduct.names, [lang]: val}});
              }} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" inputMode="numeric" placeholder={t.pricePlaceholder} value={editingProduct.price !== null ? editingProduct.price : ''} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
                <input type="text" inputMode="numeric" placeholder={t.oldPricePlaceholder} value={editingProduct.oldPrice !== null ? editingProduct.oldPrice : ''} onChange={(e) => setEditingProduct({...editingProduct, oldPrice: e.target.value})} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <textarea placeholder={t.descPlaceholder} value={editingProduct.descs[lang] || editingProduct.descs['RU']} onChange={(e) => {
                const val = e.target.value;
                setEditingProduct({...editingProduct, descs: {...editingProduct.descs, [lang]: val}});
              }} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', minHeight: '60px' }} />

              <div>
                <label style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.photoLabel}</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (img) => setEditingProduct({...editingProduct, image: img}))} style={{ fontSize: '11px', color: '#fff', marginBottom: '4px' }} />
                <input type="text" placeholder="URL картинки" value={editingProduct.image} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setEditingProduct(null)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.cancel}</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.saveChanges}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА ОФОРМЛЕНИЯ ЗАКАЗА */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.checkoutTitle}</h3>
              <button onClick={() => setShowCheckoutModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '130px', overflowY: 'auto' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>{item.names[lang] || item.names['RU']} (x{item.quantity})</span>
                  <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()} ₩</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontWeight: 'bold', fontSize: '13px' }}>
                <span>{t.total}</span>
                <span style={{ color: '#fcd34d' }}>{totalCartPrice.toLocaleString()} ₩</span>
              </div>
            </div>

            <form onSubmit={handleSendOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.nameLabel}</label>
                <input type="text" placeholder={t.namePlaceholder} value={clientName} onChange={handleNameChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.phoneLabel}</label>
                <input type="text" value={clientPhone} onChange={handlePhoneChange} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.deliveryTypeLabel}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setDeliveryType('pickup')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'pickup' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'pickup' ? 'rgba(245,158,11,0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.pickup}</button>
                  <button type="button" onClick={() => setDeliveryType('delivery')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'delivery' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'delivery' ? 'rgba(245,158,11,0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{t.delivery}</button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.addressLabel}</label>
                  <input type="text" placeholder={t.addressPlaceholder} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.commentLabel}</label>
                <textarea placeholder={t.commentPlaceholder} value={clientComment} onChange={(e) => setClientComment(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', minHeight: '50px' }} />
              </div>

              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                {t.confirmButton}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА ВХОДА АДМИНИСТРАТОРА */}
      {showLoginModal && (
        <div onClick={() => setShowLoginModal(false)} style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)',
          zIndex: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#141822', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '320px', boxSizing: 'border-box'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#fcd34d' }}>{t.adminLoginTitle}</h3>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="password" placeholder={t.adminPasswordPlaceholder} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} autoFocus />
              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                {t.login}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ШАПКА ПРИЛОЖЕНИЯ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        
        {/* Логотип и Название */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px', height: '38px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            {customLogo}
          </div>
          <div>
            <h1 className="premium-title" style={{ margin: 0 }}>{t.bakeryName}</h1>
            <p className="premium-subtitle" style={{ margin: 0 }}>{t.bakerySub}</p>
          </div>
        </div>

        {/* Управление и Переключатели (Язык, Админка, Бургер) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Выбор языка */}
          <div style={{ display: 'flex', background: '#141822', borderRadius: '8px', padding: '2px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {['RU', 'EN', 'KO'].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? '#f59e0b' : 'transparent',
                color: lang === l ? '#0b0e14' : '#9ca3af',
                border: 'none', padding: '4px 6px', borderRadius: '6px', fontSize: '10px',
                fontWeight: 'bold', cursor: 'pointer'
              }}>
                {l}
              </button>
            ))}
          </div>

          {/* Кнопка Входа / Выхода Админа */}
          {!isAdminLoggedIn ? (
            <button onClick={() => setShowLoginModal(true)} style={{
              background: '#141822', border: '1px solid #334155', color: '#9ca3af',
              padding: '6px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer'
            }}>
              {t.loginBtn}
            </button>
          ) : (
            <button onClick={handleExit} style={{
              background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#f87171',
              padding: '6px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer'
            }}>
              {t.exitBtn}
            </button>
          )}

          {/* Бургер меню */}
          <div className="burger-menu-container" style={{ position: 'relative' }}>
            <button onClick={() => setShowBurgerMenu(!showBurgerMenu)} style={{
              background: '#141822', border: '1px solid #334155', color: '#fff',
              width: '32px', height: '32px', borderRadius: '8px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer'
            }}>
              ☰
            </button>

            {showBurgerMenu && (
              <div style={{
                position: 'absolute', right: 0, top: '40px', background: '#141822',
                border: '1px solid #334155', borderRadius: '12px', padding: '8px',
                width: '150px', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}>
                <button onClick={() => { setActiveTab('home'); setShowBurgerMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#fff', padding: '8px', fontSize: '12px', cursor: 'pointer', borderRadius: '6px' }}>{t.menuMain}</button>
                <button onClick={() => { setActiveTab('promos'); setShowBurgerMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#fff', padding: '8px', fontSize: '12px', cursor: 'pointer', borderRadius: '6px' }}>{t.menuPromos}</button>
                <button onClick={() => { setActiveTab('contacts'); setShowBurgerMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#fff', padding: '8px', fontSize: '12px', cursor: 'pointer', borderRadius: '6px' }}>{t.menuContacts}</button>
                <button onClick={() => { setActiveTab('about'); setShowBurgerMenu(false); }} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#fff', padding: '8px', fontSize: '12px', cursor: 'pointer', borderRadius: '6px' }}>{t.menuAbout}</button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* БАННЕР / ГЛАВНАЯ ВКЛАДКА */}
      {activeTab === 'home' && (
        <>
          {/* Блок адреса и контактов */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '12px', padding: '0 4px' }}>
            <span>{t.address}</span>
            <span>{t.phone}</span>
          </div>

          {/* Баннер */}
          {bannerImage && (
            <div style={{ width: '100%', height: '140px', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px', position: 'relative', border: '1px solid rgba(245,158,11,0.2)' }}>
              <img src={bannerImage} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* Панель администратора (если вошел) */}
          {isAdminLoggedIn && (
            <div style={{ background: '#141822', border: '1px dashed #f59e0b', borderRadius: '14px', padding: '12px', marginBottom: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => setShowAddModal(true)} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                {t.addNewItemBtn}
              </button>
              <button onClick={() => setShowAddCatModal(true)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>
                {t.addNewCatBtn}
              </button>
            </div>
          )}

          {/* Поиск и категории */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button onClick={() => setActiveCategory('Все')} style={{
              background: activeCategory === 'Все' ? '#f59e0b' : '#141822',
              color: activeCategory === 'Все' ? '#0b0e14' : '#fff',
              border: '1px solid #334155', padding: '6px 12px', borderRadius: '10px',
              fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer'
            }}>
              {t.allCategories}
            </button>
            {categories.map((cat, idx) => (
              <button key={idx} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? '#f59e0b' : '#141822',
                color: activeCategory === cat ? '#0b0e14' : '#fff',
                border: '1px solid #334155', padding: '6px 12px', borderRadius: '10px',
                fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', cursor: 'pointer'
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Сетка товаров */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{
                background: '#141822', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                justify: 'space-between', position: 'relative'
              }}>
                
                {/* Картинка и бейдж */}
                <div onClick={() => setSelectedProduct(product)} style={{ width: '100%', height: '110px', position: 'relative', cursor: 'pointer' }}>
                  <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {product.badge && (
                    <span style={{
                      position: 'absolute', top: '8px', left: '8px', background: '#f59e0b',
                      color: '#0b0e14', fontSize: '9px', fontWeight: '900', padding: '2px 6px',
                      borderRadius: '6px'
                    }}>
                      {product.badge}
                    </span>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }} style={{
                    position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)',
                    border: 'none', borderRadius: '50%', width: '28px', height: '28px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    color: likes.includes(product.id) ? '#ef4444' : '#fff', fontSize: '13px'
                  }}>
                    {likes.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                {/* Информация */}
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '700', color: '#fff', lineHeight: '1.2' }}>
                      {product.names[lang] || product.names['RU']}
                    </h3>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '900', color: '#fcd34d' }}>{product.price.toLocaleString()} ₩</span>
                      {product.oldPrice && (
                        <span style={{ fontSize: '10px', color: '#6b7280', textDecoration: 'line-through' }}>{product.oldPrice.toLocaleString()} ₩</span>
                      )}
                    </div>

                    <button onClick={() => addToCart(product)} style={{
                      width: '100%', background: '#f59e0b', color: '#0b0e14', border: 'none',
                      padding: '8px', borderRadius: '10px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer'
                    }}>
                      {t.addToCart}
                    </button>

                    {isAdminLoggedIn && (
                      <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                        <button onClick={() => setEditingProduct(product)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '4px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>{t.editItem}</button>
                        <button onClick={() => handleDeleteProduct(product.id)} style={{ flex: 1, background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', padding: '4px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>{t.deleteItem}</button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '13px' }}>
              {t.notFound}
            </div>
          )}
        </>
      )}

      {/* ВКЛАДКА ПОИСК */}
      {activeTab === 'search' && (
        <div>
          <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', background: '#141822', border: '1px solid #334155', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', marginBottom: '14px' }} autoFocus />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {filteredProducts.map(product => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} style={{ background: '#141822', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', padding: '10px', cursor: 'pointer' }}>
                <img src={product.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{product.names[lang] || product.names['RU']}</div>
                <div style={{ fontSize: '13px', color: '#fcd34d', fontWeight: '900', marginTop: '4px' }}>{product.price.toLocaleString()} ₩</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ВКЛАДКА ИЗБРАННОЕ (НРАВИТСЯ) */}
      {activeTab === 'likes' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '14px' }}>{t.likesTab}</h2>
          {likes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '13px' }}>{t.emptyLikes}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {products.filter(p => likes.includes(p.id)).map(product => (
                <div key={product.id} onClick={() => setSelectedProduct(product)} style={{ background: '#141822', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', padding: '10px', cursor: 'pointer' }}>
                  <img src={product.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', marginBottom: '8px' }} />
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{product.names[lang] || product.names['RU']}</div>
                  <div style={{ fontSize: '13px', color: '#fcd34d', fontWeight: '900', marginTop: '4px' }}>{product.price.toLocaleString()} ₩</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ВКЛАДКА ЗАКАЗЫ */}
      {activeTab === 'orders' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '14px' }}>{t.orderHistoryTitle}</h2>
          {ordersHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: '13px' }}>{t.emptyOrders}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ordersHistory.map(order => (
                <div key={order.id} style={{ background: '#141822', border: '1px solid #334155', borderRadius: '14px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>
                    <span>{t.orderDate} {order.date}</span>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>{t.statusCompleted}</span>
                  </div>
                  <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                    {order.items.map((i, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '2px' }}>
                        <span>{i.names[lang] || i.names['RU']} (x{i.quantity})</span>
                        <span>{(i.price * i.quantity).toLocaleString()} ₩</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                    <span>{t.total}</span>
                    <span style={{ color: '#fcd34d' }}>{order.total.toLocaleString()} ₩</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ПРОМО-СТРАНИЦА */}
      {activeTab === 'promos' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '14px' }}>{t.promoSectionTitle}</h2>
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '16px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#fff' }}>🥐 Скидка 20% по утрам</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af', lineHeight: '1.5' }}>Каждый день с 09:00 до 11:00 на все свежие круассаны и кофе действует утренняя скидка.</p>
          </div>
        </div>
      )}

      {/* КОНТАКТЫ */}
      {activeTab === 'contacts' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '14px' }}>{t.menuContacts}</h2>
          <div style={{ background: '#141822', borderRadius: '16px', padding: '16px', fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>
            <p style={{ margin: '0 0 8px 0' }}>{t.address}</p>
            <p style={{ margin: '0 0 8px 0' }}>{t.phone}</p>
            <p style={{ margin: 0 }}>{t.contactsText}</p>
          </div>
        </div>
      )}

      {/* О НАС */}
      {activeTab === 'about' && (
        <div>
          <h2 style={{ fontSize: '16px', color: '#fcd34d', marginBottom: '14px' }}>{t.menuAbout}</h2>
          <div style={{ background: '#141822', borderRadius: '16px', padding: '16px', fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>
            <p style={{ margin: 0 }}>{t.aboutText}</p>
          </div>
        </div>
      )}

      {/* МОДАЛКА СОЗДАНИЯ КАТЕГОРИИ */}
      {showAddCatModal && (
        <div onClick={() => setShowAddCatModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)', zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '320px', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.addNewCatBtn}</h3>
            <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder={t.catNamePlaceholder} value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => setShowAddCatModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.cancel}</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addCatButton}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛКА ДОБАВЛЕНИЯ ТОВАРА ДЛЯ АДМИНА */}
      {showAddModal && (
        <div onClick={() => setShowAddModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(8px)', zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '380px', maxHeight: '90dvh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', color: '#fcd34d' }}>{t.addNewItemBtn}</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder={t.dishNamePlaceholder} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" inputMode="numeric" placeholder={t.pricePlaceholder} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} required />
                <input type="text" inputMode="numeric" placeholder={t.oldPricePlaceholder} value={newOldPrice} onChange={(e) => setNewOldPrice(e.target.value)} style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              <select value={newCat} onChange={(e) => setNewCat(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box' }}>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>

              <textarea placeholder={t.descPlaceholder} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', minHeight: '60px' }} />

              <div>
                <label style={{ fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>{t.photoLabel}</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewImage)} style={{ fontSize: '11px', color: '#fff', marginBottom: '4px' }} />
                <input type="text" placeholder="URL картинки" value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '8px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.cancel}</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>{t.addButton}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* НИЖНЯЯ ПАНЕЛЬ КОРЗИНЫ И НАВИГАЦИИ */}
      {showBottomNav && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#141822',
          borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 16px', boxSizing: 'border-box',
          zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          {cart.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '8px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#fff' }}>{t.selectedItems}: {cart.reduce((s, i) => s + i.quantity, 0)}</span>
                <span style={{ fontSize: '13px', fontWeight: '900', color: '#fcd34d' }}>{totalCartPrice.toLocaleString()} ₩</span>
              </div>
              <button onClick={() => setShowCheckoutModal(true)} style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                {t.checkoutBtn}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: activeTab === 'home' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '10px' }}>
              <span style={{ fontSize: '16px' }}>🏠</span> {t.homeTab}
            </button>
            <button onClick={() => setActiveTab('search')} style={{ background: 'transparent', border: 'none', color: activeTab === 'search' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '10px' }}>
              <span style={{ fontSize: '16px' }}>🔍</span> {t.searchTab}
            </button>
            <button onClick={() => setActiveTab('likes')} style={{ background: 'transparent', border: 'none', color: activeTab === 'likes' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '10px', position: 'relative' }}>
              <span style={{ fontSize: '16px' }}>❤️</span> {t.likesTab}
              {likes.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '10px', background: '#f59e0b', color: '#0b0e14', fontSize: '9px', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{likes.length}</span>}
            </button>
            <button onClick={() => setActiveTab('orders')} style={{ background: 'transparent', border: 'none', color: activeTab === 'orders' ? '#f59e0b' : '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', fontSize: '10px', position: 'relative' }}>
              <span style={{ fontSize: '16px' }}>📦</span> {t.ordersTab}
              {ordersHistory.length > 0 && <span style={{ position: 'absolute', top: '-2px', right: '10px', background: '#f59e0b', color: '#0b0e14', fontSize: '9px', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{ordersHistory.length}</span>}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}