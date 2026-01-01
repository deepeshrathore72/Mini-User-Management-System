require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const createAdminUser = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      
      // Update to admin if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('User updated to admin role');
      }
      
      process.exit(0);
    }

    // Create new admin user
    const adminUser = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123456',
      role: 'admin',
      status: 'active',
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@example.com');
    console.log('Password: Admin@123456');
    console.log('\nPlease change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

const createSampleUsers = async () => {
  try {
    await connectDB();

    const sampleUsers = [
      {
        fullName: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'Password123!',
        role: 'user',
        status: 'active',
      },
      {
        fullName: 'Bob Smith',
        email: 'bob@example.com',
        password: 'Password123!',
        role: 'user',
        status: 'active',
      },
      {
        fullName: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'Password123!',
        role: 'user',
        status: 'inactive',
      },
      {
        fullName: 'Diana Prince',
        email: 'diana@example.com',
        password: 'Password123!',
        role: 'user',
        status: 'active',
      },
      {
        fullName: 'Eve Wilson',
        email: 'eve@example.com',
        password: 'Password123!',
        role: 'user',
        status: 'active',
      },
    ];

    for (const userData of sampleUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
        console.log(`Created user: ${userData.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log('\nSample users created successfully!');
    console.log('All users have password: Password123!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating sample users:', error);
    process.exit(1);
  }
};

// Run based on command line argument
const command = process.argv[2];

if (command === 'admin') {
  createAdminUser();
} else if (command === 'users') {
  createSampleUsers();
} else if (command === 'all') {
  (async () => {
    await createAdminUser();
    await createSampleUsers();
  })();
} else {
  console.log('Usage:');
  console.log('  node seed.js admin  - Create admin user');
  console.log('  node seed.js users  - Create sample users');
  console.log('  node seed.js all    - Create admin and sample users');
  process.exit(0);
}
