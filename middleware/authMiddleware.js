const jwt = require('jsonwebtoken');
const JWT_SECRET = 'VladOEmpalador';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Sem token

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); // Remover o "Bearer " e verificar o token
        req.user = decoded; // Armazenar o payload decodificado no req.user
        next();
      } catch (err) {
        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) return res.sendStatus(403); // Token inválido
    //     req.user = user;
    //     next();
    // });
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRole };
