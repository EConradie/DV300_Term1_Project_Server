![Group 250](https://github.com/EConradie/DV300_Term1_Project_Server/assets/113447065/a31d3b68-be5b-4c52-8813-072a699bab47)

# Server Setup Guide

This guide will walk you through setting up and running the server located in the `server` folder.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or newer recommended)
- npm (usually comes with Node.js)
- A PostgreSQL database (or adjust based on your actual database)

## Step 1: Clone the Repository

If you haven't already, clone the repository to your local machine. Use the following command:
```
https://github.com/EConradie/DV300_Term1_Project_Server.git
```

Inside the Server project locate to the server file with this command:
```
cd server
```

## Step 2: Install Dependencies

Navigate to the `server` directory if you haven't already, and install the necessary dependencies by running:
```
npm install
```

## Step 3: Configure the Environment

Create a `.env` file in the `server` directory. You'll need to specify your database connection settings and any other environment variables required by the server:
```
PORT = 3000
TWILIO_ACCOUNT_SID=AC464bbdb00c1b7e6b0ee938ede46e1609
TWILIO_AUTH_TOKEN=0e616ebbdc8d482372cdba34cf0677d0
TWILIO_VERIFY_SERVICE_SID=VA94cd98ba30a46917cb3802ee533918c0
```

## Step 5: Start the Server

Finally, start the server with:
```
npm run dev
```

## Accessing the Server

Once the server is running, you should be able to access it at the specified address, usually `http://localhost:3000` unless configured differently.

## Troubleshooting

- If you encounter any issues with database connections, verify your `.env` settings and ensure your database is running.
- For dependency errors, try deleting the `node_modules` folder and the `package-lock.json` file, then run `npm install` again.

## Further Help

For more detailed instructions or help with specific problems, please refer to the project's documentation or contact the development team.

## License

[MIT](LICENSE) © Emilio Carreira, Erik Conradie























