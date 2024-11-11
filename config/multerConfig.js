const multer = require('multer');
const path = require('path');

// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images')); // Folder to store images
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`); //file.originalname); // cb(null, Date.now() + path.extname(file.originalname)); // Set a unique name for each file
  }
});

// Filter files (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

module.exports = upload;