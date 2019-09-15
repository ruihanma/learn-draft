import React from "react";
import { Editor, EditorState } from "draft-js";

import ToolCell from "../ToolCell";

export default class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inlineStyles: this.props.inlineStyles || []
    };
  }

  render() {
    const { inlineStyles } = this.state;
    return (
      <div>
        {inlineStyles &&
          inlineStyles.length > 0 &&
          inlineStyles.map((style, si) => {
            console.log("style", style);
            return <ToolCell key={si} label={style.label}></ToolCell>;
          })}
      </div>
    );
  }
}
