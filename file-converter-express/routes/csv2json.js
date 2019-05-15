const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('file'), (req, res, next) => {
  console.log(req.file, req.file.buffer.toString('utf8'));
  res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=file.csv'});
  res.end(csv2Json(req.file.buffer.toString('utf8'), req.query.delimeter));
});

function csv2Json (string, delimeter = ',') {
  const [ title, ...values ] = string.split(/\r?\n/);
  const header = title.split(delimeter);

  return JSON.stringify(values.map((line) => {
    return line.split(delimeter).reduce((container, value, index) => {
      container[header[index]] = value;
      return container;
    }, {});
  }));
}

module.exports = router;
