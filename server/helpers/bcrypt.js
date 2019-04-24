const bcrypt = require('bcryptjs');

module.exports = {
    encrypt: function(password) {
        return bcrypt.hashSync(password, Number(process.env.SALT));
    },
    decrypt: function(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}
