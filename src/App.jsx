import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Используем ваши переменные окружения Vercel/Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Укажите логин и пароль для администратора:
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = '123'; // Замените на любой нужный пароль

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Поля авторизации
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Поля блюда
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Восточная кухня');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDishes();
  }, []);

  async function fetchDishes() {
    const { data, error } = await supabase.from('dishes').select('*');
    if (!error && data) {
      setDishes(data);
    }
  }

  // Проверка логина и пароля
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginInput === ADMIN_LOGIN && passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError('');
      setLoginInput('');
      setPasswordInput('');
    } else {
      setLoginError('Неверный логин или пароль!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!title || !price || !file) {
      alert('Заполните все поля и выберите фото');
      return;
    }

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('dish-image')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('dish-image')
        .getPublicUrl(fileName);

      const imageUrl = urlData.publicUrl;

      const { error: insertError } = await supabase.from('dishes').insert([
        {
          title,
          category,
          description,
          price: Number(price),
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert('Блюдо успешно добавлено!');
      setTitle('');
      setDescription('');
      setPrice('');
      setFile(null);
      fetchDishes();
    } catch (err) {
      alert('Ошибка при загрузке: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Шапка */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Кафе «Уют» 🍲</h2>
        
        {!isAdmin ? (
          <button 
            onClick={() => setShowLoginModal(true)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Панель администратора
          </button>
        ) : (
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Выйти из админки
          </button>
        )}
      </div>

      {/* Окно авторизации */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', width: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Вход для администратора</h3>
            {loginError && <p style={{ color: 'red', fontSize: '13px', margin: '0 0 10px 0' }}>{loginError}</p>}
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>Логин:</label>
                <input 
                  type="text" 
                  value={loginInput} 
                  onChange={(e) => setLoginInput(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>Пароль:</label>
                <input 
                  type="password" 
                  value={passwordInput} 
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => { setShowLoginModal(false); setLoginError(''); }}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer' }}
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Панель добавления (для Админа) */}
      {isAdmin && (
        <div style={{ background: '#f3f4f6', padding: '15px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ marginTop: 0, color: '#111827' }}>Добавить блюдо</h3>
          <form onSubmit={handleAddDish}>
            <input 
              type="text" 
              placeholder="Название блюда" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            >
              <option value="Восточная кухня">Восточная кухня</option>
              <option value="Европейская кухня">Европейская кухня</option>
              <option value="Напитки">Напитки</option>
              <option value="Десерты">Десерты</option>
            </select>
            <input 
              type="number" 
              placeholder="Цена (₩)" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <textarea 
              placeholder="Описание блюда" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: '10px', display: 'block' }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {loading ? 'Сохранение...' : 'Сохранить блюдо'}
            </button>
          </form>
        </div>
      )}

      {/* Список блюд */}
      <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Меню</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', padding: '12px', background: '#fff' }}>
            {dish.image_url && (
              <img src={dish.image_url} alt={dish.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
            <h4 style={{ margin: '10px 0 4px', textAlign: 'center' }}>{dish.title}</h4>
            <p style={{ fontSize: '11px', color: '#6b7280', textAlign: 'center', margin: 0 }}>{dish.category}</p>
            <p style={{ fontSize: '13px', color: '#4b5563', margin: '6px 0', textAlign: 'center' }}>{dish.description}</p>
            <p style={{ fontWeight: 'bold', textAlign: 'center', margin: '6px 0', fontSize: '15px' }}>{dish.price} ₩</p>
            <button style={{ width: '100%', padding: '8px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}