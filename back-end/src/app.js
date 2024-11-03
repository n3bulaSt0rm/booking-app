const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.use(express.json());

//cors
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    }),
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
