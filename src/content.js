const btnId = "xiao-yi-btn";
const deleteBtn = () => {
  // 删除原来的按钮
  const oldBtn = document.getElementById(btnId);
  if (oldBtn) {
    oldBtn.remove();
  }
};
const selectArea = (e) => {
  deleteBtn();
  let text = "",
    selection = window.getSelection(),
    selectionCopy = {};
  if (selection) {
    const { anchorNode } = selection;
    selectionCopy.anchorNode = selection.anchorNode;
    selectionCopy.anchorOffset = selection.anchorOffset;
    selectionCopy.focusNode = selection.focusNode;
    selectionCopy.focusOffset = selection.focusOffset;
    // 获取选中文字,
    text = selection.toString().trim();
    const { parentElement } = anchorNode;
    if (text) {
      const parentElementStyle = window.getComputedStyle(parentElement);
      const fontSiz = parseInt(parentElementStyle.fontSize.replace("px", ""));
      const { left, top } = selection.getRangeAt(0).getBoundingClientRect();
      // 插入翻译按钮
      const spanEle = document.createElement("span");
      spanEle.style.left = left + "px";
      spanEle.style.top = top - (fontSiz + 12) + "px";
      spanEle.setAttribute("id", btnId);
      spanEle.innerText = "翻译";
      parentElement.appendChild(spanEle);
    }
  } else if (document.selection && document.selection.type !== "Control") {
    text = document.selection.createRange().text;
  }
  if (text) {
    const btn = document.getElementById(btnId);
    btn.addEventListener("mousedown", (e) => {
      e.stopPropagation();
    });
    btn.addEventListener("mouseup", (e) => {
      e.stopPropagation();
    });
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const { anchorNode, anchorOffset, focusNode, focusOffset } =
        selectionCopy;
      document
        .getSelection()
        .setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      const { target } = e;
      chrome.runtime.sendMessage(text, function (res) {
        if (res) {
          target.innerText = res;
          target.style.top =
            parseInt(target.style.top.replace("px", "")) - 8 + "px";
          btn.setAttribute("class", "xiao-yi-translate-result");
        }
      });
    });
  }
};

document.querySelector("body").addEventListener("mouseup", selectArea);
document.querySelector("body").addEventListener("dblclick", selectArea);
document.querySelector("body").addEventListener("mousedown", function (e) {
  deleteBtn();
});
