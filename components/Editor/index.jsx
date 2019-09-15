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

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
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
        <Toolbar inlineStyles={INLINE_STYLES} blockStyles={BLOCK_TYPES} />
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
