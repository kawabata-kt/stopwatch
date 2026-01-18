import { stopwatch } from './stopwatch'
import './style.css'
// import { test } from './test.ts'
// test();

stopwatch();

// ストップウォッチ、タイマー、アラームの切り替え
const $panels = document.querySelectorAll<HTMLDivElement>('.panel');
const $changeModeBtn = document.querySelectorAll<HTMLButtonElement>('.change-btn');
const el = document.getElementById("stopwatch");
if (el !== null && el !== undefined) {
  el.classList.remove("panel");
}


$changeModeBtn.forEach(($btn) => {
  $btn.addEventListener('click', () => {
    const targetId = $btn.dataset.target;
    if (!targetId) return;

    $panels.forEach(($panel) => {
      $panel.classList.add("panel");
    });

    const $target = document.getElementById(targetId);
    if ($target) {
      $target.classList.remove("panel");
    }
  });
}); 