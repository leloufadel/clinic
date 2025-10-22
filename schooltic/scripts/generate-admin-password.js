const bcrypt = require('bcryptjs');

async function generatePassword() {
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  console.log('Original password:', password);
  console.log('Hashed password:', hashedPassword);
  console.log('\nSQL INSERT statement:');
  console.log(`INSERT INTO administration (username, password, created_at) VALUES ('elhacen', '${hashedPassword}', NOW());`);
}

generatePassword().catch(console.error);

