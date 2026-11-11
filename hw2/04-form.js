// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the us

// Import express
const express = require('express');
// create the express application
const app = express();
// set the port nmber
const port = process.env.PORT || 5001;

// Read form data
app.use(express.urlencoded({ extended: true }));

// Display the form
app.get('/form', (req, res) => {
    res.send(`
        <h1>My Form</h1>
        
        
        <form action="/submit" method="POST">
            <label>Username:</label>
            <input type="text" name="username" required>
            <br><br>

            <label>Email:</label>
            <input type="email" name="email" required>
            <br><br>

            <label>Comments:</label>
            <textarea name="comments"></textarea>
            <br><br>

            <label>
                <input type="checkbox" name="newsletter" value="Yes">
                Sign up for newsletter
            </label>
            <br><br>

            <button type="submit">Submit</button>
        </form>
    `);
});

// Display submitted data
app.post('/submit', (req, res) => {
    res.send(`
        <h1>Submitted Data</h1>
        <p>Username: ${req.body.username}</p>
        <p>Email: ${req.body.email}</p>
        <p>Comments: ${req.body.comments || 'None'}</p>
        <p>Newsletter: ${req.body.newsletter || 'No'}</p>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

