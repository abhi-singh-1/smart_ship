const axios = require('axios');
const express = require('express');
const app = express();

const apiURL = 'https://jsonplaceholder.typicode.com/comments';

axios.get(apiURL)
  .then(response => {
    // for success
    if (response.status === 200) {
      const comments = response.data;

      console.log('First 10 Records:');
      comments.slice(0, 10).forEach(comment => {
        console.log(comment);
      });

      console.log('\nData in Tabular Format:');
      console.table(comments.slice(0, 10));

      app.get('/filter', (req, res) => {
        const keyword = 'aliquam';
        const filteredComments = comments.filter(comment =>
          comment.body.toLowerCase().includes(keyword.toLowerCase())
        );
        res.json(filteredComments);
      });

      app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    } else {
      console.error(`Failed to retrieve data. Status code: ${response.status}`);
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
