// URL для загрузки запрещённых слов
const bannedWordsURL = 'https://raw.githubusercontent.com/R1myru/ThousandsEyes/refs/heads/main/words.txt';
let bannedWordsSet = new Set();

// Загружаем запрещённые слова
fetch(bannedWordsURL)
  .then(response => response.text())
  .then(data => {
    const words = data
      .split('\n')
      .map(word => word.trim().toLowerCase())
      .filter(word => word !== ''); // Убираем пустые строки
    bannedWordsSet = new Set(words);
    console.log('Запрещённые слова загружены:', bannedWordsSet);
  })
  .catch(error => console.error('Ошибка загрузки запрещённых слов:', error));


// Словарь для транслитерации букв
const dictionary = {
  A: ['А'],
  B: ['В'],
  C: ['С'],
  D: ['Д', 'O'],
  E: ['Е'],
  F: ['Ф', 'Г', 'T'],
  G: ['С', 'Д'],
  H: ['Н'],
  I: ['И'],
  J: ['Л', 'Г'],
  K: ['К'],
  L: ['Г'],
  M: ['М'],
  N: ['И'],
  O: ['О'],
  P: ['Р'],
  Q: ['О'],
  R: ['Я'],
  S: ['С'],
  T: ['Т'],
  U: ['И'],
  V: ['Л', 'А'],
  W: ['М'],
  X: ['Х'],
  Y: ['У'],
  Z: ['З']
};

// Словарь готовых переводов слов
const wordDictionary = {
  huskar: 'Ниская',
  tiny: 'Тиию',
  tango: 'Табло',
  'aegis of the immortal': 'Аппекс Оп Ип Иттонтайм',
  io: 'айкью',
  'shadow demon': 'Снадом Демон',
  'anti mage': 'Арти Маде',
  bane: 'Вадя',
  lina: 'Луна',
  luna: 'Лина',
  'chaos knight': 'Снаос Кииснт',
  dawnbreaker: 'Дамнибреяакея',
  'dragon knight': 'Дракон Кингсонд',
  lifestealer: 'ЛайфСталин',
  mars: 'Маяс',
  'primal beast': 'Ряимаг Веаст',
  pudge: 'Ритце',
  slardar: 'Русалка',
  'spirit breaker': 'Ледяной Бык',
  'wraith king': 'Мьяитн Кинг',
  shift: 'Tab',
  ravage: 'Япаде',
  help: 'НЕГР'
};

function transliterateText(text) {
  // Обрабатываем каждое слово отдельно
  return text.split(/(\s+)/).map(fragment => {
    // Если фрагмент — это пробел или перенос строки, возвращаем его без изменений
    if (/^\s+$/.test(fragment)) {
      return fragment;
    }

    // Убираем лишние символы для проверки запрещённых слов
    const cleanedWord = fragment.toLowerCase().replace(/[^\wа-яё]/gi, '');

    // Проверка на запрещённые слова
    if (bannedWordsSet.has(cleanedWord)) {
      const fillers = ['эээ', 'это самое', 'короче говоря', 'ну вы поняли'];
      return fillers[Math.floor(Math.random() * fillers.length)];
    }

    // Проверка на готовый перевод
    if (wordDictionary[cleanedWord]) {
      return wordDictionary[cleanedWord];
    }

    // Транслитерация букв
    return [...fragment].map(char => {
      const replacements = dictionary[char.toUpperCase()];
      return replacements
        ? replacements[Math.floor(Math.random() * replacements.length)]
        : char;
    }).join('');
  }).join(''); // Собираем текст обратно
}


// Элементы ввода и вывода
const inputField = document.querySelector('#input-text');
const outputField = document.querySelector('#output-text');

// Автоматический перевод текста
inputField.addEventListener('input', () => {
  const inputText = inputField.value.toUpperCase(); // Преобразование текста в капс

  // Обработка текста
  const result = transliterateText(inputText);
  outputField.value = result;
});

// Находим картинку
const copImage = document.querySelector('#cop-image');

// Добавляем обработчик клика
copImage.addEventListener('click', () => {
  window.open('https://r1my.ru', '_blank'); // Открывает сайт в новой вкладке
});
