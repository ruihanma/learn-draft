import React, { Fragment } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import Toolbar from "../Toolbar";
// Style
import "../../styles/main";

// 行内样式组
const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
  { label: "test", style: "STRIKETHROUGH" }
];

// 块类样式组
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

    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  render() {
    const { editorState } = this.state;
    return (
      <Fragment>
        <Toolbar
          editorState={editorState}
          inlineStyles={INLINE_STYLES}
          onInlineToggle={this.toggleInlineStyle}
          blockStyles={BLOCK_TYPES}
          onBlockToggle={this.toggleBlockType}
        />
        <Editor
          placeholder="Please Text Here"
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </Fragment>
    );
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    console.log("inlineStyle", inlineStyle);
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  onChange = editorState => {
    this.setState({ editorState });
  };
}
