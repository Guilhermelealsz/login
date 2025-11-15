import { getAllUsersForAdmin, getUserCountForAdmin } from '../Repository/AdmRepository.js';

export const getUsers = async (req, res) => {
    try {
        const usuarios = await getAllUsersForAdmin();
        const total = await getUserCountForAdmin();

        res.json({ usuarios, total });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
};
