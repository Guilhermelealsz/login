import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findByEmail, findByUsername } from '../Repository/usuarioRepository.js';

export const register = async (req, res) => {
    try {
        const { nome, email, senha, username, celular, data_nascimento } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
        }

        const existingEmail = await findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        if (username) {
            const existingUsername = await findByUsername(username);
            if (existingUsername) {
                return res.status(400).json({ erro: 'Username já cadastrado' });
            }
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const userId = await createUser({
            nome,
            email,
            senha: hashedPassword,
            username: username || null,
            celular: celular || null,
            data_nascimento: data_nascimento || null
        });

        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', id: userId });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
        }

        const user = await findByEmail(email);
        if (!user) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { senha: _, ...userWithoutPassword } = user;
        res.json({ token, usuario: userWithoutPassword });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
