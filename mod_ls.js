javascript:(function() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    let newValue = prompt(`新しい値を入力してください（キー: ${key}）：`);

    // ユーザが新しい値を入力してOKボタンを押した場合
    if (newValue !== null) {
      // ローカルストレージの値を更新
      localStorage.setItem(key, newValue);
    }
  }
})();
