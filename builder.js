const fs = require('fs');
const execSync = require('child_process').execSync;

const { globSync } = require('glob')

const prettify = require('html-prettify');


const files = globSync('pages/**/*.md', { ignore: 'node_modules/**' })

const header = fs.readFileSync('templates/header.html', 'utf8');
const footer = fs.readFileSync('templates/footer.html', 'utf8');

for (_file of files) {
    const outputHtml = _file.replace('index.md', 'index.html');
    const output = execSync(`npx github-markdown ${_file}`, { encoding: 'utf-8' })

    fs.writeFileSync(outputHtml, header + prettify(output) + footer);
}


// const output = execSync('npx github-markdown pages/documentation/introduction.md > test.html', { encoding: 'utf-8' }); 