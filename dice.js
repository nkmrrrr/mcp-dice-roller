/**
 * サイコロをシミュレートするクラス
 */
class DiceRoller {
  /**
   * 指定された面数のサイコロを振る
   * @param {number} sides - サイコロの面数
   * @returns {number} 出目の結果
   */
  static rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  /**
   * 複数のサイコロを振る
   * @param {number} count - サイコロの数
   * @param {number} sides - サイコロの面数
   * @returns {Array} 各サイコロの出目
   */
  static rollMultiple(count, sides) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(this.rollDice(sides));
    }
    return results;
  }

  /**
   * 複数のサイコロを振って合計を返す
   * @param {number} count - サイコロの数
   * @param {number} sides - サイコロの面数
   * @returns {Object} 結果と合計
   */
  static rollSum(count, sides) {
    const rolls = this.rollMultiple(count, sides);
    const sum = rolls.reduce((total, roll) => total + roll, 0);
    return {
      rolls,
      sum
    };
  }
}

// Node.jsでの使用のためにエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DiceRoller;
}
