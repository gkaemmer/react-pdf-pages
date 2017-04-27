### v0.1.4
- Added `display: block` to each page's canvas element. Sometimes, a `canvas`'s container element would have a few pixels of extra height if it's display was `inline`.

### v0.1.3
- Fixed a bug where quickly changing `props.url` could render an incorrect document.

### v0.1.2
- Pass `className` and `style` props on `PDF` to container div.

### v0.1.1
- Add `onSizeReady` to `Page`, allowing for a callback when each page's size has been determined.
