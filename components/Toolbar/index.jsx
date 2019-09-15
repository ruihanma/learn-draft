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
    return (
      <div>
        <ToolBarInline inlineStyles={this.props.inlineStyles} />
        <ToolBarBlock blockStyles={this.props.blockStyles} />
      </div>
    );
  }
}
