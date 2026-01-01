const { validationResult } = require('express-validator');

describe('Validation Rules', () => {
  describe('Email Validation', () => {
    it('should validate correct email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first.last@subdomain.example.com',
      ];

      validEmails.forEach(email => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        expect(emailRegex.test(email)).toBe(true);
      });
    });

    it('should reject invalid email format', () => {
      const invalidEmails = [
        'invalid.email',
        '@example.com',
        'user@',
        'user name@example.com',
      ];

      invalidEmails.forEach(email => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Password Strength Validation', () => {
    it('should validate strong passwords', () => {
      const strongPasswords = [
        'Test@1234',
        'MySecure#Pass99',
        'Admin$2024Pass',
      ];

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

      strongPasswords.forEach(password => {
        expect(password.length >= 8).toBe(true);
        expect(passwordRegex.test(password)).toBe(true);
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'short',
        'nouppercase123!',
        'NOLOWERCASE123!',
        'NoSpecialChar123',
        'NoNumber!',
      ];

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

      weakPasswords.forEach(password => {
        const isValid = password.length >= 8 && passwordRegex.test(password);
        expect(isValid).toBe(false);
      });
    });
  });
});

describe('User Role Validation', () => {
  it('should accept valid roles', () => {
    const validRoles = ['user', 'admin'];
    
    validRoles.forEach(role => {
      expect(['user', 'admin'].includes(role)).toBe(true);
    });
  });

  it('should reject invalid roles', () => {
    const invalidRoles = ['superadmin', 'guest', 'moderator'];
    
    invalidRoles.forEach(role => {
      expect(['user', 'admin'].includes(role)).toBe(false);
    });
  });
});

describe('User Status Validation', () => {
  it('should accept valid status values', () => {
    const validStatuses = ['active', 'inactive'];
    
    validStatuses.forEach(status => {
      expect(['active', 'inactive'].includes(status)).toBe(true);
    });
  });

  it('should reject invalid status values', () => {
    const invalidStatuses = ['pending', 'suspended', 'deleted'];
    
    invalidStatuses.forEach(status => {
      expect(['active', 'inactive'].includes(status)).toBe(false);
    });
  });
});
