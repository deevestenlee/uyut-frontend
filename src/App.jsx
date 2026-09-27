import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Trash2, Phone, Calendar, User, Check, Lock, LogOut, ShieldCheck, ShoppingCart } from 'lucide-react';

const API_URL = "https://uyut-backend.onrender.com";

export default function App() {
  // --- Состояние ролей и авторизации ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // --- Состояния приложения ---
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // Для списка заказов админа
  const [loading, setLoading] = useState(true);
  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    delivery_date: ''
  });

  // Проверка сохраненной сессии админа
  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Загрузка меню
  useEffect(() => {
    fetch(`${API_URL}/api/menu`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки меню:", err);
        setLoading(false);
      });
  }, []);

  // Вход для админа (Пароль по умолчанию: admin123)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowLoginModal(false);
      setAdminPassword('');
      setAuthError('');
    } else {
      setAuthError('Неверный пароль!');
    }
  };

  // Выход из режима админа
  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Логика корзины
  const addToCart = (product, variant) => {
    const cartItemId = `${product.id}-${variant.size}`;
    const existing = cart.find((item) => item.cartItemId === cartItemId);
    if (existing) {
      setCart(cart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, count: item.count + 1 } : item
      ));
    } else {
      setCart([...cart, {
        cartItemId,
        id: product.id,
        title: product.title,
        size: variant.size,
        price: variant.price,
        count: 1
      }]);
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCount = (cartItemId, delta) => {
    setCart(cart.map((item) => {
      if (item.cartItemId === cartItemId) {
        const newCount = item.count + delta;
        return newCount > 0 ? { ...item, count: newCount } : item;
      }
      return item;
    }));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  // Отправка заказа клиентом
  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Корзина пуста!");

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_price: totalPrice,
          items: cart
        })
      });

      if (response.ok) {
        setOrderSent(true);
        setCart([]);
      } else {
        alert("Ошибка при создании заказа");
      }
    } catch (err) {
      alert("Не удалось отправить заказ.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* --- ШАПКА --- */}
      <header className="bg-slate-900/80 backdrop-blur sticky top-0 z-40 border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-amber-500">Уютная Пекарня</h1>
            <p className="text-xs text-slate-400">
              {isAdmin ? "Панель Администратора" : "Заказ онлайн"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Иконка корзины для клиента */}
            {!isAdmin && (
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold">{totalPrice.toLocaleString()} ₩</span>
              </div>
            )}

            {/* Кнопка смены роли */}
            {isAdmin ? (
              <button 
                onClick={handleAdminLogout}
                className="flex items-center gap-1.5 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20"
              >
                <LogOut className="w-3.5 h-3.5" />
                Выйти из Админки
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                Войти как Админ
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
      <main className="max-w-4xl mx-auto p-4">
        {/* Баннер режима Админа */}
        {isAdmin && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-500" />
              <div>
                <div className="font-bold text-sm text-amber-400">Режим Администратора активен</div>
                <div className="text-xs text-slate-400">Вы имеете доступ к управлению и настройкам.</div>
              </div>
            </div>
          </div>
        )}

        {/* Экран успещного заказа */}
        {orderSent ? (
          <div className="bg-slate-900 p-8 rounded-2xl text-center border border-slate-800 my-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Заказ успешно оформлен!</h2>
            <p className="text-slate-400 mb-6">Мы свяжемся с вами в ближайшее время.</p>
            <button 
              onClick={() => setOrderSent(false)} 
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 font-semibold rounded-xl text-slate-950 transition"
            >
              Вернуться к меню
            </button>
          </div>
        ) : (
          /* Список товаров (Витрина) */
          <div>
            <h2 className="text-lg font-bold mb-4 text-slate-300">Наше Меню</h2>
            {loading ? (
              <div className="text-center py-12 text-slate-400">Загрузка меню...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-slate-400">Товары пока не добавлены</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 bg-slate-800">
                        <img 
                          src={product.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500'} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{product.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">{product.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="text-xs text-slate-400 mb-2 font-medium">Варианты:</div>
                      <div className="space-y-2">
                        {product.variants?.map((variant) => (
                          <div key={variant.id} className="flex items-center justify-between bg-slate-800/50 p-2 rounded-xl border border-slate-800">
                            <span className="text-sm font-medium">{variant.size}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-amber-400">{variant.price.toLocaleString()} ₩</span>
                              <button 
                                onClick={() => addToCart(product, variant)}
                                className="p-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Корзина только для обычных пользователей */}
            {!isAdmin && cart.length > 0 && (
              <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ShoppingCart className="text-amber-500" />
                  Ваш заказ
                </h2>

                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between bg-slate-800/40 p-3 rounded-xl">
                      <div>
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-slate-400">Размер: {item.size}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                          <button onClick={() => updateCount(item.cartItemId, -1)} className="px-2 py-0.5 hover:bg-slate-700 rounded text-xs">-</button>
                          <span className="text-xs font-bold">{item.count}</span>
                          <button onClick={() => updateCount(item.cartItemId, 1)} className="px-2 py-0.5 hover:bg-slate-700 rounded text-xs">+</button>
                        </div>
                        <span className="text-sm font-bold text-amber-400 w-20 text-right">
                          {(item.price * item.count).toLocaleString()} ₩
                        </span>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-slate-500 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      required 
                      placeholder="Ваше имя"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                      className="bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-amber-500"
                    />
                    <input 
                      type="tel" 
                      required 
                      placeholder="Телефон (010-...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-amber-500"
                    />
                    <input 
                      type="text" 
                      required 
                      placeholder="Дата и время"
                      value={formData.delivery_date}
                      onChange={(e) => setFormData({...formData, delivery_date: e.target.value})}
                      className="bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/10 mt-2"
                  >
                    Заказать за {totalPrice.toLocaleString()} ₩
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- МОДАЛЬНОЕ ОКНО ВХОДА ДЛЯ АДМИНА --- */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full relative">
            <h3 className="text-lg font-bold text-center mb-1">Вход Администратора</h3>
            <p className="text-xs text-slate-400 text-center mb-4">Введите пароль доступа</p>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password"
                placeholder="Пароль..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
              {authError && <p className="text-red-400 text-xs text-center">{authError}</p>}
              
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowLoginModal(false)}
                  className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl transition text-sm"
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm"
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}