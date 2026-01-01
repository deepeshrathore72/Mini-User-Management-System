const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/jwt');

// Mock environment variable
process.env.JWT_SECRET = 'test_secret_key';

describe('JWT Utility Functions', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = '123456789';
      const token = generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return decoded data', () => {
      const userId = '123456789';
      const token = generateToken(userId);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.id).toBe(userId);
    });

    it('should throw an error for invalid token', () => {
      const invalidToken = 'invalid.token.string';
      
      expect(() => {
        verifyToken(invalidToken);
      }).toThrow('Invalid token');
    });
  });
});

describe('Password Hashing', () => {
  it('should hash password correctly', async () => {
    const password = 'TestPassword123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword.length).toBeGreaterThan(0);
  });

  it('should verify correct password', async () => {
    const password = 'TestPassword123!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    
    expect(isMatch).toBe(true);
  });

  it('should reject incorrect password', async () => {
    const password = 'TestPassword123!';
    const wrongPassword = 'WrongPassword456!';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isMatch = await bcrypt.compare(wrongPassword, hashedPassword);
    
    expect(isMatch).toBe(false);
  });
});
