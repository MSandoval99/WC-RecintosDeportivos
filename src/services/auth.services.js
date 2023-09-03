import { pool } from '../config/db.js';
import { encrypt, verified } from '../utils/bcrypt.handle.js';
import { generateToken } from '../utils/jwt.handle.js';

const registerNewUser = async ({ email, password, name }) => {
  try {
    const [existingUsers] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) return { error: true, message: 'ALREADY_USER' };

    const passHash = await encrypt(password);
    const [result] = await pool.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, passHash, name]);
    console.log(result);
    return result.insertId ? { success: true } : { error: true, message: 'Failed to register user.' };

  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('DATABASE_ERROR');
  }
}

const loginUser = async ({ email, password }) => {
  try {
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return { error: true, message: 'NOT_FOUND_USER' };

    const user = users[0];
    const isCorrect = await verified(password, user.password);
    if (!isCorrect) return { error: true, message: 'PASSWORD_INCORRECT' };

    const token = generateToken(user.email);
    return {
      token,
      user
    };

  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('DATABASE_ERROR');
  }
}

export { registerNewUser, loginUser };
