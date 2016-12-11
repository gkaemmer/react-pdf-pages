# react-pdf-pages
Simple, adaptable component to render PDF files in React

### Installation

`npm install react-pdf-pages, github: 'gkaemmer/react-pdf-pages'`

### Usage

`react-pdf-pages` exports two components `PDF` and `Page`, which you can import like this:

```
import PDF, { Page } from 'react-pdf-pages';
```

The `PDF` components handles the loading of the file, which you pass to it as a URL:

```
<PDF url="/path/to/file.pdf" ...>
```

The `PDF` component renders nothing on its own, but is intended to wrap `Page`s so that you can style them yourself. Minimal example:

```
class PDFViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: null
    }
  }

  render() {
    return (
      <PDF url={this.state.url}
           onComplete={(pages) => this.setState({ pages })}>
        {this.state.pages &&
          <div>
            {this.state.pages.map((page) =>
              <Page key={page.key} page={page} />
            )}
          </div>
        }
      </PDF>
    );
  }
}
```

### API

#### `PDF`
The PDF wrapper component. Renders only its children. Props:

* `url: string`: The url to load. *Warning: PDFJS uses XMLHttpRequests under the hood, so loading a URL from a different domain requires CORS permissions.*
* `onComplete: function (pages)`: Called when the file is done loading and is ready to render. To render pages, keep track of the value of `pages` and pass them to `Page`s components.
* `onProgress: function (loadedObj)`: Called as the PDF loads. Use `loadedObj.loaded` and `loadedObj.total` to show loading progress. See the full-featured example for usage.
* `onError: function(error)`: Called when the PDF fails to load. `error.message` contains the message from PDF.js.

#### `Page`
Renders a page of a PDF. Always grows to fill the width of its parent, and its height depends on the height of the rendered PDF page. Props:

* `page`: A page from `pages` passed to `onComplete`.

### Importing PDF.js
To use `react-pdf-pages`, you must include PDF.js in the page as the global `PDFJS`. To do this, it's recommended that you include `pdfjs-dist` in your bundle, like so:

```
// client.js
import 'pdfjs-dist';

// Note: this uses file-loader, in order to prevent pdf.worker.min.js from
// being loaded into the entry bundle. It should be loaded by the browser
// on its own.
PDFJS.workerSrc = require('file-loader!pdfjs-dist/build/pdf.worker.min.js');

// ...
```

### Complete Example

```
import 'pdfjs-dist';
import PDF, { Page } from 'react-pdf-pages';
PDFJS.workerSrc = require('file-loader!pdfjs-dist/build/pdf.worker.min.js');

class PDFViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '/example.pdf',
      pages: null,
      loaded: 0,
      total: 0,
      error: null
    }
  }

  render() {
    return (
      <div>
        {/* Allow editing of the URL (totally optional) */}
        <form onSubmit={(e) => { e.preventDefault(); this.setState({ url: this.refs.url.value })}}>
          <input type="text" ref="url" defaultValue={this.state.url} />
          <input type="submit" value="Update URL" />
        </form>

        <PDF url={this.state.url}
             onProgress={({ loaded, total }) => this.setState({ loaded, total })}
             onComplete={(pages) => this.setState({ error: null, pages })}
             onError={(error) => this.setState({ error })}>
          {this.state.error
            ? <span>
                {this.state.error.message}
              </span>
            : this.state.pages
              ? <div>
                  {this.state.pages.map((page) =>
                    <Page key={page.key} page={page} />
                  )}
                </div>
              : <span>Loading {Math.round(this.state.loaded * 100/this.state.total)}</span>
          }
        </PDF>
      </div>
    );
  }
}

```
