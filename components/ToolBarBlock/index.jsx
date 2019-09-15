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
    const { onToggle, editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    // console.log("blockType", blockType);
    return (
      <div>
        {blockStyles &&
          blockStyles.length > 0 &&
          blockStyles.map((cell, si) => {
            return (
              <ToolCell
                onToggle={onToggle}
                key={si}
                active={cell.style === blockType}
                label={cell.label}
                style={cell.style}
              ></ToolCell>
            );
          })}
      </div>
    );
  }
}
