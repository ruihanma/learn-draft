import React from "react";
import { Editor, EditorState } from "draft-js";

import ToolCell from "../ToolCell";

export default class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockStyles: this.props.blockStyles || []
    };
  }

  render() {
    const { blockStyles } = this.state;
    return (
      <div>
        {blockStyles &&
          blockStyles.length > 0 &&
          blockStyles.map((style, si) => {
            return <ToolCell key={si} label={style.label}></ToolCell>;
          })}
      </div>
    );
  }
}
