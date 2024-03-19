export const users = [
  {
    contactInfo: {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@fake.com",
      phone: "054-1234567",
    },
    password: "!Aa1234",
    address: {
      country: "Israel",
      city: "Rehovot",
      street: "Ezra",
      houseNumber: "10",
      zip: "111111",
    },
    isEmployee: true,
    isAdmin: true,
  },
  {
    contactInfo: {
      firstName: "Employee",
      lastName: "Employee",
      email: "employee@fake.com",
      phone: "054-7894562",
    },
    password: "!Aa1234",
    address: {
      country: "Israel",
      city: "Rishon LeTsiyon",
      street: "Herzl",
      houseNumber: "5",
      zip: "222222",
    },
    isEmployee: true,
    isAdmin: false,
  },
  {
    contactInfo: {
      firstName: "Customer",
      lastName: "Customer",
      email: "customer@fake.com",
      phone: "054-9513572",
    },
    password: "!Aa1234",
    address: {
      country: "Israel",
      city: "Holon",
      street: "Golomb",
      houseNumber: "22",
      zip: "333333",
    },
    isEmployee: false,
    isAdmin: false,
  },
];
