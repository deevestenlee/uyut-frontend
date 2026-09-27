import React, { useState } from 'react';

const TRANSLATIONS = {
  ru: {
    brandName: 'Sweet Bakery',
    brandSubtitle: 'Премиальная кондитерская',
    address: 'Сеул, Каннам-гу 12-3',
    adminLogin: '⚙️ Админ',
    adminLogout: 'Выйти',
    searchPlaceholder: 'Поиск по изысканному меню...',
    menuTitle: 'Авторская коллекция',
    cartSelected: 'Выбрано',
    itemsWord: 'тов.',
    total: 'Итого:',
    checkout: 'Оформить заказ',
    cartTitle: '🛒 Ваша корзина',
    cartEmpty: 'Ваша корзина пока пуста',
    close: 'Закрыть',
    checkoutTitle: '📋 Оформление заказа',
    checkoutSub: 'Заполните данные для доставки или самовывоза',
    yourChoice: 'Ваш выбор:',
    nameLabel: 'Ваше имя * (только буквы)',
    namePlaceholder: 'Например: Александр',
    nameError: 'Пожалуйста, используйте только буквы',
    phoneLabel: 'Номер телефона * (только цифры)',
    phonePlaceholder: '01012345678',
    phoneError: 'Пожалуйста, используйте только цифры',
    deliveryType: 'Способ получения *',
    pickup: '🏃 Самовывоз из пекарни',
    delivery: '🛵 Экспресс-доставка',
    addressLabel: 'Адрес доставки *',
    addressPlaceholder: 'Город, район, улица, дом, квартира',
    commentLabel: 'Комментарий к заказу (необязательно)',
    commentPlaceholder: 'Например: позвонить за 10 минут до прибытия...',
    confirmOrder: 'Подтвердить и отправить заказ',
    successTitle: 'Заказ успешно оформлен!',
    successDesc: 'Благодарим вас, {name}! Ваш заказ принят в работу. Мы свяжемся с вами в ближайшее время по номеру {phone}.',
    backToMenu: 'Вернуться к меню',
    bannerTitle: 'Специальное предложение',
    bannerSubtitle: 'Скидка 20% на первый заказ всей авторской выпечки по промокоду "SWEET20"',
    bannerBtn: 'Получить скидку',
    navHome: 'Домой',
    navSearch: 'Поиск',
    navFavorites: 'Нравится',
    navOrders: 'Мои заказы',
    favoritesTitle: '❤️ Избранные товары',
    favoritesEmpty: 'Список избранного пока пуст',
    ordersTitle: '📦 История заказов',
    ordersEmpty: 'У вас пока нет активных заказов',
    addToCart: 'В корзину',
    categories: {
      All: 'Все',
      Croissants: 'Круассаны',
      Cakes: 'Торты',
      Pies: 'Пироги',
      Cookies: 'Печенье',
      Drinks: 'Напитки'
    }
  },
  en: {
    brandName: 'Sweet Bakery',
    brandSubtitle: 'Premium Patisserie',
    address: 'Seoul, Gangnam-gu 12-3',
    adminLogin: '⚙️ Admin',
    adminLogout: 'Logout',
    searchPlaceholder: 'Search exquisite menu...',
    menuTitle: 'Signature Collection',
    cartSelected: 'Selected',
    itemsWord: 'items',
    total: 'Total:',
    checkout: 'Checkout',
    cartTitle: '🛒 Your Shopping Cart',
    cartEmpty: 'Your cart is currently empty',
    close: 'Close',
    checkoutTitle: '📋 Order Checkout',
    checkoutSub: 'Fill in your details for delivery or pickup',
    yourChoice: 'Your selection:',
    nameLabel: 'Your Name * (letters only)',
    namePlaceholder: 'Example: Alexander',
    nameError: 'Please use letters only',
    phoneLabel: 'Phone Number * (numbers only)',
    phonePlaceholder: '01012345678',
    phoneError: 'Please use numbers only',
    deliveryType: 'Delivery Method *',
    pickup: '🏃 Bakery Pickup',
    delivery: '🛵 Express Delivery',
    addressLabel: 'Delivery Address *',
    addressPlaceholder: 'City, district, street, building, apartment',
    commentLabel: 'Order Comment (optional)',
    commentPlaceholder: 'E.g., call 10 minutes before arrival...',
    confirmOrder: 'Confirm and Place Order',
    successTitle: 'Order Successfully Placed!',
    successDesc: 'Thank you, {name}! Your order has been accepted. We will contact you shortly at {phone}.',
    backToMenu: 'Back to Menu',
    bannerTitle: 'Special Offer',
    bannerSubtitle: 'Enjoy 20% off your first order of signature pastries with promo code "SWEET20"',
    bannerBtn: 'Claim Discount',
    navHome: 'Home',
    navSearch: 'Search',
    navFavorites: 'Favorites',
    navOrders: 'My Orders',
    favoritesTitle: '❤️ Favorite Items',
    favoritesEmpty: 'Your favorites list is empty',
    ordersTitle: '📦 Order History',
    ordersEmpty: 'You have no active orders yet',
    addToCart: 'Add to Cart',
    categories: {
      All: 'All',
      Croissants: 'Croissants',
      Cakes: 'Cakes',
      Pies: 'Pies',
      Cookies: 'Cookies',
      Drinks: 'Drinks'
    }
  },
  ko: {
    brandName: 'Sweet Bakery',
    brandSubtitle: '프리미엄 베이커리',
    address: '서울 강남구 12-3',
    adminLogin: '⚙️ 관리자',
    adminLogout: '로그아웃',
    searchPlaceholder: '프리미엄 메뉴 검색...',
    menuTitle: '시그니처 컬렉션',
    cartSelected: '선택됨',
    itemsWord: '개',
    total: '합계:',
    checkout: '주문하기',
    cartTitle: '🛒 장바구니',
    cartEmpty: '장바구니가 비어 있습니다',
    close: '닫기',
    checkoutTitle: '📋 주문하기',
    checkoutSub: '배송 또는 픽업 정보를 입력해주세요',
    yourChoice: '선택한 상품:',
    nameLabel: '이름 * (문자만)',
    namePlaceholder: '예: 홍길동',
    nameError: '문자만 입력해주세요',
    phoneLabel: '전화번호 * (숫자만)',
    phonePlaceholder: '01012345678',
    phoneError: '숫자만 입력해주세요',
    deliveryType: '수령 방법 *',
    pickup: '🏃 매장 픽업',
    delivery: '🛵 특급 배달',
    addressLabel: '배달 주소 *',
    addressPlaceholder: '도시, 구, 도로명, 건물명, 호실',
    commentLabel: '요청사항 (선택)',
    commentPlaceholder: '예: 도착 10분 전에 전화주세요...',
    confirmOrder: '주문 확정하기',
    successTitle: '주문이 완료되었습니다!',
    successDesc: '감사합니다, {name}님! 주문이 성공적으로 접수되었습니다. {phone} 번호로 곧 연락드리겠습니다.',
    backToMenu: '메뉴로 돌아가기',
    bannerTitle: '스페셜 이벤트',
    bannerSubtitle: '프로모션 코드 "SWEET20" 입력 시 첫 주문 20% 할인 혜택을 드립니다',
    bannerBtn: '할인 받기',
    navHome: '홈',
    navSearch: '검색',
    navFavorites: '즐겨찾기',
    navOrders: '주문내역',
    favoritesTitle: '❤️ 즐겨찾기 상품',
    favoritesEmpty: '즐겨찾기한 상품이 없습니다',
    ordersTitle: '📦 주문 내역',
    ordersEmpty: '진행 중인 주문이 없습니다',
    addToCart: '담기',
    categories: {
      All: '전체',
      Croissants: '크루아상',
      Cakes: '케이크',
      Pies: '파이',
      Cookies: '쿠키',
      Drinks: '음료'
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = TRANSLATIONS[lang];

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [clientAddress, setClientAddress] = useState('');
  const [clientComment, setClientComment] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [myOrdersList, setMyOrdersList] = useState([]);

  // База товаров с переводами названий и описаний на 3 языка (RU, EN, KO)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      translations: {
        ru: { name: 'Миндальный круассан', desc: 'Изысканное слоёное тесто на французском масле, нежный крем франжипан, отборный миндаль высшего сорта' },
        en: { name: 'Almond Croissant', desc: 'Exquisite puff pastry with French butter, delicate frangipane cream, and select premium almonds' },
        ko: { name: '아몬드 크루아상', desc: '프랑스 버터로 만든 바삭한 페이스트리와 부드러운 프랑지판 크림, 엄선된 아몬드가 들어간 프리미엄 크루아상' }
      },
      category: 'Круассаны', 
      price: 4500, 
      oldPrice: 5000,
      rating: '4.9', 
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', 
      badge: 'ХИТ' 
    },
    { 
      id: 2, 
      translations: {
        ru: { name: 'Шоколадный бриошь', desc: 'Пышное сдобное тесто ручной работы, настоящее бельгийское какао и кусочки темного премиального шоколада' },
        en: { name: 'Chocolate Brioche', desc: 'Fluffy handmade enriched dough, authentic Belgian cocoa, and chunks of premium dark chocolate' },
        ko: { name: '초콜릿 브리오슈', desc: '정성껏 만든 부드러운 브리오슈 반죽에 벨기에산 코코아와 다크 초콜릿 칩이 가득한 달콤한 빵' }
      },
      category: 'Торты', 
      price: 5500, 
      oldPrice: 6500,
      rating: '4.8', 
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', 
      badge: 'НОВИНКА' 
    },
    { 
      id: 3, 
      translations: {
        ru: { name: 'Ванильный тарт с ягодами', desc: 'Песочная хрустящая основа, заварной крем с бурбонской ванилью и свежие сезонные лесные ягоды' },
        en: { name: 'Vanilla Berry Tart', desc: 'Crispy shortcrust pastry, custard with bourbon vanilla, and fresh seasonal wild berries' },
        ko: { name: '바닐라 베리 타르트', desc: '바삭한 타르트 시트 위에 부드러운 바닐라 커스터드 크림과 신선한 제철 산딸기를 올린 디저트' }
      },
      category: 'Пироги', 
      price: 7200, 
      oldPrice: 8000,
      rating: '5.0', 
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80', 
      badge: 'ПРЕМИУМ' 
    }
  ]);

  const [newTitleRu, setNewTitleRu] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleKo, setNewTitleKo] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newCat, setNewCat] = useState('Круассаны');
  const [newDescRu, setNewDescRu] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newBadge, setNewBadge] = useState('ХИТ');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewImage(reader.result);
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
      alert('Неверный пароль! (подсказка: 1234)');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitleRu || !newPrice) return;
    const newItem = {
      id: Date.now(),
      translations: {
        ru: { name: newTitleRu, desc: newDescRu || 'Свежая элитная выпечка ручной работы' },
        en: { name: newTitleEn || newTitleRu, desc: newDescRu || 'Fresh handmade artisanal pastry' },
        ko: { name: newTitleKo || newTitleRu, desc: newDescRu || '신선한 수제 프리미엄 베이커리' }
      },
      category: newCat,
      price: Number(newPrice),
      oldPrice: newOldPrice ? Number(newOldPrice) : null,
      rating: '5.0',
      image: newImage || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      badge: newBadge
    };
    setProducts([newItem, ...products]);
    setNewTitleRu('');
    setNewTitleEn('');
    setNewTitleKo('');
    setNewPrice('');
    setNewOldPrice('');
    setNewDescRu('');
    setNewImage('');
    alert('Товар успешно добавлен на витрину!');
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    const onlyNums = val.replace(/\D/g, '');
    setPhoneError(val !== onlyNums);
    setClientPhone(onlyNums);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    const onlyLetters = val.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    setNameError(val !== onlyLetters);
    setClientName(onlyLetters);
  };

  const toggleFavorite = (item, e) => {
    if (e) e.stopPropagation();
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const filteredProducts = products.filter(item => {
    const matchesCat = activeCategory === 'Все' || item.category === activeCategory;
    const currentName = (item.translations[lang]?.name || item.translations.ru.name).toLowerCase();
    const matchesSearch = currentName.includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const addToCart = (item, e) => {
    if (e) e.stopPropagation();
    setCart([...cart, item]);
  };
  
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!clientName || clientPhone.length < 5) {
      alert('Пожалуйста, заполните корректно Имя и Телефон.');
      return;
    }
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: totalPrice,
      name: clientName,
      phone: clientPhone,
      deliveryType: deliveryType,
      address: clientAddress
    };
    setMyOrdersList([newOrder, ...myOrdersList]);
    setOrderSuccess(true);
  };

  return (
    <div style={{
      background: '#0b0e14', minHeight: '100dvh', width: '100%',
      fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
      margin: 0, padding: '16px 16px 130px 16px', color: '#fff', overflowX: 'hidden'
    }}>
      
      {/* 1. ПРЕМИАЛЬНОЕ МОДАЛЬНОЕ ОКНО УВЕЛИЧЕННОГО ТОВАРА */}
      {selectedProductModal && (
        <div 
          onClick={() => setSelectedProductModal(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
            background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)',
            zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '24px', width: '100%', maxWidth: '420px', overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)', position: 'relative', boxSizing: 'border-box'
            }}
          >
            <button 
              type="button" 
              onClick={() => setSelectedProductModal(null)}
              style={{
                position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)',
                border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%',
                fontSize: '16px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <div style={{ width: '100%', height: '240px', background: '#0b0e14', position: 'relative' }}>
              <img src={selectedProductModal.image} alt={selectedProductModal.translations[lang]?.name || selectedProductModal.translations.ru.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {selectedProductModal.badge && (
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#0b0e14', fontSize: '10px', fontWeight: '900', padding: '4px 10px', borderRadius: '8px', textTransform: 'uppercase' }}>
                  {selectedProductModal.badge}
                </div>
              )}
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#fff' }}>
                  {selectedProductModal.translations[lang]?.name || selectedProductModal.translations.ru.name}
                </h2>
                <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '700', background: 'rgba(245,158,11,0.1)', padding: '4px 8px', borderRadius: '8px' }}>
                  ★ {selectedProductModal.rating}
                </div>
              </div>

              <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#9ca3af', lineHeight: '1.5' }}>
                {selectedProductModal.translations[lang]?.desc || selectedProductModal.translations.ru.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: '#fcd34d' }}>
                    {selectedProductModal.price.toLocaleString()} ₩
                  </div>
                  {selectedProductModal.oldPrice && (
                    <div style={{ fontSize: '11px', color: '#6b7280', textDecoration: 'line-through' }}>
                      {selectedProductModal.oldPrice.toLocaleString()} ₩
                    </div>
                  )}
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    addToCart(selectedProductModal);
                    setSelectedProductModal(null);
                  }}
                  style={{
                    background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px',
                    padding: '12px 24px', fontWeight: '900', fontSize: '13px', cursor: 'pointer'
                  }}
                >
                  {t.addToCart} 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Модальное окно просмотра корзины */}
      {showCartModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box', marginTop: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.cartTitle}</h3>
              <button type="button" onClick={() => setShowCartModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#9ca3af', padding: '20px', fontSize: '13px' }}>{t.cartEmpty}</div>
            ) : (
              <>
                <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '250px', overflowY: 'auto' }}>
                  {cart.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                      <span>{item.translations[lang]?.name || item.translations.ru.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</span>
                        <button type="button" onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 'bold', fontSize: '14px' }}>
                  <span>{t.total}</span>
                  <span style={{ color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => { setShowCartModal(false); setShowCheckoutModal(true); }}
                  style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', width: '100%', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  {t.checkout} ➔
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. Успешное оформление заказа */}
      {orderSuccess && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
        }}>
          <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '360px', textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#fcd34d' }}>{t.successTitle}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#9ca3af', lineHeight: '1.4' }}>
              {t.successDesc.replace('{name}', clientName).replace('{phone}', clientPhone)}
            </p>
            <button 
              type="button"
              onClick={() => {
                setCart([]);
                setOrderSuccess(false);
                setShowCheckoutModal(false);
                setClientName('');
                setClientPhone('');
                setClientAddress('');
                setClientComment('');
                setActiveTab('orders');
              }}
              style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', width: '100%', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
            >
              {t.navOrders}
            </button>
          </div>
        </div>
      )}

      {/* 4. Модальное окно оформления заказа */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.95)', backdropFilter: 'blur(8px)',
          zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
          padding: '20px 16px', boxSizing: 'border-box', overflowY: 'auto'
        }}>
          <div style={{
            background: '#141822', border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '420px', boxSizing: 'border-box', marginTop: '20px', marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#fcd34d' }}>{t.checkoutTitle}</h3>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{t.checkoutSub}</span>
              </div>
              <button type="button" onClick={() => setShowCheckoutModal(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ background: '#0b0e14', borderRadius: '12px', padding: '10px', marginBottom: '16px', maxHeight: '150px', overflowY: 'auto' }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>{t.yourChoice}</div>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>{item.translations[lang]?.name || item.translations.ru.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{item.price.toLocaleString()} ₩</span>
                    <button type="button" onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontWeight: 'bold', fontSize: '13px' }}>
                <span>{t.total}</span>
                <span style={{ color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</span>
              </div>
            </div>

            <form onSubmit={handleSendOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.nameLabel}</label>
                <input 
                  type="text" placeholder={t.namePlaceholder} value={clientName} onChange={handleNameChange}
                  style={{ width: '100%', background: '#0b0e14', border: nameError ? '1px solid #ef4444' : '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                />
                {nameError && <span style={{ fontSize: '10px', color: '#ef4444', marginTop: '3px', display: 'block' }}>{t.nameError}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.phoneLabel}</label>
                <input 
                  type="text" placeholder={t.phonePlaceholder} value={clientPhone} onChange={handlePhoneChange}
                  style={{ width: '100%', background: '#0b0e14', border: phoneError ? '1px solid #ef4444' : '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                />
                {phoneError && <span style={{ fontSize: '10px', color: '#ef4444', marginTop: '3px', display: 'block' }}>{t.phoneError}</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.deliveryType}</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" onClick={() => setDeliveryType('pickup')}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'pickup' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'pickup' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {t.pickup}
                  </button>
                  <button 
                    type="button" onClick={() => setDeliveryType('delivery')}
                    style={{ flex: 1, padding: '10px', borderRadius: '10px', border: deliveryType === 'delivery' ? '1px solid #f59e0b' : '1px solid #334155', background: deliveryType === 'delivery' ? 'rgba(245, 158, 11, 0.15)' : '#0b0e14', color: '#fff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {t.delivery}
                  </button>
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.addressLabel}</label>
                  <input 
                    type="text" placeholder={t.addressPlaceholder} value={clientAddress} onChange={e => setClientAddress(e.target.value)}
                    style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }} required 
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{t.commentLabel}</label>
                <textarea 
                  placeholder={t.commentPlaceholder} value={clientComment} onChange={e => setClientComment(e.target.value)}
                  style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', boxSizing: 'border-box', outline: 'none', minHeight: '50px' }} 
                />
              </div>

              <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '6px' }}>
                {t.confirmOrder}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Верхняя панель: Переключатель языков и Вход админа */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px 8px', fontSize: '11px', color: '#9ca3af' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ru', 'en', 'ko'].map((itemLang) => (
            <button 
              key={itemLang}
              type="button"
              onClick={() => setLang(itemLang)}
              style={{
                background: lang === itemLang ? '#f59e0b' : 'rgba(255,255,255,0.05)',
                color: lang === itemLang ? '#0b0e14' : '#9ca3af',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase'
              }}
            >
              {itemLang}
            </button>
          ))}
        </div>

        {!isAdminLoggedIn ? (
          <button 
            type="button"
            onClick={() => setShowLoginModal(true)}
            style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
          >
            {t.adminLogin}
          </button>
        ) : (
          <button 
            type="button"
            onClick={() => setIsAdminLoggedIn(false)}
            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
          >
            {t.adminLogout}
          </button>
        )}
      </div>

      {/* Модальное окно входа */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh',
          background: 'rgba(6, 8, 12, 0.9)', backdropFilter: 'blur(6px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box'
        }}>
          <form onSubmit={handleLogin} style={{ background: '#141822', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#fff' }}>Вход для администратора</h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '11px', color: '#9ca3af' }}>Пароль по умолчанию: 1234</p>
            <input 
              type="password" placeholder="Пароль" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
              style={{ width: '100%', background: '#0b0e14', border: '1px solid #334155', borderRadius: '10px', padding: '10px 12px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', marginBottom: '14px', outline: 'none' }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => setShowLoginModal(false)} style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px', fontSize: '13px', cursor: 'pointer' }}>Отмена</button>
              <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Войти</button>
            </div>
          </form>
        </div>
      )}

      {/* Админ-панель с возможностью ввода на разных языках */}
      {isAdminLoggedIn && (
        <div style={{ background: '#141822', border: '1px solid #f59e0b', borderRadius: '16px', padding: '14px', marginBottom: '14px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#f59e0b' }}>✨ Добавить товар (с мультиязычным описанием)</h3>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="text" placeholder="Название (RU)" value={newTitleRu} onChange={e => setNewTitleRu(e.target.value)}
              style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} required
            />
            <input 
              type="text" placeholder="Название (EN - English)" value={newTitleEn} onChange={e => setNewTitleEn(e.target.value)}
              style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
            />
            <input 
              type="text" placeholder="Название (KO - 한국어)" value={newTitleKo} onChange={e => setNewTitleKo(e.target.value)}
              style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="number" placeholder="Цена (₩)" value={newPrice} onChange={e => setNewPrice(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }} required
              />
              <input 
                type="number" placeholder="Старая цена (₩)" value={newOldPrice} onChange={e => setNewOldPrice(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                value={newCat} onChange={e => setNewCat(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
              >
                <option value="Круассаны">Круассаны</option>
                <option value="Торты">Торты</option>
                <option value="Пироги">Пироги</option>
                <option value="Печенье">Печенье</option>
                <option value="Напитки">Напитки</option>
              </select>
              <select 
                value={newBadge} onChange={e => setNewBadge(e.target.value)}
                style={{ flex: 1, background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
              >
                <option value="ХИТ">Ленточка: ХИТ</option>
                <option value="НОВИНКА">Ленточка: НОВИНКА</option>
                <option value="ПРЕМИУМ">Ленточка: ПРЕМИУМ</option>
              </select>
            </div>
            <input 
              type="text" placeholder="Описание товара (на русском)" value={newDescRu} onChange={e => setNewDescRu(e.target.value)}
              style={{ background: '#0b0e14', border: '1px solid #334155', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px', outline: 'none' }}
            />
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Фото с устройства:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: '11px', color: '#9ca3af', width: '100%' }} />
            </div>
            <button type="submit" style={{ background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '8px', padding: '10px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', marginTop: '4px' }}>
              Добавить товар
            </button>
          </form>
        </div>
      )}

      {/* Шапка бренда */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '46px', height: '46px', 
            background: 'linear-gradient(135deg, #fcd34d 0%, #d97706 100%)', 
            borderRadius: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)', border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <span style={{ fontSize: '14px', lineHeight: '1' }}>👑</span>
            <span style={{ fontSize: '10px', fontWeight: '900', color: '#0b0e14', letterSpacing: '-0.5px' }}>SB</span>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', background: 'linear-gradient(90deg, #fff, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t.brandName}
            </div>
            <div style={{ fontSize: '10px', fontWeight: '600', color: '#f59e0b', letterSpacing: '0.5px' }}>{t.brandSubtitle}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#fcd34d', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', padding: '4px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📞</span> 010-1234-5678
          </div>
          <div style={{ fontSize: '10px', fontWeight: '500', color: '#9ca3af', textAlign: 'right' }}>
            📍 {t.address}
          </div>
        </div>
      </div>

      {/* АКЦИОННЫЙ БАННЕР */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '18px',
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '70px', opacity: 0.15, pointerEvents: 'none' }}>🥐</div>
        <div style={{ zIndex: 1, maxWidth: '75%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ background: '#f59e0b', color: '#0b0e14', fontSize: '9px', fontWeight: '900', padding: '2px 6px', borderRadius: '6px', textTransform: 'uppercase' }}>АКЦИЯ</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#fcd34d' }}>{t.bannerTitle}</span>
          </div>
          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', lineHeight: '1.4' }}>
            {t.bannerSubtitle}
          </p>
        </div>
        <button 
          type="button"
          onClick={() => {
            setActiveTab('home');
            setActiveCategory('Все');
          }}
          style={{
            zIndex: 1, background: '#f59e0b', color: '#0b0e14', border: 'none', borderRadius: '10px',
            padding: '8px 12px', fontWeight: '800', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
          }}
        >
          {t.bannerBtn}
        </button>
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      {activeTab === 'home' && (
        <>
          <div style={{ margin: '4px 0 14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '0 14px', height: '46px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>🔍</span>
              <input 
                type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f3f4f6', fontSize: '14px', width: '100%' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
            {[
              { key: 'Все', label: t.categories.All, icon: '🌟' },
              { key: 'Круассаны', label: t.categories.Croissants, icon: '🥐' },
              { key: 'Торты', label: t.categories.Cakes, icon: '🍰' },
              { key: 'Пироги', label: t.categories.Pies, icon: '🥧' },
              { key: 'Печенье', label: t.categories.Cookies, icon: '🍪' },
              { key: 'Напитки', label: t.categories.Drinks, icon: '☕' }
            ].map((catObj) => {
              const isActive = activeCategory === catObj.key;
              return (
                <div 
                  key={catObj.key} onClick={() => setActiveCategory(catObj.key)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}
                >
                  <div style={{ width: '48px', height: '48px', background: isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${isActive ? '#f59e0b' : 'rgba(255, 255, 255, 0.06)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', transition: '0.2s' }}>
                    {catObj.icon}
                  </div>
                  <span style={{ fontSize: '11px', color: isActive ? '#fcd34d' : '#9ca3af', fontWeight: isActive ? '700' : '500' }}>{catObj.label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0 12px' }}>
            <div style={{ fontSize: '16px', fontWeight: '800' }}>{t.menuTitle} ({filteredProducts.length}) ✨</div>
          </div>

          {/* Список товаров с переводом названий и описаний */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', paddingBottom: '20px' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => {
                const isFavorite = favorites.some(fav => fav.id === item.id);
                const currentName = item.translations[lang]?.name || item.translations.ru.name;
                const currentDesc = item.translations[lang]?.desc || item.translations.ru.desc;

                return (
                  <div key={item.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                    
                    {item.badge && (
                      <div style={{ position: 'absolute', top: '8px', left: '0', background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: '#0b0e14', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '0 8px 8px 0', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', zIndex: 2, textTransform: 'uppercase' }}>
                        {item.badge}
                      </div>
                    )}

                    <button 
                      type="button"
                      onClick={(e) => toggleFavorite(item, e)}
                      style={{
                        position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)',
                        border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, fontSize: '13px'
                      }}
                    >
                      {isFavorite ? '❤️' : '🤍'}
                    </button>

                    <div 
                      onClick={() => setSelectedProductModal(item)}
                      style={{ height: '130px', width: '100%', overflow: 'hidden', background: '#141822', position: 'relative', cursor: 'pointer' }}
                    >
                      <img src={item.image} alt={currentName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', right: '6px', bottom: '6px', background: 'rgba(0,0,0,0.6)', borderRadius: '6px', padding: '2px 6px', fontSize: '11px' }}>🔍</div>
                    </div>

                    <div style={{ padding: '10px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentName}</div>
                      <div style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700', marginBottom: '3px' }}>★ {item.rating}</div>
                      <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '8px', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{currentDesc}</div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#fcd34d' }}>{item.price.toLocaleString()} ₩</span>
                          {item.oldPrice && (
                            <span style={{ fontSize: '9px', color: '#6b7280', textDecoration: 'line-through' }}>{item.oldPrice.toLocaleString()} ₩</span>
                          )}
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => addToCart(item, e)}
                          style={{ width: '28px', height: '28px', background: '#f59e0b', color: '#0b0e14', borderRadius: '8px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: 'span 2', textAlign: 'center', color: '#6b7280', padding: '30px', fontSize: '13px' }}>
                Ничего не найдено 😢
              </div>
            )}
          </div>
        </>
      )}

      {/* ВКЛАДКА ПОИСК */}
      {activeTab === 'search' && (
        <div style={{ padding: '10px 0' }}>
          <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>🔍 {t.navSearch}</h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', padding: '0 14px', height: '46px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span>🔍</span>
            <input 
              type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#f3f4f6', fontSize: '14px', width: '100%' }} 
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {products.filter(item => (item.translations[lang]?.name || item.translations.ru.name).toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
              <div key={item.id} onClick={() => setSelectedProductModal(item)} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: '120px' }}><img src={item.image} alt={item.translations[lang]?.name || item.translations.ru.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                <div style={{ padding: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.translations[lang]?.name || item.translations.ru.name}</div>
                  <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold', marginTop: '4px' }}>{item.price.toLocaleString()} ₩</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ВКЛАДКА ИЗБРАННОЕ */}
      {activeTab === 'favorites' && (
        <div style={{ padding: '10px 0' }}>
          <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.favoritesTitle}</h2>
          {favorites.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px', fontSize: '14px' }}>
              {t.favoritesEmpty} 🤍
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
              {favorites.map(item => (
                <div key={item.id} onClick={() => setSelectedProductModal(item)} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ height: '120px' }}><img src={item.image} alt={item.translations[lang]?.name || item.translations.ru.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.translations[lang]?.name || item.translations.ru.name}</div>
                    <div style={{ fontSize: '12px', color: '#fcd34d', fontWeight: 'bold', marginTop: '4px' }}>{item.price.toLocaleString()} ₩</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ВКЛАДКА МОИ ЗАКАЗЫ */}
      {activeTab === 'orders' && (
        <div style={{ padding: '10px 0' }}>
          <h2 style={{ fontSize: '18px', color: '#fcd34d', marginBottom: '14px' }}>{t.ordersTitle}</h2>
          {myOrdersList.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px', fontSize: '14px' }}>
              {t.ordersEmpty} 📦
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {myOrdersList.map(order => (
                <div key={order.id} style={{ background: '#141822', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '16px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '12px', color: '#9ca3af' }}>
                    <span>Заказ #{order.id.toString().slice(-6)}</span>
                    <span>{order.date}</span>
                  </div>
                  <div style={{ marginBottom: '10px', fontSize: '13px' }}>
                    {order.items.map((it, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '4px' }}>
                        <span>• {it.translations[lang]?.name || it.translations.ru.name}</span>
                        <span style={{ color: '#fcd34d' }}>{it.price.toLocaleString()} ₩</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                    <span>{t.total}</span>
                    <span style={{ color: '#fcd34d' }}>{order.total.toLocaleString()} ₩</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* НИЖНЯЯ ПЛАШКА КОРЗИНЫ */}
      {cart.length > 0 && activeTab !== 'orders' && (
        <div style={{
          position: 'fixed', bottom: '74px', left: '16px', right: '16px',
          background: 'rgba(20, 24, 34, 0.98)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(245, 158, 11, 0.5)', borderRadius: '16px', padding: '12px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box', zIndex: 1000,
          boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
        }}>
          <div onClick={() => setShowCartModal(true)} style={{ cursor: 'pointer' }}>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>{t.cartSelected}: {cart.length} {t.itemsWord}</div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#fcd34d' }}>{totalPrice.toLocaleString()} ₩</div>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCheckoutModal(true);
            }}
            style={{ 
              background: '#f59e0b', color: '#0b0e14', border: 'none', 
              padding: '10px 20px', borderRadius: '10px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' 
            }}
          >
            {t.checkout} ➔
          </button>
        </div>
      )}

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px',
        background: '#141822', borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        zIndex: 1500, boxSizing: 'border-box', padding: '0 8px'
      }}>
        {[
          { key: 'home', label: t.navHome, icon: '🏠' },
          { key: 'search', label: t.navSearch, icon: '🔍' },
          { key: 'favorites', label: t.navFavorites, icon: '❤️', count: favorites.length },
          { key: 'orders', label: t.navOrders, icon: '📦', count: myOrdersList.length }
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 1, position: 'relative',
                color: isActive ? '#f59e0b' : '#9ca3af', padding: '6px 0'
              }}
            >
              <span style={{ fontSize: '18px', marginBottom: '2px' }}>{tab.icon}</span>
              <span style={{ fontSize: '10px', fontWeight: isActive ? '800' : '500' }}>{tab.label}</span>
              {tab.count > 0 && (
                <span style={{
                  position: 'absolute', top: '4px', right: '22%', background: '#f59e0b', color: '#0b0e14',
                  fontSize: '9px', fontWeight: '900', width: '15px', height: '15px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}