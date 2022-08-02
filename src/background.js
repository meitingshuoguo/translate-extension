chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fetch(
    "https://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=" + request,
    {
      method: "get",
    }
  )
    .then((response) => response.json())
    .then((res) => {
      const { translateResult } = res;
      let result = "";
      if (Array.isArray(translateResult) && translateResult.length) {
        if (translateResult[0].length) {
          result = translateResult[0][0].tgt;
        }
      }
      sendResponse(result);
    });
  return true;
});
