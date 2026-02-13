import bcrypt from 'bcrypt';
import query from '../config/db.js';

export async function registerUser(req, res) {
    try {
    // 1. Extract fields from the request body
    const { email, fullName, password, rePassword } = req.body;

    // 2. Basic Validation
    if (!email || !fullName || !password || !rePassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password !== rePassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // 3. Check if user already exists
    const userExists = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // 4. Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 5. Insert into Database
    const insertQuery = `
      INSERT INTO users (email, full_name, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, email, full_name, created_at;
    `;
    const result = await query(insertQuery, [email, fullName, passwordHash]);

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}