import { stopwatch } from './stopwatch'
import './style.css'
import { timer } from './timer';
// import { test } from './test.ts'
// test();

stopwatch();
timer();

// ストップウォッチ、タイマー、アラームの切り替え
const $panels = document.querySelectorAll<HTMLDivElement>('#stopwatch, #timer, #alarm');
const $changeModeBtn = document.querySelectorAll<HTMLButtonElement>('.change-btn');

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