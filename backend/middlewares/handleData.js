const multer = require('multer');
const path = require('path');

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products/') // pastikan folder ini ada
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // memberi nama unik untuk file
  }
});

const upload = multer({ storage: storage });