// 1.7 Spread оператор (...) - подробно

// Использование с массивами
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Объединение массивов
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Добавление элементов
const withNew = [...arr1, 0, ...arr2, 7, 8];
console.log(withNew); // [1, 2, 3, 0, 4, 5, 6, 7, 8]

// Копирование массива (поверхностное)
const copied = [...arr1];
copied.push(4);
console.log(arr1); // [1, 2, 3] - не изменился
console.log(copied); // [1, 2, 3, 4]

// Преобразование строки в массив
const str = "hello";
const chars = [...str];
console.log(chars); // ["h", "e", "l", "l", "o"]

// Работа с Set
const set = new Set([1, 2, 3, 3, 4]);
const uniqueArray = [...set];
console.log(uniqueArray); // [1, 2, 3, 4]

// Поиск максимального/минимального значения
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const max = Math.max(...numbers);
const min = Math.min(...numbers);
console.log(max, min); // 9 1

// Передача аргументов в функцию
function sum(a, b, c) {
    return a + b + c;
}

const args = [1, 2, 3];
console.log(sum(...args)); // 6

// Добавление элементов в существующий массив
let fruits = ["яблоко", "банан"];
const newFruits = ["груша", "апельсин"];

fruits.push(...newFruits); // вместо fruits = fruits.concat(newFruits)
console.log(fruits); // ["яблоко", "банан", "груша", "апельсин"]


// Использование с объектами
const person = {
    name: "Иван",
    age: 30
};

const address = {
    city: "Москва",
    country: "Россия"
};

// Объединение объектов
const fullInfo = {
    ...person,
    ...address,
    occupation: "разработчик"
};
console.log(fullInfo);
// { name: "Иван", age: 30, city: "Москва", country: "Россия", occupation: "разработчик" }

// Копирование объекта (поверхностное)
const personCopy = {...person};
personCopy.age = 31;
console.log(person.age); // 30 - не изменился

// Перезапись свойств
const updated = {
    ...person,
    age: 31, // перезаписывает age из person
    name: "Иван Петров" // перезаписывает name из person
};

// Условное добавление свойств
const includePhone = true;
const userInfo = {
    ...person,
    ...(includePhone && { phone: "+7-123-456-78-90" })
};

// Обновление вложенных объектов
const user = {
    name: "Иван",
    settings: {
        theme: "dark",
        notifications: true
    }
};

// НЕПРАВИЛЬНО - поверхностное копирование
const badUpdate = {
    ...user,
    settings: {
        theme: "light" // потеряли notifications!
    }
};

// ПРАВИЛЬНО - копируем вложенный объект
const goodUpdate = {
    ...user,
    settings: {
        ...user.settings,
        theme: "light"
    }
};

console.log(goodUpdate);
// { name: "Иван", settings: { theme: "light", notifications: true } }


// Rest параметры
// Rest в параметрах функции
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum()); // 0

// Комбинирование обычных параметров с rest
function greet(greeting, ...names) {
    return `${greeting}, ${names.join(" и ")}!`;
}

console.log(greet("Привет", "Иван", "Анна", "Петр")); 
// "Привет, Иван и Анна и Петр!"

// Rest в деструктуризации массива
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]

// Rest в деструктуризации объекта
const { name, ...otherProps } = {
    name: "Иван",
    age: 30,
    city: "Москва",
    occupation: "разработчик"
};
console.log(name); // "Иван"
console.log(otherProps); // { age: 30, city: "Москва", occupation: "разработчик" }