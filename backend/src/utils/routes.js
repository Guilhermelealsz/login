import express from 'express';
import jwt from 'jsonwebtoken';
import { register, login } from '../Controller/usuarioController.js';
import { getUsers } from '../Controller/AdmController.js';

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: 'Token de acesso não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ erro: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

const requireAdmin = (req, res, next) => {
    if (req.user.username !== 'adminR') {
        return res.status(403).json({ erro: 'Acesso negado. Apenas o administrador pode acessar.' });
    }
    next();
};
 
router.post('/usuarios', register);
router.post('/login', login);

router.get('/admin/usuarios', authenticateToken, requireAdmin, getUsers);

export default router;
