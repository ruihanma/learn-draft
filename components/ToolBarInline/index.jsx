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
    const { onToggle, editorState } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    // console.log("currentStyle.inline", currentStyle);
    return (
      <div className="mb-3">
        {inlineStyles &&
          inlineStyles.length > 0 &&
          inlineStyles.map((cell, si) => {
            return (
              <ToolCell
                onToggle={onToggle}
                key={si}
                active={currentStyle.has(cell.style)}
                label={cell.label}
                style={cell.style}
              ></ToolCell>
            );
          })}
      </div>
    );
  }
}
