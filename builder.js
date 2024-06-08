const fs = require('fs');
const execSync = require('child_process').execSync;

const { globSync } = require('glob')

const prettify = require('html-prettify');

const showdown  = require('showdown');
showdown.setFlavor('github');
const converter = new showdown.Converter();


const files = globSync('pages/**/*.md', { ignore: 'node_modules/**' })

const header = fs.readFileSync('templates/header.html', 'utf8');
const footer = fs.readFileSync('templates/footer.html', 'utf8');

for (_file of files) {
    const outputHtmlFilePath = _file.replace('index.md', 'index.html');

    // const mdContent = fs.readFileSync(_file, 'utf8');
    // const htmlContent = converter.makeHtml(mdContent);
    const output = execSync(`npx github-markdown ${_file}`, { encoding: 'utf-8' })

    fs.writeFileSync(outputHtmlFilePath, header + output.replaceAll('user-content-', '') + footer);
}


// const output = execSync('npx github-markdown pages/documentation/introduction.md > test.html', { encoding: 'utf-8' }); 