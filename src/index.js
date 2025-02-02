const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
const jamesImage = new URL('./images/james.jpg', import.meta.url);
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

const whoIsTheGoat = [
    { name: 'Michael Jordan', link: './images/jordan.jpg' },
    { name: 'Lebron James', link: './images/james.jpg' },
    { name: 'Kobe Bryant', link: './images/bryant.jpg' },
  ];



const numbers = [2, 3, 5];


const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); 