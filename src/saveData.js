const fs = require('fs');

const jsonData = [
  {
    Id: 101,
    Name: 'test',
    Date: '2023-12-27',
    Time: '22:30',
  },
  {
    Id: 102,
    Name: 'test 1',
    Date: '2023-07-21',
    Time: '09:00',
  },
  // Add more data as needed
];

const jsonFileName = 'data.json';

fs.writeFileSync(jsonFileName, JSON.stringify(jsonData, null, 2));

console.log(`JSON data has been saved to ${jsonFileName}`);
console.log("hello");
