import React, { Fragment } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  getDefaultKeyBinding,
  convertToRaw
} from "draft-js";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import _ from "lodash";

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

// ADD IMAGE //
function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }

  return null;
}

const Image = props => {
  return <img {...props} />;
};

const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src, style } = entity.getData();
  const type = entity.getType();

  let media,
    Type = _.upperCase(type);

  switch (Type) {
    case "IMAGE":
      media = <Image style={style} src={src} />;
      break;
    case "AUDIO":
      media = <Audio src={src} />;
      break;
    case "VIDEO":
      media = <Video src={src} />;
      break;
    default:
      <span></span>;
      break;
  }

  return media;
};

export default class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),

      // ADD IMAGE //
      showURLInput: false,
      url: "",
      urlType: ""
    };
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

    // ADD IMAGE //
    this.onURLChange = e => this.setState({ urlValue: e.target.value });
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(draftToHtml(convertToRaw(content)));
    };
    this.addImage = this._addImage.bind(this);
    this.confirmMedia = this._confirmMedia.bind(this);
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
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

    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    // ADD IMAGE //
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div>
          <input
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>Confirm</button>
        </div>
      );
    }

    return (
      <Fragment>
        <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
          Add Image
        </button>
        {urlInput}
        <Toolbar
          editorState={editorState}
          inlineStyles={INLINE_STYLES}
          onInlineToggle={this.toggleInlineStyle}
          blockStyles={BLOCK_TYPES}
          onBlockToggle={this.toggleBlockType}
        />
        <div className="ml-3 mr-3 p-2" style={{ border: `1px solid #333` }}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
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
        <input onClick={this.logState} type="button" value="Log State" />
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
    this.setState({ editorState }, () => {
      console.log(
        "content: ",
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      console.log(
        "convertToRaw",
        convertToRaw(editorState.getCurrentContent())
      );
    });
  };

  //////// ADD IMAGE /////////////
  _promptForMedia(type) {
    this.setState(
      {
        showURLInput: true,
        urlValue: "",
        urlType: type
      },
      () => {
        setTimeout(() => this.refs.url.focus(), 0);
      }
    );
  }

  _addImage() {
    this._promptForMedia("image");
  }

  _confirmMedia(e) {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;
    console.log("urlType", urlType);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      _.upperCase(urlType),
      "IMMUTABLE",
      { src: urlValue, style: { width: 100 } }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    console.log("entityKey", entityKey);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });

    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        ),
        showURLInput: false,
        urlValue: ""
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e);
    }
  }
}
