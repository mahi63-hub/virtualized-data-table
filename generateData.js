const fs = require('fs');

const generateData = () => {
  const users = [];
  const companies = ['Tech Solutions', 'Global Corp', 'Innovate LLC', 'Alpha Systems', 'NextGen Apps', 'Future Forward', 'CloudSync'];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Kevin', 'Liam', 'Mia', 'Noah', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Sam', 'Tina'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'];

  for (let i = 1; i <= 10000; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      company: companies[Math.floor(Math.random() * companies.length)],
      role: i % 5 === 0 ? 'Admin' : (i % 3 === 0 ? 'Editor' : 'Viewer'),
      status: i % 8 === 0 ? 'Inactive' : 'Active'
    });
  }

  return { users };
};

fs.writeFileSync('db.json', JSON.stringify(generateData(), null, 2));
console.log('Successfully generated 10,000 users in db.json');
