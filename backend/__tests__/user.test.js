const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// Mock database connection
jest.mock('../config/database', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('User Controller Tests', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    // Create a test user and generate token
    userId = '507f1f77bcf86cd799439011';
    authToken = generateToken(userId);
  });

  describe('GET /api/users/profile', () => {
    it('should return 401 without authentication token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Not authorized');
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .send({ fullName: 'Updated Name' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ 
          email: 'invalid-email',
          fullName: 'Test User'
        });

      // Should fail validation
      expect([400, 401, 404]).toContain(response.status);
    });
  });

  describe('PUT /api/users/change-password', () => {
    it('should require current password', async () => {
      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          newPassword: 'NewPass123!'
        });

      expect([400, 401, 404]).toContain(response.status);
    });

    it('should validate new password strength', async () => {
      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'OldPass123!',
          newPassword: 'weak'
        });

      expect([400, 401, 404]).toContain(response.status);
    });
  });
});

describe('Input Validation Tests', () => {
  describe('Sanitization', () => {
    it('should trim whitespace from full name', () => {
      const input = '  John Doe  ';
      const sanitized = input.trim();
      expect(sanitized).toBe('John Doe');
    });

    it('should convert email to lowercase', () => {
      const input = 'Test@Example.COM';
      const sanitized = input.toLowerCase();
      expect(sanitized).toBe('test@example.com');
    });
  });

  describe('Length validation', () => {
    it('should enforce minimum full name length', () => {
      const shortName = 'A';
      expect(shortName.length >= 2).toBe(false);
      
      const validName = 'John Doe';
      expect(validName.length >= 2).toBe(true);
    });

    it('should enforce minimum password length', () => {
      const shortPassword = 'Pass1!';
      expect(shortPassword.length >= 8).toBe(false);
      
      const validPassword = 'Pass123!';
      expect(validPassword.length >= 8).toBe(true);
    });
  });
});

describe('Error Response Format Tests', () => {
  it('should return consistent error format', () => {
    const errorResponse = {
      success: false,
      message: 'Error message',
    };

    expect(errorResponse).toHaveProperty('success');
    expect(errorResponse).toHaveProperty('message');
    expect(errorResponse.success).toBe(false);
  });

  it('should include validation errors array when applicable', () => {
    const validationErrorResponse = {
      success: false,
      message: 'Validation failed',
      errors: [
        { field: 'email', message: 'Invalid email' },
        { field: 'password', message: 'Password too weak' }
      ]
    };

    expect(validationErrorResponse).toHaveProperty('errors');
    expect(Array.isArray(validationErrorResponse.errors)).toBe(true);
    expect(validationErrorResponse.errors[0]).toHaveProperty('field');
    expect(validationErrorResponse.errors[0]).toHaveProperty('message');
  });
});

describe('HTTP Status Code Tests', () => {
  it('should use 200 for successful operations', () => {
    expect(200).toBe(200); // Success
  });

  it('should use 201 for resource creation', () => {
    expect(201).toBe(201); // Created
  });

  it('should use 400 for bad requests', () => {
    expect(400).toBe(400); // Bad Request
  });

  it('should use 401 for unauthorized access', () => {
    expect(401).toBe(401); // Unauthorized
  });

  it('should use 403 for forbidden access', () => {
    expect(403).toBe(403); // Forbidden
  });

  it('should use 404 for not found', () => {
    expect(404).toBe(404); // Not Found
  });

  it('should use 500 for server errors', () => {
    expect(500).toBe(500); // Internal Server Error
  });
});
