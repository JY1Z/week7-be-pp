const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone_number: '123-456-7890',
      gender: 'Male',
      date_of_birth: new Date('1990-01-01'),
      membership_status: 'active',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      phone_number: '987-654-3210',
      gender: 'Female',
      date_of_birth: new Date('1992-02-02'),
      membership_status: 'inactive',
    },
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpass',
      phone_number: '555-555-5555',
      gender: 'Male',
      date_of_birth: new Date('1985-05-15'),
      membership_status: 'active',
    }
  ];
  
  module.exports = users;
  