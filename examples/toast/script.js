const button = document.getElementById("button");
button.addEventListener("click", () => {
  const content =
    Math.random() > 0.5
      ? { message: "Success!", cssName: "success" }
      : { message: "Error!", cssName: "error" };
  setupToast(content);
});

const setupToast = ({ message, cssName }) => {
  const toast = createToastElm(message, cssName);
  document.body.appendChild(toast);

  toast.showPopover();

  const timer = setTimeout(() => removeToast(toast), 3000);

  toast.dataset.timer = timer;

  toast.addEventListener("toggle", (event) => {
    alignToast(event.newState === "closed");
  });
};

/**
 * トーストを作成します。
 * @param {string} message 表示するメッセージ
 * @param {string} cssName cssのクラス名
 * @return {HTMLDivElement} 作成したトーストエレメント
 */
const createToastElm = (message, cssName) => {
  const toast = document.createElement("div");
  toast.popover = "manual";
  toast.classList.add("toast", cssName);

  const content = document.createElement("p");
  content.textContent = message;
  content.classList.add("toast-content");
  toast.appendChild(content);

  const closeButton = document.createElement("button");
  closeButton.classList.add("toast-button");
  closeButton.addEventListener("click", () => removeToast(toast));
  toast.appendChild(closeButton);
  return toast;
};

const alignToast = (withMoveAnim) => {
  const toasts = document.querySelectorAll(".toast");

  toasts.forEach((toast, index) => {
    toast.style.transition = withMoveAnim
      ? "translate 0.2s linear, opacity 0.2s linear"
      : "opacity 0.2s linear";
    toast.style.translate = `0px ${(56 + 10) * index}px`;
    toast.style.opacity = 1;
  });
};

/**
 * トーストを削除します。
 * @param {HTMLDivElement} toast 削除したいトースト
 */
const removeToast = (toast) => {
  toast.hidePopover();
  toast.remove();
  clearTimeout(toast.dataset.timer);
};
