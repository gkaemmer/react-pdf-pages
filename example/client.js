import ReactDOM from 'react-dom';
import React from 'react';
import PDFTest from './PDFTest';
import 'pdfjs-dist';

PDFJS.workerSrc = require('file-loader!pdfjs-dist/build/pdf.worker.min.js');

ReactDOM.render(<PDFTest />, document.getElementById('root'));
