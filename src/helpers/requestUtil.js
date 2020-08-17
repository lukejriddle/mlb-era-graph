require('dotenv').config()

function postFeedback(feedback) {
    console.log('feedback: ' + feedback)
    fetch('https://mlb-era-graph.com/api/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({feedback})
    }).then(response => response.json())
    .then(data => console.log(data));
}

export {
    postFeedback
}
