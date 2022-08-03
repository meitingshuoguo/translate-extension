import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.css";

export default function Content() {
  const [btnTxt, setBtnTxt] = useState("");
  const [btnClassName, setBtnClassName] = useState("");
  const [selectedTxt, setSelectedTxt] = useState("");
  const btnEle = useRef(null);

  const deleteBtn = () => {
    // 隐藏原来的按钮
    if (btnEle) {
      setBtnTxt("");
    }
  };

  const selectArea = (e) => {
    let text = "",
      selection = window.getSelection();
    if (selection) {
      // 获取选中文字,
      text = selection.toString().trim();
      if (text && btnEle) {
        const { current: ele } = btnEle;
        const { left, top } = selection.getRangeAt(0).getBoundingClientRect();
        ele.style.left = left + "px";
        ele.style.top = top + "px";
        setBtnTxt("翻译");
        setBtnClassName("translate");
        setSelectedTxt(text);
      }
    }
  };

  const btnOnclick = (e) => {
    e.stopPropagation();
    chrome.runtime.sendMessage(selectedTxt, function (res) {
      if (res) {
        setBtnTxt(res);
        setBtnClassName("result");
      }
    });
  };

  useEffect(() => {
    document.querySelector("body").addEventListener("mouseup", selectArea);
    document.querySelector("body").addEventListener("dblclick", selectArea);
    document.querySelector("body").addEventListener("mousedown", function () {
      deleteBtn();
    });
  }, []);

  return (
    <>
      <button
        className={`${style.default} ${style[btnClassName]}`}
        hidden={btnTxt === ""}
        ref={btnEle}
        onClick={btnOnclick}
      >
        {btnTxt}
      </button>
    </>
  );
}
