import React, { Fragment } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  getDefaultKeyBinding
} from "draft-js";

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

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

export default class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
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
        <div className="ml-3 mr-3 p-2" style={{ border: `1px solid #333` }}>
          <Editor
            blockStyleFn={getBlockStyle}
            placeholder="Please Text Here"
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
            customStyleMap={styleMap}
          />
        </div>
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
