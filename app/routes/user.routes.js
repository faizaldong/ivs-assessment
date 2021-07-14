module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // SignUP a new User
    app.post("/user", users.create);

    // Login User
    app.post("/login", users.login)

    // Check user active
    app.get("/session", users.findSession)

    // Set user session
    app.put("/session", users.setSession)
  
    // Retrieve all users
    app.get("/users", users.authenticateToken, users.findAll);
  
    // Retrieve a single User with userId
    app.get("/user/:userId", users.authenticateToken, users.findOne);
};
