const express = require('express');
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const path = require('path');
const readline = require('readline');


router.post('/csv2json', upload.single('file'), async function(req, res, next) {
  res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=file.txt'});
  res.end(await csv2Json(req.file.path, req.query.delimeter), cleanUploads);
});

function cleanUploads() {
  const directory = 'uploads';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

async function csv2Json (filePath, delimeter = ',') {
  const [ title, ...values ] = await processLineByLine(filePath);
  const headers = title.split(delimeter);

  return JSON.stringify(values.map((line) => {
    return line.split(delimeter).reduce((container, value, index) => {
      container[headers[index]] = value;
      return container;
    }, {});
  }));
}

async function processLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const data = [];
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    data.push(line);
  }
  return data;
}

module.exports = router;
