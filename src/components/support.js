import React, { Component } from './node_modules/react';
import { Grid, Cell } from './node_modules/react-mdl';
import cx from './node_modules/classnames';
import Collapse from './node_modules/@kunukn/react-collapse';

class Support extends Component {
    state = {
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpen4: false,
      isOpen5: false,
      isOpen6: false,
    }
    render() {
      return (
        <div className="app">
        <h2>Support</h2>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen1
            })}
            onClick={() => this.toggle(1)}
          >
            <span className="app__toggle-text">What is ChargeShare?</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen1 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen1}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen1 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
            ChargeShare is a company that is fully committed to driving the adoption of electric vehicles through providing fast and reliable charging infrastructure. The charging infrastructure will be centered around our mission to use fully renewable and sustainable energy.
            </div>
          </Collapse>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen2
            })}
            onClick={() => this.toggle(2)}
          >
            <span className="app__toggle-text">What makes ChargeShare different from other charging networks?</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen1 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen2}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen2 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
            ChargeShare has many differentiators from other networks. ChargeShare is the only network in the United States that will be able to charge any vehicle made by any manufacturer. Secondly, our network is open to investments from anyone. We are a charging network that is for the people, by the people.
            </div>
          </Collapse>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen3
            })}
            onClick={() => this.toggle(3)}
          >
            <span className="app__toggle-text">What cars are able to charge at ChargeShare stations?</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen3 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen3}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen3 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
            Any car sold in the United States will be able to charge at a ChargeShare station. To see what plug type is suited to your vehicle, visit our charging guide.
            </div>
          </Collapse>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen4
            })}
            onClick={() => this.toggle(4)}
          >
            <span className="app__toggle-text">Where can I find a charging station?</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen4 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen4}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen4 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
            Our network is rapidly expanding and always changing. Chargers can be found using our network page.
            </div>
          </Collapse>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen5
            })}
            onClick={() => this.toggle(5)}
          >
            <span className="app__toggle-text">Project Execution</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen4 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen5}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen5 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </div>
          </Collapse>
          <button
            className={cx("app__toggle", {
              "app__toggle--active": this.state.isOpen6
            })}
            onClick={() => this.toggle(6)}
          >
            <span className="app__toggle-text">Project Completion and Documentation</span>
            <div className="rotate90">
              <svg
                className={cx("icon", { "icon--expanded": this.state.isOpen4 })}
                viewBox="6 0 12 24"
              >
                <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
              </svg>
            </div>
          </button>
          <Collapse
            isOpen={this.state.isOpen6}
            className={
              "app__collapse app__collapse--gradient " +
              (this.state.isOpen6 ? "app__collapse--active" : "")
            }
          >
            <div className="app__content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </div>
          </Collapse>
        </div>
      );
    }
    toggle = index => {
      let collapse = "isOpen" + index;
  
      this.setState(prevState => ({ [collapse]: !prevState[collapse] }));
    };
  }
export default Support;