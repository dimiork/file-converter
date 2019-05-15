const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.json') {
        return callback(new Error('Only .json files allowed'))
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
  res.end(json2csv(req.file.buffer.toString('utf8'), req.query.delimeter));
});

function json2csv (json = '{}', delimeter = ',') {
  try {
    const data = JSON.parse(json);
    const header = Object.keys(data[0]);
  
    let csv = data.map((line) => header.map((fieldName) =>
      line[fieldName]).join(delimeter)
    );
  
    return [ header.join(delimeter), ...csv ].join('\r\n');
  } catch (error) {
    return error;
  }
  
}

module.exports = router;
