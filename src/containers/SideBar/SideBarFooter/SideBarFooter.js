import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import "./SideBarFooter.scss";
export default class SideBarFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu.Item>
          <div className="footer-block">
            <div>About Press Copyright</div>
            <div>Creators Advertise</div>
            <div>Developers +MyTube</div>
            <div>Legal</div>
          </div>
          <div className="footer-block">
            <div>Terms Privacy</div>
            <div>Policy & Safety</div>
            <div>Test new features</div>
          </div>
          <div className="footer-block">
            <div>All prices include VAT</div>
          </div>

          <div className="footer-block">
            <div>
              © Productioncoder.com - A Youtube clone for educational purposes
              under fair use.
            </div>
          </div>
        </Menu.Item>
      </React.Fragment>
    );
  }
}
