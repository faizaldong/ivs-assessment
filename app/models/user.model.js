const db = require("./db.js");

// Create User
exports.create = (newUser, result) => {
    db.query(`INSERT INTO users (email, name) VALUES ("${newUser.email}", "${newUser.name}")`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
    
        result(null, { id: res.insertId, ...newUser });
    });
};

exports.login = (email, result) => {
    db.query(`SELECT email FROM users WHERE email = "${email}"`, (err, res) => {
        if (err) {
            result(err, null)
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found User with the email
        result({ kind: "not_found" }, null);
    })
}

exports.findSession = result => {
    db.query("SELECT * FROM SESSION", (err, res) => {
        if (err) {
            result(err, null)
            return;
        }

        result(null, res)
    })
}

exports.setSession = (session, result) => {
    db.query(`UPDATE SESSION SET active = ${session.active}, token = "${session.token}"`, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.findById = (userId, result) => {
    db.query(`SELECT * FROM users WHERE id = "${userId}"`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

exports.getAll = result => {
    db.query("SELECT * FROM users", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
};