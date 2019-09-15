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
    const { onToggle } = this.props;
    return (
      <div>
        {inlineStyles &&
          inlineStyles.length > 0 &&
          inlineStyles.map((cell, si) => {
            return (
              <ToolCell
                onToggle={onToggle}
                key={si}
                label={cell.label}
                style={cell.style}
              ></ToolCell>
            );
          })}
      </div>
    );
  }
}
