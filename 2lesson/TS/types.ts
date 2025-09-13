// Числа
let age: number = 25;
let price: number = 99.99;

// Строки
let firstName: string = "Иван";
let lastName: string = 'Петров';
let fullName: string = `${firstName} ${lastName}`;

// Булевы значения
let isStudent: boolean = true;
let isGraduated: boolean = false;

// Null и undefined
let data: null = null;
let value: undefined = undefined;

// Массив чисел
let scores: number[] = [85, 92, 78, 96];
let grades: Array<number> = [4, 5, 3, 5];

// Массив строк
let subjects: string[] = ["Математика", "Физика", "Программирование"];

// Многомерные массивы
let matrix: number[][] = [[1, 2], [3, 4]];

// Кортеж - массив фиксированной длины с известными типами
let student: [string, number, boolean] = ["Анна", 20, true];

// Деструктуризация кортежа
let [name, studentAge, isActive] = student;

// Числовые enum
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// Строковые enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Использование enum
let playerDirection: Direction = Direction.Up;
let selectedColor: Color = Color.Red;

// any - отключает проверку типов (использовать осторожно!)
let dynamicContent: any = 42;
dynamicContent = "теперь строка";
dynamicContent = true;

// unknown - безопасная альтернатива any
let userInput: unknown = getUserInput();
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase()); // безопасно
}

// never - тип для значений, которые никогда не появятся
function throwError(message: string): never {
    throw new Error(message);
}

// Типизация функций
// Функция с типизированными параметрами и возвращаемым значением
function add(a: number, b: number): number {
  return a + b;
}

// Функция с необязательными параметрами
function greetUser(name: string, surname?: string): string {
  if (surname) {
      return `Привет, ${name} ${surname}!`;
  }
  return `Привет, ${name}!`;
}

// Функция с параметрами по умолчанию
function createUser(name: string, age: number = 18): string {
  return `Пользователь: ${name}, возраст: ${age}`;
}

// Rest параметры
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Определение типа функции
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (a, b) => a * b;
const divide: MathOperation = (a, b) => a / b;

// Функция как параметр
function calculate(operation: MathOperation, a: number, b: number): number {
    return operation(a, b);
}

// Определение интерфейса
interface Student {
  readonly id: number;        // readonly - только для чтения
  name: string;
  age: number;
  email?: string;            // необязательное свойство
  subjects: string[];
  
  // Методы в интерфейсе
  study(subject: string): void;
  getGPA(): number;
}

// Реализация интерфейса
const student123: Student = {
  id: 1,
  name: "Мария",
  age: 20,
  subjects: ["Математика", "Физика"],
  
  study(subject: string): void {
      console.log(`Изучаю ${subject}`);
  },
  
  getGPA(): number {
      return 4.5;
  }
};

// Базовый интерфейс
interface Person {
  name: string;
  age: number;
}

// Расширение интерфейса
interface Employee extends Person {
  employeeId: number;
  department: string;
  salary?: number;
}

// Множественное наследование
interface Manager extends Employee {
  teamSize: number;
  bonus: number;
}

const manager: Manager = {
  name: "Владимир",
  age: 35,
  employeeId: 101,
  department: "IT",
  teamSize: 8,
  bonus: 50000
};

// Индексные подписи для динамических свойств
interface Dictionary {
  [key: string]: string;
}

const translations: Dictionary = {
  "hello": "привет",
  "world": "мир",
  "typescript": "типскрипт"
};

// Числовые индексы
interface NumberDictionary {
  [index: number]: string;
}

const colors: NumberDictionary = {
  0: "красный",
  1: "зеленый",
  2: "синий"
};

// Типизация DOM элементов
const button = document.getElementById('myButton') as HTMLButtonElement;
const input = document.querySelector('#userInput') as HTMLInputElement;
const form = document.forms.namedItem('userForm') as HTMLFormElement;

// Безопасная работа с DOM
function setupEventListeners(): void {
    const submitButton = document.getElementById('submit');
    
    if (submitButton) {
        submitButton.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            handleSubmit();
        });
    }
}

function handleSubmit(): void {
  const nameInput = document.querySelector('#name') as HTMLInputElement;
  const emailInput = document.querySelector('#email') as HTMLInputElement;
  
  if (nameInput && emailInput) {
      const userData = {
          name: nameInput.value,
          email: emailInput.value
      };
      
      console.log('Отправка данных:', userData);
  }
}

// Страшная штука
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
/**
 * 1. type DeepReadonly<T> = { ... } Создаём свой тип (через type), который берёт другой тип T
 * и превращает его в “глубоко readonly” (нельзя изменять ни верхний уровень, ни вложенные объекты)
 * 
 * 2. [P in keyof T] Это mapped type — проход по всем ключам объекта T
 * keyof T — это объединение имён свойств ("id" | "name" | ...)
 * P in keyof T — цикл по этим ключам
 * 
 * 3. Перед каждым свойством ставится модификатор readonly, то есть его нельзя изменять
 * 
 * 4. T[P] extends object ? ... : ... Тернарник, Если T[P] (тип свойства) является объектом - применяем DeepReadonly рекурсивно
 * иначе оставляем как есть
 */