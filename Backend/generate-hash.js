const bcrypt = require('bcrypt');

bcrypt.hash('adminissaad', 10).then(hash => {
  console.log('Hashed password:', hash);
});
