//  Примитивные типы данных
// 1. String (строки)
let str1 = "Строка в двойных кавычках";
let str2 = 'Строка в одинарных кавычках';
let str3 = `Шаблонная строка с переменными: ${str1}`;

// Методы строк
let text = "JavaScript";
console.log(text.length); // 10
console.log(text.toUpperCase()); // "JAVASCRIPT"
console.log(text.charAt(0)); // "J"
console.log(text.indexOf("Script")); // 4
console.log(text.slice(0, 4)); // "Java"
console.log(text.split("")); // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

// Escape последовательности
let escaped = "Строка с \"кавычками\" и переносом\nстроки";
let path = "C:\\Users\\username\\Documents"; // двойные обратные слеши

// Многострочные строки
let multiline = `
    Это многострочная
    строка с сохранением
    форматирования
`;

// 2. Number (числа)
// Целые числа
let integer = 42;
let negative = -15;

// Дробные числа
let float = 3.14159;
let scientific = 2.5e6; // 2500000

// Специальные числовые значения
let infinity = Infinity; // положительная бесконечность
let negInfinity = -Infinity; // отрицательная бесконечность
let notANumber = NaN; // Not a Number

// Проверки
console.log(isNaN(NaN)); // true
console.log(isFinite(42)); // true
console.log(isFinite(Infinity)); // false

// Методы Number
console.log(Number.parseInt("123px")); // 123
console.log(Number.parseFloat("12.34px")); // 12.34
console.log((3.14159).toFixed(2)); // "3.14"
console.log((1234.5678).toPrecision(6)); // "1234.57"

// Проблема с точностью
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// Решение проблемы точности
let result = +(0.1 + 0.2).toFixed(10); // или использовать специальные библиотеки

// 3. Boolean (логический тип)
let isTrue = true;
let isFalse = false;

// Преобразование к boolean
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false

// Falsy значения (преобразуются в false)
let falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
falsyValues.forEach(val => console.log(Boolean(val))); // все false

// Все остальные значения - truthy
console.log(Boolean([])); // true (даже пустой массив)
console.log(Boolean({})); // true (даже пустой объект)
console.log(Boolean("0")); // true (строка "0")


// 4. Null и Undefined
let nullValue = null; // явное отсутствие значения
let undefinedValue; // переменная объявлена, но не инициализирована

console.log(typeof null); // "object" (это историческая ошибка в JavaScript)
console.log(typeof undefined); // "undefined"

// Различия
console.log(null == undefined); // true (нестрогое сравнение)
console.log(null === undefined); // false (строгое сравнение)

// Использование
function getUserById(id) {
    if (!id) {
        return null; // явно показываем, что пользователь не найден
    }
    // логика поиска пользователя
}

let user = getUserById(); // undefined - не передали параметр
let notFoundUser = getUserById(999); // null - пользователь не найден


// 5. Symbol (символы)
// Создание уникальных символов
let sym1 = Symbol();
let sym2 = Symbol("description");
let sym3 = Symbol("description");

console.log(sym2 === sym3); // false - каждый Symbol уникален

// Использование в объектах
let obj = {};
let symbolKey = Symbol("myKey");
obj[symbolKey] = "значение";

console.log(obj[symbolKey]); // "значение"
console.log(Object.keys(obj)); // [] - символы не видны в обычных итерациях

// Глобальные символы
let globalSym1 = Symbol.for("global");
let globalSym2 = Symbol.for("global");
console.log(globalSym1 === globalSym2); // true

// Встроенные символы
let arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // функция итератора массива


// 6. BigInt (большие целые числа)
// Обычные числа ограничены
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// BigInt для больших чисел
let bigNum1 = 123456789012345678901234567890n;
let bigNum2 = BigInt("123456789012345678901234567890");

console.log(bigNum1 + bigNum2); // 246913578024691357802469135780n

// Нельзя смешивать с обычными числами
// console.log(bigNum1 + 10); // Ошибка!
console.log(bigNum1 + BigInt(10)); // Правильно


// Объектные типы данных

// Object (объекты)
// Объект - это коллекция пар ключ-значение
let person = {
    name: "Иван",
    age: 30,
    "full name": "Иван Петров", // ключ с пробелами
    42: "число как ключ"
};

// Массивы - это тоже объекты
let arr = [1, 2, 3];
console.log(typeof arr); // "object"

// Функции - тоже объекты
function greet() {}
console.log(typeof greet); // "function" (но это подтип object)

// Date, RegExp, Error и др. - все объекты
let date = new Date();
let regex = /pattern/;
console.log(typeof date); // "object"
console.log(typeof regex); // "object"


// Проверка типов
// typeof оператор
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (ошибка!)
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function(){}); // "function"

// Более точная проверка типов
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"

// Современные методы
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false


// 1.3 Переменные: var, let, const (детальное сравнение)

// var (устаревший способ)
// Область видимости функции (function scope)
function varExample() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 - доступна за пределами блока!
}

// Поднятие (hoisting)
console.log(hoistedVar); // undefined (не ошибка!)
var hoistedVar = "значение";

// Эквивалентно:
var hoistedVar; // объявление поднимается наверх
console.log(hoistedVar); // undefined
hoistedVar = "значение"; // присваивание остается на месте

// Повторное объявление
var name = "Иван";
var name = "Петр"; // Не ошибка! Переменная перезаписывается

// Проблема с циклами
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Выведет 3, 3, 3
}

// Глобальные var становятся свойствами window (в браузере)
var globalVar = "global";
console.log(window.globalVar); // "global" (в браузере)


// let (современный способ)
// Блочная область видимости (block scope)
function letExample() {
    if (true) {
        let x = 1;
    }
    // console.log(x); // Ошибка! x недоступна за пределами блока
}

// Temporal Dead Zone (временная мертвая зона)
// console.log(hoistedLet); // Ошибка! Cannot access before initialization
let hoistedLet = "значение";

// Нельзя повторно объявлять в той же области видимости
let name = "Иван";
// let name = "Петр"; // Ошибка! Identifier 'name' has already been declared

// Решение проблемы с циклами
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Выведет 0, 1, 2
}

// let не создает свойства глобального объекта
let globalLet = "global";
console.log(window.globalLet); // undefined (в браузере)

// Блочная область видимости в действии
{
    let blockScoped = "внутри блока";
    console.log(blockScoped); // "внутри блока"
}
// console.log(blockScoped); // Ошибка! blockScoped is not defined


// const (константы)
// Должна быть инициализирована при объявлении
// const uninitializedConst; // Ошибка! Missing initializer

const PI = 3.14159;
// PI = 3.14; // Ошибка! Assignment to constant variable

// Блочная область видимости (как let)
{
    const blockConst = "значение";
}
// console.log(blockConst); // Ошибка!

// ВАЖНО: const защищает от переприсваивания, но не от изменения содержимого
const person = {
    name: "Иван",
    age: 30
};

// Можно изменять содержимое объекта
person.name = "Петр"; // ОК
person.city = "Москва"; // ОК
console.log(person); // { name: "Петр", age: 30, city: "Москва" }

// Но нельзя переприсвоить саму переменную
// person = {}; // Ошибка!

const numbers = [1, 2, 3];
numbers.push(4); // ОК - изменяем содержимое
console.log(numbers); // [1, 2, 3, 4]
// numbers = []; // Ошибка! - переприсваивание

// Для полной неизменяемости используйте Object.freeze()
const frozenObj = Object.freeze({
    name: "Иван",
    age: 30
});
// frozenObj.name = "Петр"; // Будет проигнорировано (в строгом режиме - ошибка)

// Глубокая заморозка (shallow freeze - только верхний уровень)
const deepObj = {
    name: "Иван",
    address: {
        city: "Москва"
    }
};
Object.freeze(deepObj);
deepObj.address.city = "СПб"; // Сработает! Вложенные объекты не заморожены