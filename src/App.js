import React, { Component } from 'react';
import './App.css';
import './app.scss';
import { Layout, Header, Navigation, Drawer, Content, Footer, FooterSection, FooterLinkList, Grid, Cell } from 'react-mdl';
import Main from "./components/Main";
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
        <Layout>
          <Header className="header-color" title={<Link className="icon" style={{ textDecoration: 'none', color: 'white' }} to="/">ChargeShare</Link>} scroll>
            <Navigation>
              <a href="/charging">Charging</a>
              <a href="/energy">Energy</a>
              <a href="/network">Network</a>
            </Navigation>
          </Header>
          <Drawer title={<Link style={{ textDecoration: 'none', color: 'black' }} to="/">ChargeShare</Link>}>
            <Navigation>
              <a href="/invest">Invest</a>
              <a href="/network">Network</a>
              <a href="/pricing">Pricing</a>
              <a href="/aboutus">About Us</a>
              <a href="/Support">Support</a>
            </Navigation>
          </Drawer>
          <Content>
            <div className="page-content" />
            <Main></Main>
          </Content>
          <Footer size="mini">
            <FooterSection type="left" logo="ChargeShare © 2019" >
              <FooterLinkList>
                <a href="/privacy">Privacy & Legal</a>
                <a href="/contact">Contact</a>
                <a href="/careers">Careers</a>
                <a href="#">Get Newsletter</a>
                <a href="/forums">Forums</a>
              </FooterLinkList>
            </FooterSection>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
