import React, { Fragment } from "react";
import { Editor, EditorState } from "draft-js";

import Toolbar from "../Toolbar";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
  { label: "test", style: "STRIKETHROUGH" }
];

export default class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  render() {
    return (
      <Fragment>
        <Toolbar inlineStyles={INLINE_STYLES} />
        <Editor
          placeholder="Please Text Here"
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </Fragment>
    );
  }

  onChange = editorState => {
    this.setState({ editorState });
  };
}
