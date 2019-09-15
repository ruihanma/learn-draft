import React from "react";
import { Editor, EditorState } from "draft-js";

import ToolBarInline from "../ToolBarInline";
import ToolBarBlock from "../ToolBarBlock";

export default class ToolbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { inlineStyles, onInlineToggle } = this.props;
    const { blockStyles, onBlockToggle } = this.props;
    const { editorState } = this.props;
    return (
      <div className="p-3">
        <ToolBarInline
          editorState={editorState}
          onToggle={onInlineToggle}
          inlineStyles={inlineStyles}
        />
        <ToolBarBlock
          editorState={editorState}
          onToggle={onBlockToggle}
          blockStyles={blockStyles}
        />
      </div>
    );
  }
}
