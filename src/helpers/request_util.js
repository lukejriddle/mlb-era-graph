require('dotenv').config()

function post_feedback(feedback) {
    console.log('feedback: ' + feedback)
    fetch('http://localhost:5000/api/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({feedback})
    }).then(response => response.json())
    .then(data => console.log(data));
}

module.exports = {
    post_feedback: post_feedback
}