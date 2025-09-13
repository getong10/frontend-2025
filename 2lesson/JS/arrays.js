
// 1.6 Работа с массивами

// Создание массивов
// 1. Литерал массива
const arr1 = [1, 2, 3, 4, 5];
const mixed = [1, "строка", true, null, {name: "объект"}, []];

// 2. Конструктор Array
const arr2 = new Array(1, 2, 3, 4, 5);
const arr3 = new Array(5); // создает массив с 5 пустыми элементами
console.log(arr3); // [empty × 5]

// 3. Array.from() - создание из итерируемого объекта
const str = "hello";
const arrFromString = Array.from(str);
console.log(arrFromString); // ["h", "e", "l", "l", "o"]

const arrFromRange = Array.from({length: 5}, (_, i) => i);
console.log(arrFromRange); // [0, 1, 2, 3, 4]

// 4. Array.of() - создание из аргументов
const arr4 = Array.of(1, 2, 3);
console.log(arr4); // [1, 2, 3]

const arr5 = Array.of(5); // в отличие от new Array(5)
console.log(arr5); // [5]


// Методы изменения массива (мутирующие)
let numbers = [1, 2, 3];

// push() - добавление в конец
numbers.push(4, 5);
console.log(numbers); // [1, 2, 3, 4, 5]

// pop() - удаление с конца
const last = numbers.pop();
console.log(last, numbers); // 5 [1, 2, 3, 4]

// unshift() - добавление в начало
numbers.unshift(0);
console.log(numbers); // [0, 1, 2, 3, 4]

// shift() - удаление с начала
const first = numbers.shift();
console.log(first, numbers); // 0 [1, 2, 3, 4]

// splice() - универсальный метод изменения
const fruits = ["яблоко", "банан", "апельсин", "груша", "киви"];

// Удаление элементов
const removed = fruits.splice(1, 2); // начиная с индекса 1, удалить 2 элемента
console.log(removed); // ["банан", "апельсин"]
console.log(fruits); // ["яблоко", "груша", "киви"]

// Добавление элементов
fruits.splice(1, 0, "манго", "ананас"); // в позицию 1, удалить 0, добавить элементы
console.log(fruits); // ["яблоко", "манго", "ананас", "груша", "киви"]

// Замена элементов
fruits.splice(2, 1, "персик"); // заменить 1 элемент в позиции 2
console.log(fruits); // ["яблоко", "манго", "персик", "груша", "киви"]

// reverse() - переворот массива
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// sort() - сортировка
const words = ["банан", "яблоко", "апельсин"];
words.sort();
console.log(words); // ["апельсин", "банан", "яблоко"]

const nums = [10, 5, 40, 25, 1000, 1];
nums.sort(); // сортирует как строки!
console.log(nums); // [1, 10, 1000, 25, 40, 5]

// Правильная числовая сортировка
nums.sort((a, b) => a - b); // по возрастанию
console.log(nums); // [1, 5, 10, 25, 40, 1000]

nums.sort((a, b) => b - a); // по убыванию
console.log(nums); // [1000, 40, 25, 10, 5, 1]


// Методы неизменяющие массив
const numbers = [1, 2, 3, 4, 5];

// slice() - получение части массива
const slice1 = numbers.slice(1, 4); // с индекса 1 до 4 (не включая 4)
console.log(slice1); // [2, 3, 4]
console.log(numbers); // [1, 2, 3, 4, 5] - не изменился

const slice2 = numbers.slice(-3); // последние 3 элемента
console.log(slice2); // [3, 4, 5]

// concat() - объединение массивов
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const combined = arr1.concat(arr2, arr3);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// indexOf() и lastIndexOf() - поиск индекса
const fruits = ["яблоко", "банан", "яблоко", "груша"];
console.log(fruits.indexOf("яблоко")); // 0 (первое вхождение)
console.log(fruits.lastIndexOf("яблоко")); // 2 (последнее вхождение)
console.log(fruits.indexOf("киви")); // -1 (не найдено)

// includes() - проверка наличия элемента
console.log(fruits.includes("банан")); // true
console.log(fruits.includes("киви")); // false

// join() - объединение в строку
console.log(fruits.join()); // "яблоко,банан,яблоко,груша"
console.log(fruits.join(" | ")); // "яблоко | банан | яблоко | груша"
console.log(fruits.join("")); // "яблокобананяблокогруша"


// Итерационные методы массивов
const numbers = [1, 2, 3, 4, 5];
const people = [
    { name: "Иван", age: 30, salary: 50000 },
    { name: "Анна", age: 25, salary: 45000 },
    { name: "Петр", age: 35, salary: 60000 },
    { name: "Мария", age: 28, salary: 48000 }
];

// forEach() - выполнение функции для каждого элемента
numbers.forEach((num, index, array) => {
    console.log(`Элемент ${num} имеет индекс ${index}`);
});

// map() - создание нового массива с преобразованными элементами
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const names = people.map(person => person.name);
console.log(names); // ["Иван", "Анна", "Петр", "Мария"]

const peopleInfo = people.map(person => ({
    ...person,
    info: `${person.name} (${person.age} лет)`
}));

// filter() - фильтрация элементов
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

const adults = people.filter(person => person.age >= 30);
console.log(adults); // [{ name: "Иван", age: 30, ... }, { name: "Петр", age: 35, ... }]

const highEarners = people.filter(person => person.salary > 47000);

// find() - поиск первого подходящего элемента
const firstAdult = people.find(person => person.age >= 30);
console.log(firstAdult); // { name: "Иван", age: 30, salary: 50000 }

const notFound = people.find(person => person.age > 40);
console.log(notFound); // undefined

// findIndex() - поиск индекса первого подходящего элемента
const firstAdultIndex = people.findIndex(person => person.age >= 30);
console.log(firstAdultIndex); // 0

// some() - проверка, есть ли хотя бы один подходящий элемент
const hasAdults = people.some(person => person.age >= 30);
console.log(hasAdults); // true

const hasTeenagers = people.some(person => person.age < 18);
console.log(hasTeenagers); // false

// every() - проверка, все ли элементы подходят
const allAdults = people.every(person => person.age >= 18);
console.log(allAdults); // true

const allRich = people.every(person => person.salary > 60000);
console.log(allRich); // false

// reduce() - сведение массива к одному значению
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

const totalSalary = people.reduce((acc, person) => acc + person.salary, 0);
console.log(totalSalary); // 203000

// Группировка с reduce
const groupedByAge = people.reduce((acc, person) => {
    const ageGroup = person.age >= 30 ? "30+" : "20-29";
    if (!acc[ageGroup]) {
        acc[ageGroup] = [];
    }
    acc[ageGroup].push(person);
    return acc;
}, {});

console.log(groupedByAge);

// Поиск максимального значения
const maxSalary = people.reduce((max, person) => 
    person.salary > max ? person.salary : max, 0
);
console.log(maxSalary); // 60000

// Подсчет вхождений
const fruits = ["яблоко", "банан", "яблоко", "груша", "банан", "яблоко"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { яблоко: 3, банан: 2, груша: 1 }

// reduceRight() - то же что reduce, но справа налево
const rightToLeft = [1, 2, 3, 4].reduceRight((acc, num) => acc + num, "");
console.log(rightToLeft); // "4321"


// Деструктуризация массивов
const colors = ["красный", "зеленый", "синий", "желтый", "фиолетовый"];

// Базовая деструктуризация
const [first, second] = colors;
console.log(first, second); // "красный" "зеленый"

// Пропуск элементов
const [primary, , tertiary] = colors;
console.log(primary, tertiary); // "красный" "синий"

// Rest оператор
const [main, ...otherColors] = colors;
console.log(main); // "красный"
console.log(otherColors); // ["зеленый", "синий", "желтый", "фиолетовый"]

// Значения по умолчанию
const [a, b, c, d, e, f = "оранжевый"] = colors;
console.log(f); // "оранжевый"

// Обмен значений
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// Деструктуризация в параметрах функции
function processCoordinates([x, y, z = 0]) {
    return { x, y, z };
}

console.log(processCoordinates([10, 20])); // { x: 10, y: 20, z: 0 }

// Вложенная деструктуризация
const matrix = [[1, 2], [3, 4], [5, 6]];
const [[a1, b1], [a2, b2]] = matrix;
console.log(a1, b1, a2, b2); // 1 2 3 4