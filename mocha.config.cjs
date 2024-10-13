#! /usr/bin/env node

require('jsdom-global')(undefined, { url: 'https://localhost' });
const jSuites = require("jsuites");
global.jSuites = jSuites;

const jspreadsheet = require("./src/index.js");

global.jspreadsheet = jspreadsheet;
// TODO: Option is not defined
// see https://stackoverflow.com/questions/39501589/jsdom-option-is-not-defined-when-running-my-mocha-test
global.Option = window.Option;
global.root =  document.createElement('div');
global.root.style.width = '100%';
global.root.style.height = '100%';
document.body.appendChild(global.root);

exports.mochaHooks = {
    afterEach(done) {
        jspreadsheet.destroy(root);
        done();
    },
};