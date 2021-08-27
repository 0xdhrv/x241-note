"use-strict";

const format = (n) => (n > 9 ? n : `0${n}`);
const note = document.getElementById("n");

const key = "x241-note";

let now = new Date();

function SaveAsTxt() {
  const fileName = prompt(
    "save as //",
    `${now.getFullYear()}-${format(now.getMonth())}-${format(now.getDay())}.txt`
  );
  if (fileName === null || fileName === "") return;

  const text = note.value.replace(/\n/g, "\r\n");
  const textToSave = new Blob([text], { type: "text/plain" });
  const download = Object.assign(document.createElement("a"), {
    download: fileName,
    href: window.URL.createObjectURL(textToSave),
    target: "target",
  });

  document.body.appendChild(download);
  download.click();
  document.body.removeChild(download);
}

function ToggleFont() {
  let noteClass = document.getElementById("n").classList;
  if (noteClass.contains("code")) {
    noteClass.remove("code");
  } else {
    noteClass.add("code");
  }
}

function ToggleHelp() {
  let helpClass = document.getElementById("help").classList;
  let noteClass = document.getElementById("n").classList;
  if (helpClass.contains("dn")) {
    helpClass.remove("dn");
    noteClass.add("dn");
  } else {
    helpClass.add("dn");
    noteClass.remove("dn");
  }
}

document.onkeyup = () => localStorage.setItem(key, note.value);

document.onkeydown = function (event) {
  if (event.ctrlKey && event.code === "KeyS") {
    event.preventDefault();
    SaveAsTxt();
  } else if (event.ctrlKey && event.code === "KeyR") {
    event.preventDefault();
    ToggleFont();
  } else if (event.ctrlKey && event.code === "KeyH") {
    event.preventDefault();
    ToggleHelp();
  }
};

note.onkeydown = function (event) {
  if (event.code !== "Tab") return;
  event.preventDefault();

  const start = this.selectionStart;
  const end = this.selectionEnd;
  const {
    target,
    target: { value },
  } = event;

  target.value = `${value.substring(0, start)}\t${value.substring(end)}`;

  this.selectionStart = start + 1;
  this.selectionEnd = this.selectionStart;
};
