const fs = require("fs");

const users = [];
const companies = [
  "Tech Solutions",
  "Global Corp",
  "NextGen Systems",
  "CloudNine",
  "DataWorks",
  "Innova Labs"
];

for (let i = 1; i <= 10000; i++) {
  users.push({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    company: companies[i % companies.length],
  });
}

const db = { users };

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
console.log("db.json generated with 10,000 users");
