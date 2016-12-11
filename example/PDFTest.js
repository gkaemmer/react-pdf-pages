import React, { Component } from 'react';
import PDF, { Page } from '../src/index';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  font-family: Helvetica, Arial, sans-serif;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 2em;
  margin: 0 0 10px;
`;

const Loading = styled.div`
  color: #aaa;
`;

const PageContainer = styled.div`
  width: 640px;
  margin: 0 auto 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Error = styled.div`
  background-color: #bb0000;
  border: 1px solid #aa0000;
  border-radius: 3px;
  padding: 10px;
  display: inline-block;
  color: #fff;
`;

export default class PDFTest extends Component {
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
      <Container>
        <Title>React PDF Pages</Title>
        <form onSubmit={(e) => { e.preventDefault(); this.setState({ url: this.refs.url.value })}}>
          <input type="text" ref="url" defaultValue={this.state.url} />
          <input type="submit" value="Update URL" />
        </form>
        <PDF url={this.state.url}
             onProgress={({ loaded, total }) => this.setState({ loaded, total })}
             onComplete={(pages) => this.setState({ error: null, pages })}
             onError={(error) => this.setState({ error })}>
          {this.state.error
            ? <Error>
                {this.state.error.message}
              </Error>
            : this.state.pages
              ? <div>
                  {this.state.pages.map((page) =>
                    <PageContainer key={page.key}>
                      <Page page={page} />
                    </PageContainer>
                  )}
                </div>
              : <Loading>Loading {this.state.loaded} / {this.state.total}</Loading>
          }
        </PDF>
      </Container>
    );
  }
}
