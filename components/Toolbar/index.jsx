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
    return (
      <div className="p-3">
        <ToolBarInline onToggle={onInlineToggle} inlineStyles={inlineStyles} />
        <ToolBarBlock onToggle={onBlockToggle} blockStyles={blockStyles} />
      </div>
    );
  }
}
