# file-converter
## Installation
- clone repository
- cd into directory with project
- install deps and run devserver: `npm install && npm run start:dev`;
## Usage
Make a `POST` request on http://localhost:3000/ (enabled endpoints: `json2csv` or `csv2json`) with `multipart/form-data` type **json** or **csv** file.
