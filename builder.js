const fs = require('fs');
const execSync = require('child_process').execSync;

const { globSync } = require('glob')

const prettify = require('html-prettify');

const showdown  = require('showdown');
showdown.setFlavor('github');
const converter = new showdown.Converter();

let fileName = "";
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if (val.includes('--file-name=')) {
        fileName = val.split('--file-name=')[1];
    }
});

const files = globSync('pages/**/*.md', { ignore: 'node_modules/**' })


const header = fs.readFileSync('templates/header.html', 'utf8');
const footer = fs.readFileSync('templates/footer.html', 'utf8');

for (_file of files) {
    if (fileName && _file.includes(fileName) || !fileName) {
        const outputHtmlFilePath = _file.replace('index.md', 'index.html');

        // const mdContent = fs.readFileSync(_file, 'utf8');
        // const htmlContent = converter.makeHtml(mdContent);
        const output = execSync(`npx github-markdown ${_file}`, { encoding: 'utf-8' })

        fs.writeFileSync(outputHtmlFilePath, header + output.replaceAll('user-content-', '') + footer);
    }
}


console.log(process.argv);

// const output = execSync('npx github-markdown pages/documentation/introduction.md > test.html', { encoding: 'utf-8' }); 