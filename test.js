// テストコード用スクリプト
console.log('サイコロシミュレーターのテスト開始');

// DiceRollerクラスが正しく動作するかテスト
function runTests() {
  try {
    // 単一のサイコロをテスト
    const singleDiceResult = DiceRoller.rollDice(6);
    console.log(`1d6の結果: ${singleDiceResult}`);
    if (singleDiceResult < 1 || singleDiceResult > 6) {
      console.error('エラー: 結果が範囲外です');
    } else {
      console.log('成功: 単一サイコロのテスト');
    }
    
    // 複数のサイコロをテスト
    const multipleResults = DiceRoller.rollMultiple(3, 6);
    console.log(`3d6の結果: [${multipleResults.join(', ')}]`);
    if (multipleResults.length !== 3) {
      console.error(`エラー: 期待した数のサイコロ結果ではありません (${multipleResults.length} != 3)`);
    } else if (multipleResults.some(result => result < 1 || result > 6)) {
      console.error('エラー: 結果に範囲外の値があります');
    } else {
      console.log('成功: 複数サイコロのテスト');
    }
    
    // サイコロの合計をテスト
    const sumResult = DiceRoller.rollSum(3, 6);
    console.log(`3d6の結果: [${sumResult.rolls.join(', ')}], 合計: ${sumResult.sum}`);
    const expectedSum = sumResult.rolls.reduce((total, roll) => total + roll, 0);
    if (sumResult.sum !== expectedSum) {
      console.error(`エラー: 合計値が正しくありません (${sumResult.sum} != ${expectedSum})`);
    } else {
      console.log('成功: 合計値のテスト');
    }
    
    // 分布テスト - 1000回振って平均値をチェック
    const trials = 1000;
    let total = 0;
    for (let i = 0; i < trials; i++) {
      total += DiceRoller.rollDice(6);
    }
    const average = total / trials;
    console.log(`1d6を${trials}回振った平均: ${average.toFixed(2)}`);
    // 理論上の平均は3.5
    if (average < 3.0 || average > 4.0) {
      console.warn(`警告: 平均値が期待範囲外です (${average.toFixed(2)})`);
    } else {
      console.log('成功: 分布テスト');
    }
    
    console.log('すべてのテストが完了しました');
  } catch (error) {
    console.error('テスト実行中にエラーが発生しました:', error);
  }
}

// ブラウザ環境とNode.js環境の両方でテストを実行できるようにする
if (typeof window !== 'undefined') {
  window.runDiceTests = runTests;
  console.log('ブラウザのコンソールから runDiceTests() を実行してテストを開始できます');
} else if (typeof require !== 'undefined') {
  // Node.js環境の場合
  const DiceRoller = require('./dice.js');
  runTests();
}
