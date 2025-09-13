// 2.2 DOM (Document Object Model)

// Структура DOM
// Корневые объекты
console.log(window); // Глобальный объект браузера
console.log(document); // Объект документа
console.log(document.documentElement); // <html> элемент
console.log(document.head); // <head> элемент
console.log(document.body); // <body> элемент

// Информация о документе
console.log(document.title); // Заголовок страницы
console.log(document.URL); // URL страницы
console.log(document.referrer); // Откуда пришел пользователь
console.log(document.readyState); // loading, interactive, complete


// Поиск элементов
// По ID (возвращает один элемент или null)
const header = document.getElementById('main-header');

// По имени класса (возвращает HTMLCollection)
const items = document.getElementsByClassName('item');
const firstItem = items[0]; // первый элемент
const itemsArray = Array.from(items); // преобразование в массив

// По тегу (возвращает HTMLCollection)
const allDivs = document.getElementsByTagName('div');
const allElements = document.getElementsByTagName('*'); // все элементы

// По имени атрибута name (для форм)
const nameFields = document.getElementsByName('username');

// CSS селекторы (современный подход)
const firstButton = document.querySelector('button'); // первый найденный
const redButton = document.querySelector('.btn.red'); // по классам
const submitBtn = document.querySelector('button[type="submit"]'); // по атрибуту
const nestedSpan = document.querySelector('div > span'); // дочерний селектор

// Все подходящие элементы (возвращает NodeList)
const allButtons = document.querySelectorAll('button');
const allItems = document.querySelectorAll('.item');

// NodeList vs HTMLCollection
console.log(allButtons); // NodeList (статический)
console.log(items); // HTMLCollection (живая коллекция)

// Преобразование в массивы для использования методов массивов
const buttonsArray = [...allButtons]; // spread
const itemsArray2 = Array.from(allItems); // Array.from

// Перебор NodeList
allButtons.forEach(button => {
    console.log(button.textContent);
});

// Живые коллекции автоматически обновляются
console.log(items.length); // например, 3
document.body.innerHTML += '<div class="item">Новый элемент</div>';
console.log(items.length); // стало 4 автоматически!


// Навигация по DOM
const element = document.querySelector('.main-content');

// Родительские элементы
console.log(element.parentNode); // родительский узел (может быть текстом)
console.log(element.parentElement); // родительский элемент
console.log(element.closest('.container')); // ближайший предок с классом container

// Дочерние элементы
console.log(element.childNodes); // все дочерние узлы (включая текст)
console.log(element.children); // только элементы
console.log(element.firstChild); // первый узел
console.log(element.firstElementChild); // первый элемент
console.log(element.lastChild); // последний узел
console.log(element.lastElementChild); // последний элемент

// Соседние элементы
console.log(element.previousSibling); // предыдущий узел
console.log(element.previousElementSibling); // предыдущий элемент
console.log(element.nextSibling); // следующий узел
console.log(element.nextElementSibling); // следующий элемент

// Проверка наличия дочерних элементов
if (element.hasChildNodes()) {
    console.log("У элемента есть дочерние узлы");
}

// Подсчет дочерних элементов
console.log(element.childElementCount);

// Получение всех потомков
const allDescendants = element.querySelectorAll('*');


// Создание и изменение элементов
// Создание элементов
const newDiv = document.createElement('div');
const newText = document.createTextNode('Просто текст');
const newComment = document.createComment('Это комментарий');

// Настройка атрибутов и содержимого
newDiv.className = 'new-element highlight';
newDiv.id = 'unique-id';
newDiv.textContent = 'Содержимое элемента';

// Установка атрибутов
newDiv.setAttribute('data-value', '123');
newDiv.setAttribute('title', 'Подсказка');

// Современный способ работы с атрибутами
newDiv.dataset.userId = '456'; // создает data-user-id="456"
newDiv.dataset.createdAt = new Date().toISOString();

// Работа с HTML содержимым (осторожно с XSS!)
newDiv.innerHTML = '<strong>Жирный текст</strong> и обычный';

// Безопасная альтернатива для динамического содержимого
const strong = document.createElement('strong');
strong.textContent = 'Жирный текст'; // автоматически экранирует HTML
newDiv.appendChild(strong);
newDiv.appendChild(document.createTextNode(' и обычный'));

// Добавление элементов в DOM
const container = document.getElementById('container');
container.appendChild(newDiv); // в конец
container.insertBefore(newDiv, container.firstElementChild); // в начало

// Современные методы вставки
container.prepend(newDiv); // в начало
container.append(newDiv); // в конец
container.before(newDiv); // перед container
container.after(newDiv); // после container

// Замена элементов
const oldElement = document.getElementById('old-element');
const newElement = document.createElement('div');
newElement.textContent = 'Новый элемент';

oldElement.replaceWith(newElement); // современный способ
// или
oldElement.parentNode.replaceChild(newElement, oldElement); // старый способ

// Клонирование элементов
const original = document.querySelector('.template');
const clone = original.cloneNode(true); // true = глубокое копирование
clone.id = 'new-id'; // изменяем ID клона
document.body.appendChild(clone);

// Удаление элементов
const elementToRemove = document.getElementById('remove-me');
elementToRemove.remove(); // современный способ
// или
elementToRemove.parentNode.removeChild(elementToRemove); // старый способ

// Очистка содержимого
container.innerHTML = ''; // удаляет все содержимое (но не освобождает обработчики)
// Более правильный способ:
while (container.firstChild) {
    container.removeChild(container.firstChild);
}


// Работа с классами и стилями
const element = document.querySelector('.example');

// Работа с классами
console.log(element.className); // строка с классами
console.log(element.classList); // DOMTokenList

// Методы classList
element.classList.add('new-class', 'another-class'); // добавить классы
element.classList.remove('old-class'); // удалить класс
element.classList.toggle('active'); // переключить класс
element.classList.replace('old', 'new'); // заменить класс

// Проверка наличия класса
if (element.classList.contains('active')) {
    console.log('Элемент активен');
}

// Работа со стилями
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';
element.style.border = '1px solid black';

// CSS свойства с дефисами
element.style.borderRadius = '5px'; // border-radius
element.style.textAlign = 'center'; // text-align

// Получение вычисленных стилей
const computedStyles = window.getComputedStyle(element);
console.log(computedStyles.color); // вычисленный цвет
console.log(computedStyles.getPropertyValue('font-size')); // размер шрифта

// Массовая установка стилей
Object.assign(element.style, {
    width: '300px',
    height: '200px',
    margin: '20px auto',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
});

// CSS переменные
document.documentElement.style.setProperty('--main-color', '#3498db');
const mainColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--main-color');


// События
const button = document.querySelector('#my-button');
const form = document.querySelector('#my-form');
const input = document.querySelector('#my-input');

// Добавление обработчиков событий
button.addEventListener('click', function(event) {
    console.log('Кнопка нажата!');
    console.log('Элемент:', event.target);
    console.log('Тип события:', event.type);
    console.log('Координаты:', event.clientX, event.clientY);
});

// Стрелочная функция как обработчик
button.addEventListener('click', (e) => {
    console.log('Это стрелочная функция');
});

// Обработчик с именем (можно удалить)
function handleClick(event) {
    console.log('Именованный обработчик');
}

button.addEventListener('click', handleClick);

// Удаление обработчика
button.removeEventListener('click', handleClick);

// Опции обработчиков
button.addEventListener('click', function(e) {
    console.log('Сработает только один раз');
}, { once: true }); // сработает только один раз

button.addEventListener('click', function(e) {
    console.log('Пассивный обработчик');
}, { passive: true }); // не может вызвать preventDefault

// Всплытие и погружение событий
document.querySelector('.outer').addEventListener('click', function(e) {
    console.log('Внешний элемент (всплытие)');
}, false); // false = фаза всплытия (по умолчанию)

document.querySelector('.inner').addEventListener('click', function(e) {
    console.log('Внутренний элемент');
    e.stopPropagation(); // остановить всплытие
}, false);

document.querySelector('.outer').addEventListener('click', function(e) {
    console.log('Внешний элемент (погружение)');
}, true); // true = фаза погружения

// Предотвращение действий по умолчанию
form.addEventListener('submit', function(event) {
    event.preventDefault(); // предотвратить отправку формы
    
    const formData = new FormData(form);
    console.log('Данные формы:', Object.fromEntries(formData));
});

// Различные типы событий
input.addEventListener('input', function(e) {
    console.log('Значение изменилось:', e.target.value);
});

input.addEventListener('focus', function(e) {
    e.target.style.backgroundColor = 'lightyellow';
});

input.addEventListener('blur', function(e) {
    e.target.style.backgroundColor = '';
});

window.addEventListener('resize', function(e) {
    console.log('Размер окна:', window.innerWidth, window.innerHeight);
});

window.addEventListener('scroll', function(e) {
    console.log('Прокрутка:', window.pageYOffset);
});

// Кастомные события
const customEvent = new CustomEvent('myCustomEvent', {
    detail: { message: 'Привет из кастомного события!' }
});

button.addEventListener('myCustomEvent', function(event) {
    console.log(event.detail.message);
});

button.dispatchEvent(customEvent); // запуск кастомного события

// Обработка клавиатуры
input.addEventListener('keydown', function(event) {
    console.log('Нажата клавиша:', event.key);
    console.log('Код клавиши:', event.code);
    
    if (event.key === 'Enter') {
        console.log('Нажат Enter');
    }
    
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Ctrl+S нажато');
    }
});

// Обработка мыши
element.addEventListener('mouseenter', function(e) {
    console.log('Мышь вошла в элемент');
});

element.addEventListener('mouseleave', function(e) {
    console.log('Мышь покинула элемент');
});

element.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // отключить контекстное меню
    console.log('Правый клик');
});