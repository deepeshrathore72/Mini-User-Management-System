import { useMemo } from 'react';

const PasswordStrength = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return null;

    let score = 0;
    
    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    
    // Complexity checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) return { level: 'weak', text: 'Weak Password', width: '33%' };
    if (score <= 4) return { level: 'medium', text: 'Medium Password', width: '66%' };
    return { level: 'strong', text: 'Strong Password', width: '100%' };
  }, [password]);

  if (!password || !strength) return null;

  return (
    <div className="password-strength-container">
      <div className="password-strength">
        <div 
          className={`password-strength-bar password-strength-${strength.level}`}
          style={{ width: strength.width }}
        />
      </div>
      <div className={`password-strength-text ${strength.level}`}>
        {strength.text}
      </div>
    </div>
  );
};

export default PasswordStrength;
