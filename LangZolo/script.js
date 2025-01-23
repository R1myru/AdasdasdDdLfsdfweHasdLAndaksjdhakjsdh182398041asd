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
  huskar: 'НИСКАЯ',
  tiny: 'ТИИЮ',
  tango: 'ТАБЛО',
  'aegis of the immortal': 'АППЕКС ОП ИП ИТТОНТАЙМ',
  io: 'АЙКЬЮ',
  'shadow demon': 'СНАДОМ ДЕМОН',
  'anti mage': 'АРТИ МАДЕ',
  bane: 'ВАДЯ',
  lina: 'ЛУНА',
  luna: 'ЛИНА',
  'chaos knight': 'СНАОС КИИСНТ',
  dawnbreaker: 'ДАМНИБРЕЯАКЕЯ',
  'dragon knight': 'ДРАКОН КИНГСОНД',
  lifestealer: 'ЛАЙФСТАЛИН',
  mars: 'МАЯС',
  'primal beast': 'РЯИМАГ ВЕАСТ',
  pudge: 'РИТЦЕ',
  slardar: 'РУСАЛКА',
  'spirit breaker': 'ЛЕДЯНОЙ БЫК',
  'wraith king': 'МЬЯИТН КИНГ',
  shift: 'TAB',
  ravage: 'ЯПАДЕ',
  help: 'НЕГР'
  i like big dick: 'ай лайк тик ток'
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
      const fillers = ['ЭЭЭ', 'ЭТО САМОЕ', 'КОРОЧЕ ГОВОРЯ', 'НУ ВЫ ПОНЯЛИ'];
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
