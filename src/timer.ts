// 設計

// タイマー機能
// 時間・分・秒の単位でタイマーを設定できる
// タイマーを開始すると、残り時間が表示される
// タイマーを開始すると、一時停止・キャンセルができる
// 一時停止したタイマーは再開できる
// タイマーで設定した時間が経過すると音が鳴る

// 用意する機能は
// ユーザーが登録する時間（何分のタイマーにするかを設定）
// 残り時間を表示するディスプレイ
// 登録した時間をカウントダウンをスタート、一時停止するための　スタート・ストップボタン
// カウントダウンを辞めたい時に使用するキャンセルボタン

// displayに表示する時間は残り時間
// セットインターバルで管理
// バリューで取得した時間をセットインターバルで１秒毎デクリメントでカウントダウン

// スタートストップボタンは
// カウントダウン前はスタート表示
// カウントダウンしている時はストップ表示に変更
// アドイベントリスナーでクリックを押された時
// if文でカウントダウン中とそれ以外で条件分岐

// キャンセルボタンは押したら初期化になるように設定

// カウントダウン終了時に知らせるために
// 終了したかどうかを
// １秒ごとに更新しチェック
// if文で時刻経過を確認させる

export function timer() {
  //要素の取得
  const $display = document.getElementById("display-timer") as HTMLDivElement;

  const $hours = document.getElementById("hours") as HTMLSelectElement;
  const $minutes = document.getElementById("minutes") as HTMLSelectElement;
  const $seconds = document.getElementById("seconds") as HTMLSelectElement;

  const $startStopBtn = document.querySelector("#timer #startStopBtn") as HTMLButtonElement;
  const $cancelBtn = document.getElementById("cancelBtn") as HTMLButtonElement;

  const $alarm = document.getElementById("alarm") as HTMLAudioElement;

  // ===============================
  // タイマー状態管理
  // ===============================
  let remainingSeconds = 0;
  let timerId: number | null = null;
  let isRunning = false;

  // ===============================
  // セレクトボックス初期化
  // ===============================
  function initSelectOptions() {
    for (let i = 0; i <= 99; i++) {
      const op = document.createElement("option");
      op.value = String(i);
      op.textContent = String(i);
      $hours.appendChild(op);
    }

    for (let i = 0; i <= 59; i++) {
      const op1 = document.createElement("option");
      op1.value = String(i);
      op1.textContent = String(i);
      $minutes.appendChild(op1);

      const op2 = document.createElement("option");
      op2.value = String(i);
      op2.textContent = String(i);
      $seconds.appendChild(op2);
    }
  }
  initSelectOptions();

  // ===============================
  // 表示更新
  // ===============================
  function updateDisplay() {
    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");

    $display.textContent = `${hh}:${mm}:${ss}`;
  }

  // ===============================
  // タイマー開始
  // ===============================
  function startTimer() {
    if (isRunning) return;
    if (remainingSeconds <= 0) return;

    isRunning = true;
    $startStopBtn.textContent = "ストップ";

    timerId = window.setInterval(() => {
      remainingSeconds--;
      updateDisplay();

      if (remainingSeconds <= 0) {
        finishTimer();
      }
    }, 1000);
  }

  // ===============================
  // 一時停止
  // ===============================
  function stopTimer() {
    if (!isRunning) return;

    if (timerId !== null) {
      clearInterval(timerId);
    }

    isRunning = false;
    $startStopBtn.textContent = "スタート";
  }

  // ===============================
  // キャンセル（初期化）
  // ===============================
  function cancelTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
    }

    isRunning = false;
    remainingSeconds = 0;
    updateDisplay();
    $startStopBtn.textContent = "スタート";
  }

  // ===============================
  // タイマー終了
  // ===============================
  function finishTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
    }

    isRunning = false;
    remainingSeconds = 0;
    updateDisplay();
    $startStopBtn.textContent = "スタート";

    $alarm.currentTime = 0;
    $alarm.play();
  }

  // ===============================
  // スタート/ストップボタン
  // ===============================
  $startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
      // 初回スタート時は入力値から秒数を作る
      if (remainingSeconds === 0) {
        const h = Number($hours.value);
        const m = Number($minutes.value);
        const s = Number($seconds.value);
        remainingSeconds = h * 3600 + m * 60 + s;
      }
      startTimer();
    } else {
      stopTimer();
    }
  });

  // ===============================
  // キャンセルボタン
  // ===============================
  $cancelBtn.addEventListener("click", cancelTimer);

  // 初期表示
  updateDisplay();
}
