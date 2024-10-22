const fs = require('fs');

//const count = Number(process.argv[2]); // odczyt liczby obiektów
let names = [];                        // tablica z obiektami 
const eyes_c = ["blue", "brown", "green", "grey", "yellow"];

function getBirth() {
    const start = new Date(1950, 0, 1);
    const end = new Date(2000, 11, 3);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}

fs.readFile('./names.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let counter = 0;
    //podział łańcucha z imionami na wiersze.
    names = data.split("\n").map(s => s.trim()).filter(n => n.length != 0);
    console.log(names);
    const people = names.map((name, index) => ({ 
        id: index + 1,
        first_name: name, 
        birth: getBirth(),
        eyes: eyes_c[index]
    }))
        let content = `export const data = ${JSON.stringify(people, null, 0)}`;    
    //zapis łańcucha do pliku 
    fs.writeFile('data.js', content, (err) => {
        if (err) {
           console.error(err);
        }
        console.log("module-data.js generated");
       });
});