import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Page extends Component {
  static propTypes = {
    page: React.PropTypes.shape({
      key: React.PropTypes.number.isRequired,
      file: React.PropTypes.shape({
        getPage: React.PropTypes.func.isRequired
      })
    }).isRequired
  }

  renderPage() {
    const { key, file } = this.props.page
    file.getPage(key)
      .then(page => {
        // Make pages look nice on retina screens
        const pixelScale = window.devicePixelRatio || 1
        const scale = 2
        const viewport = page.getViewport(scale * pixelScale)

        // Prepare canvas using PDF page dimensions
        const canvas = ReactDOM.findDOMNode(this.refs['canvas'])
        if (!canvas)
          return;
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        }
        page.render(renderContext)
      })
      .catch(error => {
        throw error;
      });
  }

  componentDidMount() {
    this.renderPage()
  }

  render() {
    return (
      <canvas style={{ width: '100%', height: 'auto' }} ref='canvas' />
    )
  }
}
