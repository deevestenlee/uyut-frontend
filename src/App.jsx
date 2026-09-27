import React, { useState } from 'react';

// Начальный список товаров
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Тартин на закваске',
    desc: 'Хрустящая корочка, мягкий и ароматный мякиш долгого брожения',
    price: 7000,
    category: 'Выпечка',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
    tag: 'Хит',
    isAvailable: true
  },
  {
    id: 2,
    name: 'Круассан классический',
    desc: 'Воздушное слоёное тесто на натуральном сливочном масле',
    price: 4000,
    category: 'Выпечка',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    tag: 'Свежее',
    isAvailable: true
  },
  {
    id: 3,
    name: 'Борщ с говядиной',
    desc: 'Наваристый домашний борщ, подается со сметаной и зеленью',
    price: 11000,
    category: 'Домашняя еда',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    tag: 'Сытно',
    isAvailable: true
  },
  {
    id: 4,
    name: 'Торт Медовик',
    desc: 'Нежные медовые коржи со сметанно-сливочным кремом',
    price: 6500,
    category: 'Десерты',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    tag: 'Десерт',
    isAvailable: true
  }
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [cart, setCart] = useState([]);
  
  // Режим админа
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Поля формы нового товара
  const [newProduct, setNewProduct] = useState({
    name: '',
    desc: '',
    price: '',
    category: 'Выпечка',
    image: '',
    tag: ''
  });

  const categories = ['Все', 'Выпечка', 'Домашняя еда', 'Салаты', 'Десерты'];

  // Фильтрация товаров для клиентов (скрываем стоп-лист)
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'Все' || p.category === activeCategory;
    return isAdmin ? matchesCategory : (matchesCategory && p.isAvailable);
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Функция добавления товара админом
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const itemToAdd = {
      id: Date.now(),
      name: newProduct.name,
      desc: newProduct.desc || 'Описание не указано',
      price: Number(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      tag: newProduct.tag || null,
      isAvailable: true
    };

    setProducts([itemToAdd, ...products]);
    setNewProduct({ name: '', desc: '', price: '', category: 'Выпечка', image: '', tag: '' });
    setShowAddForm(false);
  };

  // Включение / выключение стоп-листа
  const toggleAvailability = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p));
  };

  // Удаление товара
  const handleDeleteProduct = (id) => {
    if (window.confirm('Удалить это блюдо из меню?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#0F172A',
      color: '#F8FAFC',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '90px',
      boxShadow: '0 0 30px rgba(0,0,0,0.5)'
    }}>
      {/* Шапка с кнопкой переключения в админку */}
      <div style={{
        position: 'relative',
        height: '180px',
        backgroundImage: 'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,1)), url("https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Панель сверху: Режим Админа */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              backgroundColor: isAdmin ? '#E11D48' : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              color: '#FFF',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {isAdmin ? '⚙️ Выйти из админки' : '🔐 Режим владельца'}
          </button>
          
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            🇰🇷 KRW (₩)
          </span>
        </div>

        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>
            {isAdmin ? '⚙️ Управление меню' : 'Uyut Bakery ✨'}
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8' }}>
            {isAdmin ? 'Панель администратора кафе' : 'Домашняя пекарня & Кухня'}
          </p>
        </div>
      </div>

      {/* Кнопка добавления нового товара (только для Админа) */}
      {isAdmin && (
        <div style={{ padding: '16px 20px 0 20px' }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              width: '100%',
              backgroundColor: showAddForm ? '#334155' : '#10B981',
              color: '#FFF',
              border: 'none',
              padding: '12px',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {showAddForm ? '❌ Отменить' : '➕ Добавить новое блюдо'}
          </button>

          {/* Форма добавления блюда */}
          {showAddForm && (
            <form onSubmit={handleAddProduct} style={{
              backgroundColor: '#1E293B',
              padding: '16px',
              borderRadius: '16px',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: '1px solid #10B981'
            }}>
              <input
                type="text"
                placeholder="Название блюда *"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Цена в вонах (например: 8000) *"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
                style={inputStyle}
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                style={inputStyle}
              >
                {categories.filter(c => c !== 'Все').map(cat => (
                  <option key={cat} value={cat} style={{ background: '#1E293B' }}>{cat}</option>
                ))}
              </select>
              <textarea
                placeholder="Описание блюда и состав"
                value={newProduct.desc}
                onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
              />
              <input
                type="text"
                placeholder="Ссылка на фото (URL)"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Бейдж (например: Хит, Свежее, Острое)"
                value={newProduct.tag}
                onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })}
                style={inputStyle}
              />

              <button
                type="submit"
                style={{
                  backgroundColor: '#10B981',
                  color: '#FFF',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '6px'
                }}
              >
                💾 Сохранить блюдо в меню
              </button>
            </form>
          )}
        </div>
      )}

      {/* Категории */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '16px 20px',
        scrollbarWidth: 'none'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 18px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: activeCategory === cat ? '#E11D48' : '#1E293B',
              color: activeCategory === cat ? '#FFFFFF' : '#94A3B8',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Список карточек */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#1E293B',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.05)',
              opacity: item.isAvailable ? 1 : 0.5
            }}
          >
            <div style={{ display: 'flex' }}>
              {/* Картинка товара */}
              <div style={{ position: 'relative', width: '120px', minWidth: '120px', height: '120px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.tag && (
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: '#E11D48',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Информация */}
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#F1F5F9' }}>
                    {item.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#38BDF8' }}>
                    {item.price.toLocaleString()} ₩
                  </span>
                  {!isAdmin && (
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        backgroundColor: '#E11D48',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      + В корзину
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ЭЛЕМЕНТЫ УПРАВЛЕНИЯ В РЕЖИМЕ АДМИНА */}
            {isAdmin && (
              <div style={{
                display: 'flex',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: '#0F172A'
              }}>
                <button
                  onClick={() => toggleAvailability(item.id)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: item.isAvailable ? '#F59E0B' : '#10B981',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {item.isAvailable ? '🚫 В стоп-лист' : '✅ Вернуть в меню'}
                </button>
                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                <button
                  onClick={() => handleDeleteProduct(item.id)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#EF4444',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  🗑 Удалить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Корзина (только для покупателей) */}
      {!isAdmin && (
        <div style={{
          position: 'fixed',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#0F172A',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              position: 'relative',
              backgroundColor: '#1E293B',
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🛒
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#E11D48',
                  color: '#FFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cart.length}
                </span>
              )}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Выбрано товаров: {cart.length}</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#F8FAFC' }}>
                {cart.length > 0 ? `${cart.reduce((s, i) => s + i.price, 0).toLocaleString()} ₩` : 'Корзина пуста'}
              </div>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            style={{
              backgroundColor: cart.length > 0 ? '#E11D48' : '#334155',
              color: cart.length > 0 ? '#FFFFFF' : '#64748B',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: cart.length > 0 ? 'pointer' : 'not-allowed'
            }}
          >
            Оформить ➔
          </button>
        </div>
      )}
    </div>
  );
}

// Вспомогательный стиль для полей ввода
const inputStyle = {
  backgroundColor: '#0F172A',
  border: '1px solid #334155',
  borderRadius: '10px',
  padding: '10px 12px',
  color: '#FFF',
  fontSize: '13px',
  outline: 'none'
};