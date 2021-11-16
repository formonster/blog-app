import React, { useState, useEffect } from "react";
import marked from "marked";
import Separate from "@/views/components/Separate";
import UploadContainer from "@/views/container/UploadContainer";
import { isPC } from "@/utils/check";
import { Carousel } from "antd";
// import hljs from "highlight.js";
import Editor from "react-simple-code-editor";
import { css, injectGlobal } from "@emotion/css";
// import ReactMarkdown from "react-markdown";
import classNames from "classnames";
import remarkGfm from "remark-gfm";

const style = css`
  width: 100%;
  height: 100%;
  background-color: #fff;

  & textarea {
    outline-style: none;
  }

  .com-markdown__model {
    padding: 15px;
    position: relative;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    border: 0;
    outline-style: none;
  }
  .com-markdown__view {
    padding: 15px;
    position: relative;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    overflow-x: hidden;
    background-color: #2d2d2d;
  }
`;

const uploadUrl = "/oss/upload";
const OSS_SERVER_HOST = "http://116.255.247.58:5000";

marked.setOptions({
  renderer: new marked.Renderer(),
  // highlight: function (code) {
  //   return hljs.highlightAuto(code).value;
  // },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

let _content = "";

const IS_PC = isPC();

// 获取光标位置
function getCursortPosition(textDom: any) {
  var cursorPos = 0;
  if ((document as any).selection) {
    // IE Support
    textDom.focus();
    var selectRange = (document as any).selection.createRange();
    selectRange.moveStart("character", -textDom.value.length);
    cursorPos = selectRange.text.length;
  } else if (textDom.selectionStart || textDom.selectionStart == "0") {
    // Firefox support
    cursorPos = textDom.selectionStart;
  }
  return cursorPos;
}

type MarkdownProps = {
  className?: string;
  content?: string;
  onChange?: (text: string) => {};
  edit?: boolean;
};

function Markdown({
  className = "",
  content = "",
  onChange,
  edit = false,
}: MarkdownProps) {
  const [textDom, setTextDom] = useState(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [value, setValue] = useState("");
  if (content !== _content && ![null, undefined].includes(content)) {
    setValue(content);
    _content = content;
  }

  useEffect(() => {
    setHtml(marked(value.replace(/\[\[OSS_SERVER_HOST\]\]/g, OSS_SERVER_HOST)));
    onChange(value);
  }, [value]);

  const [html, setHtml] = useState("");

  useEffect(() => {
    // 代码高亮
    // window.Prism.highlightAll();
  }, [html]);

  useEffect(() => {
    const { width, height } = document
      .getElementById("touchContainer")
      .getBoundingClientRect();
    setSize({ width: width + 3, height: height + 3 });
  }, []);

  function onClickHandler(e: React.MouseEvent) {
    setTextDom(e.target);
  }

  function onUploadFinishHandler(res: any) {
    const { response } = res;
    const { name, relativePath } = response.result[0];
    const text = `![${name}]([[OSS_SERVER_HOST]]${relativePath})`;
    const pos = getCursortPosition(textDom);
    setValue(value.slice(0, pos) + text + value.slice(pos));
  }

  return (
    <div
      id="touchContainer"
      className={classNames([style, `com-markdown ${className}`])}
    >
      {edit ? (
        <Separate
          items={[
            <UploadContainer
              action={uploadUrl}
              onUploadFinish={onUploadFinishHandler}
              style={{ height: size.height }}
              className="over-auto"
            >
              {/* <Editor
                value={value}
                onClick={onClickHandler}
                onValueChange={(code) => setValue(code)}
                highlight={(code) => hljs.highlightAuto(code).value}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  minHeight: size.height,
                }}
              /> */}
              {/* <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /> */}
            </UploadContainer>,
            <div
              style={{ height: size.height }}
              className="markdown over-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>,
          ]}
        />
      ) : (
        // ) : (
        //   <Carousel dots={false}>
        //     <div>
        //       <Editor
        //         value={value}
        //         onValueChange={(code) => {
        //           setValue(code);
        //           onChange(code);
        //         }}
        //         highlight={(code) => hljs.highlightAuto(code).value}
        //         padding={10}
        //         style={{
        //           fontFamily: '"Fira code", "Fira Mono", monospace',
        //           fontSize: 12,
        //           minHeight: size.height,
        //         }}
        //       />
        //     </div>
        //     <div>
        //       <div
        //         style={size}
        //         className="markdown over-auto"
        //         dangerouslySetInnerHTML={{ __html: html }}
        //       ></div>
        //     </div>
        //   </Carousel>
        // )
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      )}
    </div>
  );
}

export default Markdown;
