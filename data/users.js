import bcrypt from 'bcryptjs'

const users = [
    {
      name: 'Admin User',
      username: 'admin',
      country: 'germany',
      city: 'berlin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
      
    },
    {
      name: 'John Doe',
      username: 'johndoe',
      country: 'germany',
      city: 'berlin',
      email: 'john@example.com',
      password: bcrypt.hashSync('123456', 10),
    },
    {
      name: 'Jane Doe',
      username: 'janedoe',
      country: 'germany',
      city: 'berlin',
      email: 'jane@example.com',
      password: bcrypt.hashSync('123456', 10),
    },
  ]

export default users