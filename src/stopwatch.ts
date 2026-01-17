// # 設計
// 1. ディスプレイ
// 2. スタート/ストップボタン
// 3. リセット/ラップボタン
// 4. ラップ用のディスプレイ
// を用意

//要素の取得

export function stopwatch() {
  const $display = document.querySelector<HTMLDivElement>("#display")!;
  const $startStopBtn =
    document.querySelector<HTMLButtonElement>("#startStopBtn")!;
  const $lapResetBtn =
    document.querySelector<HTMLButtonElement>("#lapResetBtn")!;
  const $lapDisplay = document.querySelector<HTMLUListElement>("#laps")!;

  //初期値の設定
  let startTime: number = 0; // スタートした瞬間の時刻
  let elapsedTime: number = 0; // 累積経過時間
  let timerId: number | null = null; 
  let isRunning: boolean = false; // 動作状態

  //displayの表示設定の処理
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

  //画面更新の処理
  const interval: number = 10; // 10ミリ秒ごとに更新
  function update(): void {
    if (!isRunning) {
      return; // 動作していない場合は何もしない
    }
    const now = Date.now();
    const diff = now - startTime;
    $display.textContent = format(diff);

    timerId = window.setTimeout(update, interval);
  }

  //スタートストップボタンの設定(setTimeoutを使用)
  $startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
      //isRunningがfalse(初期値を含む)スタートストップボタンがstartの時
      isRunning = true; //isRunningをtrueに変更
      startTime = Date.now() - elapsedTime; // 再開対応
      $startStopBtn.textContent = "Stop"; //スタートストップボタンの表示をStopに変更
      $lapResetBtn.textContent = "Lap";
      //タイマーの処理はここにかく
      timerId = window.setTimeout(update, interval);
    } else {
      //isRunningがtrue スタートストップボタンがstopの時
      isRunning = false; //isRunningをfalseに変更
      elapsedTime = Date.now() - startTime; //累積経過時間を更新
      $startStopBtn.textContent = "Start"; //スタートストップボタンの表示をStartに変更
      $lapResetBtn.textContent = "Reset";
      //タイマーの処理を止める処理はここにかく
      if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
      }
    }
  });

  //ラップリセットボタンの設定
  $lapResetBtn.addEventListener("click", () => {
    if (isRunning) {
      //isRunningがtrue ラップリセットボタンがLapの時
      //ラップ用のディスプレイに現在のディスプレイの時間を記録する処理はここにかく
      const li = document.createElement("li");
      li.textContent = $display.textContent;
      $lapDisplay.appendChild(li);
    } else {
      //isRunningがfalse ラップリセットボタンがResetの時
      //ディスプレイとラップ用のディスプレイを初期化する処理はここにかく
      elapsedTime = 0;
      startTime = 0;
      $display.textContent = format(0);
      $lapDisplay.textContent = "";
    }
  });
}

// ## 各機能
// 1. ディスプレイ
//   - スタートボタンを押した時間と現在時間の差を表示
//     - 差の表示方法:スタートボタンを押した時にその時刻を取得(Date.now使用)
//     - 現在時間を Date.now で取得してその差を表示し続ける
//     - 00:00:00:00 (時間、分、秒、ms)を表示

// 2. スタートストップボタンの機能
//   - スタートが表示されている時は デートナウで押した時間を取得

// 3. ラップ、リセットボタンの機能
//   - スタートストップボタンの表示が スタートの表示の時は 連携リセットを表示 ストップを表示中は ラップを表示
//   - ラップが表示されている時にボタンをクリックするとラップ用のディスプレイに押した時のディスプレイに表示されている時間を記録

// 初期値の設定は スタートボタンはスタート表示 →スタートストップボタンの表示だからラップリセットボタンは自動的にリセット表示になる ディスプレイは00:00:00:00
