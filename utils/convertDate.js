
 export default function ArDate(date){
    const englishDate = new Date(date);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const arabicDate = englishDate.toLocaleDateString('ar-EG', options);
    return arabicDate;
}

// console.log(ArDate("Thu Jan 18 2024 03:00:00 GMT+0300"));

const date = new Date("Thu Jan 18 2024 03:00:00 GMT+0300");
console.log(date.getTime());