<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Уютная пекарня — премиум</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
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
      padding: 20px 18px 28px;
      position: relative;
    }

    /* Декоративное свечение за карточками */
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

    .phone::after {
      content: '';
      position: absolute;
      bottom: -40px;
      left: -40px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    /* Все элементы поверх свечения */
    .phone > * {
      position: relative;
      z-index: 1;
    }

    /* Статус-бар */
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4px 14px;
      color: #9ca3af;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.2px;
    }

    .status-left {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-icon {
      font-size: 12px;
      opacity: 0.7;
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
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3);
      flex-shrink: 0;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .logo-title {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #fcd34d;
      text-transform: uppercase;
      line-height: 1.2;
    }

    .logo-sub {
      font-size: 10px;
      font-weight: 400;
      color: #6b7280;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 1px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-btn {
      width: 42px;
      height: 42px;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d1d5db;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      flex-shrink: 0;
    }

    .icon-btn:hover {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.3);
      color: #fcd34d;
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #f59e0b;
      color: #0b0e14;
      font-size: 10px;
      font-weight: 700;
      width: 18px;
      height: 18px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #0b0e14;
      line-height: 1;
    }

    /* Поиск */
    .search-section {
      margin: 6px 0 16px;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .search-box {
      flex: 1;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 18px;
      padding: 0 16px;
      height: 52px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.25s ease;
    }

    .search-box:focus-within {
      border-color: rgba(245, 158, 11, 0.4);
      background: rgba(245, 158, 11, 0.03);
      box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.05);
    }

    .search-box .icon {
      font-size: 18px;
      color: #6b7280;
      flex-shrink: 0;
    }

    .search-box input {
      background: transparent;
      border: none;
      outline: none;
      color: #f3f4f6;
      font-size: 14px;
      font-weight: 400;
      width: 100%;
      font-family: 'Inter', sans-serif;
    }

    .search-box input::placeholder {
      color: #4b5563;
      font-weight: 400;
    }

    .filter-btn {
      width: 52px;
      height: 52px;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9ca3af;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .filter-btn:hover {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.3);
      color: #fcd34d;
    }

    /* Категории */
    .categories {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 0 0 16px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .categories::-webkit-scrollbar {
      display: none;
    }

    .category-chip {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 30px;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 500;
      color: #9ca3af;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
      letter-spacing: 0.2px;
    }

    .category-chip.active {
      background: rgba(245, 158, 11, 0.15);
      border-color: rgba(245, 158, 11, 0.4);
      color: #fcd34d;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.1);
    }

    .category-chip:hover {
      background: rgba(255, 255, 255, 0.07);
    }

    /* Заголовок секции */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 4px 0 14px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #f9fafb;
      letter-spacing: 0.2px;
    }

    .section-title span {
      color: #f59e0b;
      margin-left: 4px;
    }

    .see-all {
      font-size: 13px;
      font-weight: 500;
      color: #f59e0b;
      cursor: pointer;
      letter-spacing: 0.2px;
      transition: opacity 0.2s;
    }

    .see-all:hover {
      opacity: 0.8;
    }

    /* Сетка продуктов */
    .product-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 8px;
    }

    .product-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 24px;
      padding: 14px;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .product-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.2), transparent);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .product-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(245, 158, 11, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
    }

    .product-card:hover::before {
      opacity: 1;
    }

    .product-emoji {
      font-size: 44px;
      text-align: center;
      margin-bottom: 8px;
      display: block;
      line-height: 1.2;
      filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.3));
    }

    .product-name {
      font-size: 15px;
      font-weight: 600;
      color: #f3f4f6;
      margin-bottom: 4px;
      letter-spacing: 0.2px;
      line-height: 1.3;
    }

    .product-desc {
      font-size: 11px;
      color: #6b7280;
      font-weight: 400;
      margin-bottom: 10px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-price {
      font-size: 16px;
      font-weight: 700;
      color: #fcd34d;
      letter-spacing: 0.2px;
    }

    .product-price small {
      font-size: 11px;
      font-weight: 500;
      color: #6b7280;
      margin-left: 1px;
    }

    .add-btn {
      width: 32px;
      height: 32px;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fcd34d;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .add-btn:hover {
      background: #f59e0b;
      color: #0b0e14;
      border-color: #f59e0b;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    /* Баннер */
    .promo-banner {
      margin: 8px 0 6px;
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.03) 100%);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(245, 158, 11, 0.15);
      border-radius: 24px;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .promo-banner:hover {
      border-color: rgba(245, 158, 11, 0.3);
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(245, 158, 11, 0.05) 100%);
    }

    .promo-banner::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .promo-icon {
      font-size: 36px;
      flex-shrink: 0;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }

    .promo-content {
      flex: 1;
    }

    .promo-title {
      font-size: 15px;
      font-weight: 700;
      color: #fcd34d;
      letter-spacing: 0.3px;
      margin-bottom: 2px;
    }

    .promo-text {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 400;
      line-height: 1.4;
    }

    .promo-arrow {
      color: #f59e0b;
      font-size: 18px;
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    .promo-banner:hover .promo-arrow {
      transform: translateX(3px);
    }

    /* Отступ для нижней навигации */
    .bottom-spacer {
      height: 8px;
    }

    /* Нижняя навигация */
    .bottom-nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: rgba(15, 18, 25, 0.85);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 28px;
      padding: 10px 8px;
      margin-top: 12px;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 6px 14px;
      border-radius: 18px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #6b7280;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.3px;
      border: none;
      background: transparent;
      font-family: 'Inter', sans-serif;
    }

    .nav-item .nav-icon {
      font-size: 20px;
      line-height: 1;
    }

    .nav-item.active {
      color: #fcd34d;
      background: rgba(245, 158, 11, 0.1);
    }

    .nav-item:not(.active):hover {
      color: #9ca3af;
      background: rgba(255, 255, 255, 0.03);
    }

    /* Адаптив для маленьких экранов */
    @media (max-width: 400px) {
      .phone {
        padding: 16px 14px 22px;
        border-radius: 36px;
      }

      .logo-title {
        font-size: 13px;
        letter-spacing: 1px;
      }

      .logo-icon {
        width: 36px;
        height: 36px;
        font-size: 18px;
        border-radius: 12px;
      }

      .icon-btn {
        width: 38px;
        height: 38px;
        border-radius: 14px;
        font-size: 16px;
      }

      .search-box {
        height: 48px;
        border-radius: 16px;
        padding: 0 14px;
      }

      .filter-btn {
        width: 48px;
        height: 48px;
        border-radius: 16px;
        font-size: 18px;
      }

      .product-card {
        padding: 12px;
        border-radius: 20px;
      }

      .product-emoji {
        font-size: 36px;
      }

      .product-name {
        font-size: 13px;
      }

      .product-price {
        font-size: 14px;
      }

      .add-btn {
        width: 28px;
        height: 28px;
        border-radius: 10px;
        font-size: 14px;
      }

      .bottom-nav {
        border-radius: 24px;
        padding: 8px 4px;
      }

      .nav-item {
        padding: 4px 10px;
        font-size: 9px;
      }

      .nav-item .nav-icon {
        font-size: 18px;
      }

      .category-chip {
        padding: 8px 16px;
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <div class="phone">

    <!-- Статус-бар -->
    <div class="status-bar">
      <div class="status-left">
        <span>Оператор</span>
        <span class="status-icon">📶</span>
      </div>
      <div class="status-right">
        <span>9:41</span>
        <span class="status-icon">🔋</span>
      </div>
    </div>

    <!-- Шапка -->
    <div class="header">
      <div class="logo-group">
        <div class="logo-icon">👨‍🍳</div>
        <div class="logo-text">
          <div class="logo-title">Уютная</div>
          <div class="logo-sub">пекарня</div>
        </div>
      </div>
      <div class="header-actions">
        <div class="icon-btn" title="Корзина">
          🛒
          <span class="badge">3</span>
        </div>
        <div class="icon-btn" title="Админ-панель">
          ⚙️
        </div>
      </div>
    </div>

    <!-- Поиск -->
    <div class="search-section">
      <div class="search-box">
        <span class="icon">🔍</span>
        <input type="text" placeholder="Поиск выпечки, десертов...">
      </div>
      <div class="filter-btn" title="Фильтры">
        ⚡
      </div>
    </div>

    <!-- Категории -->
    <div class="categories">
      <div class="category-chip active">Все</div>
      <div class="category-chip">🥐 Круассаны</div>
      <div class="category-chip">🍰 Торты</div>
      <div class="category-chip">🥧 Пироги</div>
      <div class="category-chip">🍪 Печенье</div>
      <div class="category-chip">🧁 Капкейки</div>
    </div>

    <!-- Заголовок секции -->
    <div class="section-header">
      <div class="section-title">Популярное <span>🔥</span></div>
      <div class="see-all">Смотреть все</div>
    </div>

    <!-- Сетка продуктов -->
    <div class="product-grid">
      <!-- Карточка 1 -->
      <div class="product-card">
        <span class="product-emoji">🥐</span>
        <div class="product-name">Круассан классический</div>
        <div class="product-desc">Слоёный, с хрустящей корочкой и нежным маслом</div>
        <div class="product-bottom">
          <div class="product-price">189 <small>₽</small></div>
          <div class="add-btn">+</div>
        </div>
      </div>

      <!-- Карточка 2 -->
      <div class="product-card">
        <span class="product-emoji">🍰</span>
        <div class="product-name">Медовик</div>
        <div class="product-desc">Классический медовый торт с нежным кремом</div>
        <div class="product-bottom">
          <div class="product-price">349 <small>₽</small></div>
          <div class="add-btn">+</div>
        </div>
      </div>

      <!-- Карточка 3 -->
      <div class="product-card">
        <span class="product-emoji">🥧</span>
        <div class="product-name">Пирог с вишней</div>
        <div class="product-desc">Сочная вишня в песочном тесте с корицей</div>
        <div class="product-bottom">
          <div class="product-price">279 <small>₽</small></div>
          <div class="add-btn">+</div>
        </div>
      </div>

      <!-- Карточка 4 -->
      <div class="product-card">
        <span class="product-emoji">🧁</span>
        <div class="product-name">Капкейк шоколадный</div>
        <div class="product-desc">Влажный шоколадный бисквит с ганашем</div>
        <div class="product-bottom">
          <div class="product-price">159 <small>₽</small></div>
          <div class="add-btn">+</div>
        </div>
      </div>
    </div>

    <!-- Промо-баннер -->
    <div class="promo-banner">
      <div class="promo-icon">🎁</div>
      <div class="promo-content">
        <div class="promo-title">Скидка 15% на первый заказ</div>
        <div class="promo-text">По промокоду УЮТНО15 при заказе от 500 ₽</div>
      </div>
      <div class="promo-arrow">›</div>
    </div>

    <div class="bottom-spacer"></div>

    <!-- Нижняя навигация -->
    <div class="bottom-nav">
      <button class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>Главная</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">🔍</span>
        <span>Поиск</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">❤️</span>
        <span>Избранное</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">👤</span>
        <span>Профиль</span>
      </button>
    </div>

  </div>
</body>
</html>