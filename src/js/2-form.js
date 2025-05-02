// Шукаємо форму на сторінці, щоб знати, де слухати події
const form = document.querySelector('.feedback-form');

// Знаходимо поле для email і поле для повідомлення
const emailInput = form.elements.email;
const messageInput = form.elements.message;

// Це назва, під якою ми будемо зберігати дані в браузері
const STORAGE_KEY = 'feedback-form-state';

// Це коробочка (об'єкт), де ми будемо тримати наші дані
let formData = {
  email: '',   // Спочатку email — порожній
  message: ''  // І повідомлення — теж порожнє
};

// Тепер перевіримо, чи вже є щось у локальному сховищі (тобто чи ми вже щось писали раніше)
const savedData = localStorage.getItem(STORAGE_KEY);

// Якщо знайшли щось у сховищі
if (savedData) {
  try {
    // Перетворюємо з тексту назад в об'єкт
    const parsedData = JSON.parse(savedData);

    // Копіюємо ці дані в наш formData
    formData = { ...formData, ...parsedData };

    // Якщо в сховищі був email — вставляємо його в поле
    if (formData.email) {
      emailInput.value = formData.email;
    }

    // Якщо в сховищі було повідомлення — вставляємо в поле
    if (formData.message) {
      messageInput.value = formData.message;
    }
  } catch (error) {
    // Якщо сталася помилка при зчитуванні — покажемо її в консолі
    console.error('Помилка при зчитуванні з localStorage:', error);
  }
}

// Слухаємо, коли хтось щось друкує у формі
form.addEventListener('input', (event) => {
  // Дізнаємося, яке саме поле було змінене
  const { name, value } = event.target;

  // Якщо ім'я поля — це одне з тих, що ми зберігаємо (email або message)
  if (name in formData) {
    // Видаляємо пробіли по краях і зберігаємо в нашу коробочку
    formData[name] = value.trim();

    // Перетворюємо об'єкт у текст і кладемо його в сховище
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Коли користувач натискає кнопку "Submit"
form.addEventListener('submit', (event) => {
  // Зупиняємо звичайну поведінку браузера (щоб не перезавантажувалась сторінка)
  event.preventDefault();

  // Якщо хоч якесь поле порожнє — показуємо повідомлення
  if (!formData.email || !formData.message) {
    alert('Fill please all fields'); // Скажемо: "Заповни, будь ласка, всі поля"
    return;
  }

  // Якщо все заповнено — показуємо наші дані в консолі
  console.log(formData);

  // Очищаємо об’єкт з даними
  formData = { email: '', message: '' };

  // Видаляємо дані зі сховища браузера
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо форму (щоб поля знову стали порожні)
  form.reset();
});
