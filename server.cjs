let express = require('express');
let app = express();
const path = require('path');

const PORT = 3000;

const router = express.Router();

app.use(express.static(path.resolve(__dirname, 'dist')));

console.log(`server running at port ${PORT}`);

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.use('', router);

app.listen(PORT);
