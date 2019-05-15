const express = require('express');
const router = express.Router();

const multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


router.post('/', upload.single('file'), (req, res, next) => {
  res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=file.csv'});
  res.end(json2csv(req.file.buffer.toString('utf8'), req.query.delimeter));
});

function json2csv (json = '{}', delimeter = ',') {
  const data = JSON.parse(json);
  const header = Object.keys(data[0]);

  let csv = data.map((line) => header.map((fieldName) =>
    line[fieldName]).join(delimeter)
  );

  return [ header.join(delimeter), ...csv ].join('\r\n');
}

module.exports = router;
