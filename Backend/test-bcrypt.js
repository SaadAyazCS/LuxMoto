const bcrypt = require('bcrypt');

const plainPassword = 'adminissaad';
const hashedPassword = '$2b$10$1KFo3772IvDQkpn78bvesepOM2uBGZLwO1/uHbu1gPMwrMTOaE8f2';

bcrypt.compare(plainPassword, hashedPassword)
  .then(result => {
    console.log("✅ Match:", result); // true or false
  })
  .catch(err => console.error("❌ Error:", err));
