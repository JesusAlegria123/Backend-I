const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hermanodeivis123.456', // Cambia esto por tu contraseña de MySQL
    database: 'db_ventas'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('✅ Conectado a MySQL');
});

module.exports = connection;
