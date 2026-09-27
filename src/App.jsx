<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Уютная пекарня — премиум</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #06080c;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
      padding: 16px;
    }

    /* Мобильный фрейм */
    .phone {
      max-width: 390px;
      width: 100%;
      background: #0b0e14;
      border-radius: 44px;
      box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(245, 158, 11, 0.12),
        inset 0 0 0 1px rgba(255, 255, 255, 0.03);
      overflow: hidden;
      padding: 20px 18px 24px;
      position: relative;
    }

    /* Фоновые градиенты и свечение */
    .phone::before {
      content: '';
      position: absolute;
      top: -80px;
      right: -60px;
      width: 240px;
      height: 240px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    .phone > * {
      position: relative;
      z-index: 1;
    }

    /* Статус-бар */
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4px 12px;
      color: #9ca3af;
      font-size: 13px;
      font-weight: 600;
    }

    /* Шапка */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0 12px;
    }

    .logo-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      width: 38px;
      height: 38px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3);
      flex-shrink: 0;
    }

    .logo-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: #ffffff;
      text-transform: uppercase;
      line-height: 1.1;
    }

    .logo-sub {
      font-size: 9px;
      font-weight: 500;
      color: #f59e0b;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-btn {
      width: 38px;
      height: 38px;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d1d5db;
      font-size: 16px;
      cursor: pointer;
      position: relative;
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #f59e0b;
      color: #0b0e14;
      font-size: 9px;
      font-weight: 800;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0b0e14;
    }

    /* Поиск */
    .search-section {
      margin: 4px 0 14px;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .search-box {
      flex: 1;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 0 14px;
      height: 46px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .search-box input {
      background: transparent;
      border: none;
      outline: none;
      color: #f3f4f6;
      font-size: 13px;
      width: 100%;
      font-family: 'Inter', sans-serif;
    }

    .search-box input::placeholder {
      color: #6b7280;
    }

    .filter-btn {
      width: 46px;
      height: 46px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      font-size: 16px;
    }

    /* Премиум-баннер в стиле референса */
    .hero-banner {
      background: linear-gradient(135deg, #121620 0%, #1a1510 100%);
      border: 1px solid rgba(245, 158, 11, 0.2);
      border-radius: 24px;
      padding: 16px;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .hero-banner::after {
      content: '';
      position: absolute;
      right: -20px;
      bottom: -20px;
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
      border-radius: 50%;
    }

    .hero-text-sub {
      font-family: serif;
      font-style: italic;
      color: #f59e0b;
      font-size: 11px;
      letter-spacing: 0.5px;
    }

    .hero-title {
      font-size: 15px;
      font-weight: 900;
      color: #ffffff;
      text-transform: uppercase;
      line-height: 1.15;
      margin: 2px 0 6px;
      letter-spacing: 0.5px;
    }

    .hero-desc {
      font-size: 10px;
      color: #9ca3af;
      margin-bottom: 10px;
      max-width: 170px;
      line-height: 1.3;
    }

    .hero-btn {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #0b0e14;
      font-size: 10px;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      text-transform: uppercase;
    }

    .hero-img-emoji {
      font-size: 52px;
      filter: drop-shadow(0 8px 12px rgba(0,0,0,0.5));
    }

    /* Категории (иконки в кружочках) */
    .categories {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 14px;
      scrollbar-width: none;
    }

    .categories::-webkit-scrollbar {
      display: none;
    }

    .cat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .cat-circle {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: all 0.2s;
    }

    .cat-item.active .cat-circle {
      background: #f59e0b;
      border-color: #f59e0b;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .cat-name {
      font-size: 10px;
      color: #9ca3af;
      font-weight: 500;
    }

    .cat-item.active .cat-name {
      color: #fcd34d;
      font-weight: 700;
    }

    /* Заголовок секции */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 6px 0 12px;
    }

    .section-title {
      font-size: 15px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.3px;
    }

    .see-all {
      font-size: 12px;
      font-weight: 600;
      color: #f59e0b;
      cursor: pointer;
    }

    /* Карточки товаров */
    .products-scroll {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
      scrollbar-width: none;
    }

    .products-scroll::-webkit-scrollbar {
      display: none;
    }

    .product-card {
      min-width: 160px;
      width: 160px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      padding: 10px;
      position: relative;
      flex-shrink: 0;
    }

    .product-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: #f59e0b;
      color: #0b0e14;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 6px;
      z-index: 2;
    }

    .product-img-box {
      background: #141822;
      border-radius: 14px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      margin-bottom: 8px;
    }

    .product-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }

    .product-name {
      font-size: 12px;
      font-weight: 700;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .product-rating {
      font-size: 10px;
      color: #f59e0b;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 2px;
    }

    .product-desc {
      font-size: 9px;
      color: #6b7280;
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 6px;
    }

    .product-price {
      font-size: 12px;
      font-weight: 800;
      color: #fcd34d;
    }

    .mini-add-btn {
      width: 24px;
      height: 24px;
      background: #f59e0b;
      color: #0b0e14;
      border-radius: 8px;
      border: none;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* Нижний таббар в точности как на референсе */
    .bottom-nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: rgba(11, 14, 20, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 10px;
      margin-top: 14px;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      background: transparent;
      border: none;
      color: #6b7280;
      font-size: 9px;
      font-weight: 500;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
    }

    .nav-item.active {
      color: #f59e0b;
    }

    .nav-icon {
      font-size: 18px;
    }

    /* Центральная круглая кнопка заказа */
    .nav-center-btn {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0b0e14;
      font-size: 18px;
      box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
      margin-top: -22px;
      border: 4px solid #0b0e14;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <div class="phone">
    
    <!-- Статус-бар мобильного -->
    <div class="status-bar">
      <span>9:41</span>
      <div style="display: flex; gap: 4px;">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>

    <!-- Шапка приложения -->
    <div class="header">
      <div class="logo-group">
        <div class="logo-icon">👨‍🍳</div>
        <div class="logo-text">
          <div class="logo-title">Уютная Пекарня</div>
          <div class="logo-sub">Свежая выпечка</div>
        </div>
      </div>
      <div class="header-actions">
        <div class="icon-btn" title="Корзина">
          🛒
          <span class="badge">2</span>
        </div>
      </div>
    </div>

    <!-- Строка поиска -->
    <div class="search-section">
      <div class="search-box">
        <span>🔍</span>
        <input type="text" placeholder="Поиск круассанов, десертов...">
      </div>
      <div class="filter-btn">⚡</div>
    </div>

    <!-- Главный промо-баннер (в стиле референса) -->
    <div class="hero-banner">
      <div>
        <span class="hero-text-sub">Искусство вкуса</span>
        <div class="hero-title">Свежее.<br>Ароматное.<br>Незабываемое.</div>
        <div class="hero-desc">Премиальные ингредиенты. Мастерски приготовлено.</div>
        <button class="hero-btn">Заказать сейчас ›</button>
      </div>
      <div class="hero-img-emoji">🥐</div>
    </div>

    <!-- Круглые иконки категорий -->
    <div class="categories">
      <div class="cat-item active">
        <div class="cat-circle">🥐</div>
        <span class="cat-name">Круассаны</span>
      </div>
      <div class="cat-item">
        <div class="cat-circle">🍰</div>
        <span class="cat-name">Торты</span>
      </div>
      <div class="cat-item">
        <div class="cat-circle">🥧</div>
        <span class="cat-name">Пироги</span>
      </div>
      <div class="cat-item">
        <div class="cat-circle">🍪</div>
        <span class="cat-name">Печенье</span>
      </div>
      <div class="cat-item">
        <div class="cat-circle">☕</div>
        <span class="cat-name">Напитки</span>
      </div>
    </div>

    <!-- Блок популярного -->
    <div class="section-header">
      <div class="section-title">Популярное 🔥</div>
      <div class="see-all">Все ›</div>
    </div>

    <!-- Горизонтальная лента карточек товаров -->
    <div class="products-scroll">
      
      <!-- Карточка 1 -->
      <div class="product-card">
        <span class="product-badge">ХИТ</span>
        <div class="product-img-box">🥐</div>
        <div class="product-top-row">
          <div class="product-name">Миндальный круассан</div>
        </div>
        <div class="product-rating">★ 4.9 <span style="color:#6b7280; font-weight:400;">(1.2K)</span></div>
        <div class="product-desc">Слоёное тесто, франжипан, миндаль</div>
        <div class="product-footer">
          <div class="product-price">250 ₽</div>
          <button class="mini-add-btn">+</button>
        </div>
      </div>

      <!-- Карточка 2 -->
      <div class="product-card">
        <span class="product-badge" style="background:#3b82f6; color:#fff;">НОВИНКА</span>
        <div class="product-img-box">🍰</div>
        <div class="product-top-row">
          <div class="product-name">Шоколадный бриошь</div>
        </div>
        <div class="product-rating">★ 4.8 <span style="color:#6b7280; font-weight:400;">(856)</span></div>
        <div class="product-desc">Сдобное тесто, бельгийский шоколад</div>
        <div class="product-footer">
          <div class="product-price">320 ₽</div>
          <button class="mini-add-btn">+</button>
        </div>
      </div>

      <!-- Карточка 3 -->
      <div class="product-card">
        <span class="product-badge" style="background:#10b981; color:#fff;">ТОП</span>
        <div class="product-img-box">🥧</div>
        <div class="product-top-row">
          <div class="product-name">Вишневый пай</div>
        </div>
        <div class="product-rating">★ 4.7 <span style="color:#6b7280; font-weight:400;">(743)</span></div>
        <div class="product-desc">Сочная вишня, песочное тесто</div>
        <div class="product-footer">
          <div class="product-price">280 ₽</div>
          <button class="mini-add-btn">+</button>
        </div>
      </div>

    </div>

    <!-- Нижняя панель навигации (таббар) -->
    <div class="bottom-nav">
      <button class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>Главная</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">📖</span>
        <span>Меню</span>
      </button>
      <!-- Центральная кнопка заказа как на референсе -->
      <div class="nav-center-btn" title="Заказ">
        🛍️
      </div>
      <button class="nav-item">
        <span class="nav-icon">📅</span>
        <span>Столик</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">⋯</span>
        <span>Ещё</span>
      </button>
    </div>

  </div>

</body>
</html>