const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.csv') {
        return callback(new Error('Only .csv files allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024,
    parts: 1,
  },
});

router.post('/', upload.single('file'), (req, res, next) => {
  res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=file.csv'});
  res.end(csv2Json(req.file.buffer.toString('utf8'), req.query.delimeter));
});

function csv2Json (string, delimeter = ',') {
  try {
    const [ title, ...values ] = string.split(/\r?\n/);
    const header = title.split(delimeter);
  
    return JSON.stringify(values.map((line) => {
      return line.split(delimeter).reduce((container, value, index) => {
        container[header[index]] = value;
        return container;
      }, {});
    }));

  } catch (error) {
    return error;
  }
}

module.exports = router;
