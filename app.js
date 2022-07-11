const express = require('express');

const router = express();

const auth = require('./routes/auth.routes');
router.use("/auth", auth);

router.listen(4000, () => console.log(`Server is listening on port ${4000}`));

