export function test() {
  let startTime: number = 0; // スタートした瞬間の時刻
  let elapsedTime: number = 0; // 累積経過時間
  let timerId: number | null = null; // requestAnimationFrame のID
  let isRunning: boolean = false; // 動作状態

  const display = document.getElementById("display") as HTMLElement;
  const startStopBtn = document.getElementById(
    "startStopBtn"
  ) as HTMLButtonElement;
  const lapResetBtn = document.getElementById(
    "lapResetBtn"
  ) as HTMLButtonElement;
  const laps = document.getElementById("laps") as HTMLUListElement;

  // 時間表示フォーマット
  function format(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mil = Math.floor((ms % 1000) / 10);

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(mil).padStart(2, "0")
    );
  }

  // 画面更新
  function update(): void {
    const now = Date.now();
    const diff = now - startTime;
    display.textContent = format(diff);
    timerId = requestAnimationFrame(update);
  }

  // Start / Stop ボタン
  startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
      // Start
      isRunning = true;
      startTime = Date.now() - elapsedTime; // 再開対応
      startStopBtn.textContent = "Stop";
      lapResetBtn.textContent = "Lap";
      timerId = requestAnimationFrame(update);
    } else {
      // Stop
      isRunning = false;
      elapsedTime = Date.now() - startTime;
      startStopBtn.textContent = "Start";
      lapResetBtn.textContent = "Reset";
      if (timerId !== null) cancelAnimationFrame(timerId);
    }
  });

  // Lap / Reset ボタン
  lapResetBtn.addEventListener("click", () => {
    if (isRunning) {
      //  Lap
      const li = document.createElement("li");
      li.textContent = display.textContent ?? "";
      laps.appendChild(li);
    } else {
      // Reset
      elapsedTime = 0;
      startTime = 0;
      display.textContent = "00:00:00.00";
      laps.innerHTML = "";
    }
  });
}
