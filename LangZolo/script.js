const dictionary = {
  A: ['А'],
  B: ['В'],
  C: ['С', 'Т'],
  D: ['Д'],
  E: ['Е', 'И', 'ИЛ', 'А'],
  F: ['Ф'],
  G: ['С', 'Д', 'Г', 'Л'],
  H: ['Н', 'ТЕН'],
  I: ['И', 'Н'],
  J: ['Ж', 'Г'],
  K: ['К'],
  L: ['Г', 'Р'],
  M: ['М'],
  N: ['Р', 'С', 'Б'],
  O: ['О'],
  P: ['Р', 'Я'],
  Q: ['КЬЮ', 'О'],
  R: ['Я', 'Ж', 'Д', 'Н'],
  S: ['С'],
  T: ['Т'],
  U: ['И'],
  V: ['Л', 'В'],
  W: ['М'],
  X: ['Х'],
  Y: ['У'],
  Z: ['З', 'И']
};

const wordDictionary = {
  'huskar': 'Ниская',
  'tiny': 'Тиию',
  'tango': 'Табло',
  'healing': 'Salve-Неат Славе',
  'observer': 'Ward-Ойдегсер Мард',
  'aegis of the immortal': 'Аппекс Оп Ип Иттонтайм',
  'io': 'IQ',
  'shadow demon': 'Снадом Демон',
  'anti mage': 'Арти Маде',
  'bane': 'Вадя',
  'lina': 'Луна',
  'chaos knight': 'Снаос Кииснт',
  'dawnbreaker': 'Дамнибреяакея',
  'dragon knight': 'Дракон Кингсонд',
  'lifestealer': 'ЛайфСталин',
  'mars': 'Маяс',
  'primal beast': 'Ряимаг Веаст',
  'pudge': 'Ритце',
  'slardar': 'Русалка',
  'spirit breaker': 'Ледяной Бык',
  'wraith king': 'Мьяитн Кинг',
  'shift': 'Tab',
  'ravage': 'Япаде',
};

const form = document.getElementById('transliteration-form');
const textArea = document.getElementById('text');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = textArea.value;
  const result = transliterateText(text);
  resultDiv.innerHTML = `Результат: ${result}`;
});

function transliterateText(text) {
  let words = text.split(' ');
  let result = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    const wordTranslation = wordDictionary[word];

    if (wordTranslation) {
      result += wordTranslation + ' ';
    } else {
      for (let j = 0; j < word.length; j++) {
        const currentChar = word[j];
        const possibleReplacements = dictionary[currentChar.toUpperCase()];

        if (possibleReplacements) {
          const randomIndex = Math.floor(Math.random() * possibleReplacements.length);
          result += possibleReplacements[randomIndex];
        } else {
          result += currentChar;
        }
      }

      result += ' ';
    }
  }

  return result.trim();
}
