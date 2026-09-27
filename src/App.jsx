import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Trash2, Phone, Calendar, User, Clock, Check } from 'lucide-react';

const API_URL = "https://uyut-backend.onrender.com";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    delivery_date: ''
  });

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

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Корзина пуста!");

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_price: totalPrice
        })
      });

      if (response.ok) {
        setOrderSent(true);
        setCart([]);
      } else {
        alert("Ошибка при создании заказа");
      }
    } catch (err) {
      alert("Не удалось отправить заказ. Проверьте соединение.");
    }
  };

  if (orderSent) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl max-w-md w-full text-center border border-slate-700">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Заказ успешно оформлен!</h2>
          <p className="text-slate-400 mb-6">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
          <button 
            onClick={() => setOrderSent(false)} 
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 font-semibold rounded-xl transition"
          >
            Вернуться в меню
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Шапка */}
      <header className="bg-slate-900/80 backdrop-blur sticky top-0 z-40 border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-amber-500">Уютная Пекарня</h1>
            <p className="text-xs text-slate-400">Свежая выпечка и десерты</p>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold">{totalPrice.toLocaleString()} ₩</span>
            </div>
          </div>
        </div>
      </header>

      {/* Список товаров */}
      <main className="max-w-4xl mx-auto p-4">
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
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-xs font-bold px-2 py-1 rounded-md">
                        {product.badge}
                      </span>
                    )}
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

        {/* Корзина и форма заказа */}
        {cart.length > 0 && (
          <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="text-amber-500" />
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

            <div className="border-t border-slate-800 pt-4 mb-6 flex justify-between items-center">
              <span className="text-slate-400 font-medium">Итого:</span>
              <span className="text-2xl font-bold text-amber-500">{totalPrice.toLocaleString()} ₩</span>
            </div>

            <form onSubmit={handleOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Ваше имя</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Иван"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Номер телефона</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="tel" 
                    required 
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Дата и время доставки</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    required 
                    placeholder="Завтра к 14:00"
                    value={formData.delivery_date}
                    onChange={(e) => setFormData({...formData, delivery_date: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/10 mt-2"
              >
                Оформить заказ
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}