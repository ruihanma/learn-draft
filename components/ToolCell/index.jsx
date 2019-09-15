import React from "react";
import { Button } from "antd";

export default class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton mr-2";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <Button
        type={this.props.active ? "primary" : "default"}
        className={className}
        onMouseDown={this.onToggle}
      >
        {this.props.label}
      </Button>
    );
  }
}
