var fs = require('fs');
var capitalize = require('capitalize');
const replace = require('replace-in-file');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];

var block_types = [
  'call-to-action',
  'contacts',
  'contents',
  'features',
  'footers',
  'forms',
  'headers',
  'pricings',
  'teams',
  'testimonials'
]

function createJsxFile (path, item, block_type) {
  let name = item.split('.html')[0]
  let newName = capitalize.words(name.split('-').join(' ')).split(' ').join('')

  let newPath = `src/${block_type}/${newName}.jsx`

  fs.readFile(`${path}/${item}`, 'utf8', function(err, contents) {
    fs.writeFile(newPath, `import React, { Component } from 'react';
import Iframe from 'react-iframe';

class ${newName} extends Component {
  render() {
    return ${contents}
  }
}

export default ${newName}
`, function (err) {
    replace.sync({
      files: newPath,
      from: /class=/g,
      to: 'className='
    })

    replace.sync({
      files: newPath,
      from: /colspan=/g,
      to: 'colSpan='
    })

    replace.sync({
      files: newPath,
      from: /frameborder=/g,
      to: 'frameBorder='
    })

    replace.sync({
      files: newPath,
      from: /allowfullscreen=\"\"/g,
      to: 'allowFullScreen={true}'
    })

    replace.sync({
      files: newPath,
      from: /<iframe([^<]*) src=/g,
      to: '<iframe$1 url='
    })

    replace.sync({
      files: newPath,
      from: /<iframe([^<]*)><\/iframe>/g,
      to: '<Iframe$1 position="relative"/>'
    })

    replace.sync({
      files: newPath,
      from: /<img ([^<]*)>/g,
      to: '<img $1 />'
    });

    replace.sync({
      files: newPath,
      from: /<input ([^<]*)>/g,
      to: '<input $1 />'
    });

    replace.sync({
      files: newPath,
      from: /<br>/g,
      to: '<br/>'
    });

    replace.sync({
      files: newPath,
      from: /<hr([^<]*)>/g,
      to: '<hr$1/>'
    });

    replace.sync({
      files: newPath,
      from: /style=\"background-image: url\(([^)]*)\);?\"/g,
      to: 'style={{backgroundImage: \'url($1)\'}}'
    });

    replace.sync({
      files: newPath,
      from: /style=\"background: url\(([^)]*)\)\"/g,
      to: 'style={{background: \'url($1)\'}}'
    });
  })
})
}

function copyFile(itemPath, newPath) {
  var ws = fs.createReadStream(itemPath);
  ws.pipe(fs.createWriteStream(newPath));
  ws.on('close', function () {

  })
}

function readContents(path, block_type) {
  fs.readdir(path, function(err, items) {
      for (var i = 0; i < items.length; i++) {
        createJsxFile(path, items[i], block_type)
      }
  });
}

for (var i = 0; i < block_types.length; i++) {
  readContents(`${path}/src/html/${block_types[i]}`, block_types[i])
}