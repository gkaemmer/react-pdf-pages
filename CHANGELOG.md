### v0.1.7
- Pass raw PDFJS `file` object as second argument to `onComplete`.

### v0.1.6
- Performance improvements (especially for phones with small screens)--the width of the canvas (using `clientWidth`) now determines the pixel density of the rendered PDF.

### v0.1.5
- Allow passing custom `className` and `style` props to `Page`.
- Re-throw errors if no `onError` prop is passed to `PDF`.
- Allow custom headers with `headers` prop on `PDF` (thanks to [jacobkneal](https://github.com/jacobkneal))

### v0.1.4
- Added `display: block` to each page's canvas element. Sometimes, a `canvas`'s container element would have a few pixels of extra height if it's display was `inline`.

### v0.1.3
- Fixed a bug where quickly changing `props.url` could render an incorrect document.

### v0.1.2
- Pass `className` and `style` props on `PDF` to container div.

### v0.1.1
- Add `onSizeReady` to `Page`, allowing for a callback when each page's size has been determined.
