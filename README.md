# Project Dependencies Overview

This project uses several npm packages and web APIs to enable full-stack development, peer-to-peer networking, game rendering, user authentication, and data validation. Below is a summary of the key tools and libraries integrated into the project.

---

## NPM Packages

### **Express**
- **Link**: [express on npm](https://www.npmjs.com/package/express)
- **Description**: A minimal and flexible Node.js web framework used to build APIs and serve dynamic or static web content. Handles routing, middleware, and HTTP requests efficiently.

### **GUN**
- **Link**: [gun on npm](https://www.npmjs.com/package/gun)
- **Description**: A decentralized, peer-to-peer database that syncs in real-time. Used to build offline-first and collaborative applications, including decentralized ledgers and games.

### **HBS**
- **Link**: [hbs on npm](https://www.npmjs.com/package/hbs)
- **Description**: A Handlebars view engine for Express. Allows server-side rendering of HTML templates with dynamic data binding.

### **Kaplay**
- **Link**: [kaplay on npm](https://www.npmjs.com/package/kaplay)
- **Description**: A lightweight 2D JavaScript game engine for browser-based games. Provides sprite rendering, game loop control, and simple input handling.

### **Mongoose**
- **Link**: [mongoose on npm](https://www.npmjs.com/package/mongoose)
- **Description**: An ODM (Object Data Modeling) library for MongoDB. Enables schema definition, model-based querying, and built-in validation.

### **Validator**
- **Link**: [validator on npm](https://www.npmjs.com/package/validator)
- **Description**: A library for validating and sanitizing strings. Commonly used to ensure safe and clean user input (e.g. emails, URLs).

### **Bcrypt**
- **Link**: [bcrypt on npm](https://www.npmjs.com/package/bcrypt)
- **Description**: A password-hashing library for Node.js using the bcrypt algorithm. Ensures secure storage and comparison of user credentials.

---

## Cryptography Tools

### **Web Crypto API**
- **Link**: [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- **Description**: A browser-native cryptographic API used for hashing, encryption, and secure random number generation. Useful for client-side security operations.

### **CryptoJS**
- **Link**: [CryptoJS on CDNJS](https://cdnjs.com/libraries/crypto-js)
- **Description**: A JavaScript library for cryptographic operations such as AES encryption and SHA hashing. Can be used in both Node.js and browser environments.

---

### **Deployment**
- The site is deployed at:
- https://blockchain-project-rwj6.onrender.com

### **How to Save Scores**
- To have your score recorded:

- Go to the Log In section and sign in to an account. This will save your username.

- Then head to the Game page and enable mining on your device.

- Your top score will be broadcast and saved through the decentralized network.

## Installation

To install all dependencies, run:

```bash
npm install
