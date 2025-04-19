document.addEventListener('DOMContentLoaded', () => {
  // 要素の取得
  const diceCountInput = document.getElementById('dice-count');
  const diceSidesInput = document.getElementById('dice-sides');
  const rollButton = document.getElementById('roll-button');
  const diceResultsElement = document.getElementById('dice-results');
  const diceSumElement = document.getElementById('dice-sum');
  const diceHistoryElement = document.getElementById('dice-history');
  
  // サイコロを振った結果の履歴
  const rollHistory = [];
  
  // サイコロを振るボタンのイベントリスナー
  rollButton.addEventListener('click', () => {
    // 入力値の取得
    const count = parseInt(diceCountInput.value);
    const sides = parseInt(diceSidesInput.value);
    
    // 入力値の検証
    if (isNaN(count) || count < 1 || count > 20) {
      alert('サイコロの数は1〜20の範囲で入力してください');
      return;
    }
    
    if (isNaN(sides) || sides < 2 || sides > 100) {
      alert('サイコロの面数は2〜100の範囲で入力してください');
      return;
    }
    
    // サイコロを振る
    const result = DiceRoller.rollSum(count, sides);
    
    // 結果を表示
    displayResults(count, sides, result);
    
    // 履歴に追加
    addToHistory(count, sides, result);
  });
  
  // 結果表示関数
  function displayResults(count, sides, result) {
    // 個々のサイコロの結果を表示
    diceResultsElement.innerHTML = `
      <div class="dice-roll">
        <div class="dice-notation">${count}d${sides}:</div>
        <div class="dice-values">[${result.rolls.join(', ')}]</div>
      </div>
    `;
    
    // 合計を表示
    diceSumElement.textContent = `合計: ${result.sum}`;
  }
  
  // 履歴に追加する関数
  function addToHistory(count, sides, result) {
    // 履歴項目を作成
    const historyItem = {
      notation: `${count}d${sides}`,
      rolls: result.rolls,
      sum: result.sum,
      timestamp: new Date()
    };
    
    // 履歴に追加（最大10項目まで）
    rollHistory.unshift(historyItem);
    if (rollHistory.length > 10) {
      rollHistory.pop();
    }
    
    // 履歴表示を更新
    updateHistoryDisplay();
  }
  
  // 履歴表示を更新する関数
  function updateHistoryDisplay() {
    diceHistoryElement.innerHTML = '';
    
    rollHistory.forEach((item, index) => {
      const historyItemElement = document.createElement('div');
      historyItemElement.className = 'history-item';
      
      const time = item.timestamp.toLocaleTimeString();
      
      historyItemElement.innerHTML = `
        <div class="history-time">${time}</div>
        <div class="history-roll">
          <span class="history-notation">${item.notation}:</span>
          <span class="history-values">[${item.rolls.join(', ')}]</span>
          <span class="history-sum">= ${item.sum}</span>
        </div>
      `;
      
      diceHistoryElement.appendChild(historyItemElement);
    });
  }
  
  // 実際にサイコロをロールする関数（サーバー側の関数がある場合に置き換える）
  function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }
});
