const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addAdminUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Check if admin user already exists
    const existingAdmin = await prisma.administration.findUnique({
      where: { username: 'elhacen' }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create the admin user
    const adminUser = await prisma.administration.create({
      data: {
        username: 'elhacen',
        password: hashedPassword
      }
    });

    console.log('✅ Admin user created successfully:', {
      id: adminUser.id,
      username: adminUser.username
    });

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addAdminUser();
