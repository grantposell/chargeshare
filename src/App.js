import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from "./components/main";
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header className="header-color" title={<Link style={{ textDecoration: 'none', color: 'white' }} to="/">ChargeShare</Link>} scroll>
            <Navigation>
              <a href="/invest">Invest</a>
              <a href="/network">Network</a>
              <a href="/pricing">Pricing</a>
              <a href="/aboutus">About Us</a>
            </Navigation>
          </Header>
          <Drawer title={<Link style={{textDecoration:'none', color: 'black'}} to="/">ChargeShare</Link>}>
            <Navigation>
              <a href="/invest">Invest</a>
              <a href="/network">Network</a>
              <a href="/pricing">Pricing</a>
              <a href="/aboutus">About Us</a>
            </Navigation>
          </Drawer>
          <Content>
            <div className="page-content" />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
