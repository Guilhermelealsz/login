import pool from '../Controller/db.js';

export const createUser = async (userData) => {
    const { nome, email, senha, username, celular, data_nascimento } = userData;
    const query = `
        INSERT INTO usuarios (nome, email, senha, username, celular, data_nascimento)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, email, senha, username, celular, data_nascimento];
    const [result] = await pool.execute(query, values);
    return result.insertId;
};

export const findByEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
};

export const findByUsername = async (username) => {
    const query = 'SELECT * FROM usuarios WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows[0];
};

export const getAllUsers = async () => {
    const query = 'SELECT id, nome, username, email FROM usuarios ORDER BY id DESC';
    const [rows] = await pool.execute(query);
    return rows;
};

export const getUserCount = async () => {
    const query = 'SELECT COUNT(*) as count FROM usuarios';
    const [rows] = await pool.execute(query);
    return rows[0].count;
};
