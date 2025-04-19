/**
 * サーバーサイドのサイコロAPIと通信するためのクライアントモジュール
 */
class DiceRollerApiClient {
  /**
   * コンストラクタ
   * @param {string} apiUrl - APIのベースURL
   */
  constructor(apiUrl = '/api/dice') {
    this.apiUrl = apiUrl;
  }
  
  /**
   * サーバーサイドでサイコロを振る
   * @param {number} sides - サイコロの面数
   * @returns {Promise<number>} サイコロの結果
   */
  async rollDice(sides) {
    try {
      const response = await fetch(`${this.apiUrl}/roll?sides=${sides}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('サイコロを振る際にエラーが発生しました:', error);
      // APIが利用できない場合はクライアントサイドで計算
      return Math.floor(Math.random() * sides) + 1;
    }
  }
  
  /**
   * 複数のサイコロを振る
   * @param {number} count - サイコロの数
   * @param {number} sides - サイコロの面数
   * @returns {Promise<Array>} 各サイコロの結果
   */
  async rollMultiple(count, sides) {
    try {
      const response = await fetch(`${this.apiUrl}/roll-multiple?count=${count}&sides=${sides}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('複数のサイコロを振る際にエラーが発生しました:', error);
      // APIが利用できない場合はクライアントサイドで計算
      const results = [];
      for (let i = 0; i < count; i++) {
        results.push(Math.floor(Math.random() * sides) + 1);
      }
      return results;
    }
  }
  
  /**
   * サイコロの履歴を保存する
   * @param {Object} rollData - サイコロの結果データ
   * @returns {Promise<boolean>} 保存に成功したかどうか
   */
  async saveRollHistory(rollData) {
    try {
      const response = await fetch(`${this.apiUrl}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rollData)
      });
      return response.ok;
    } catch (error) {
      console.error('履歴の保存に失敗しました:', error);
      return false;
    }
  }
  
  /**
   * サイコロの履歴を取得する
   * @param {number} limit - 取得する履歴の数
   * @returns {Promise<Array>} 履歴のリスト
   */
  async getRollHistory(limit = 10) {
    try {
      const response = await fetch(`${this.apiUrl}/history?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return data.history;
    } catch (error) {
      console.error('履歴の取得に失敗しました:', error);
      return [];
    }
  }
}

// Node.jsとブラウザ環境の両方で動作するようにエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DiceRollerApiClient;
} else if (typeof window !== 'undefined') {
  window.DiceRollerApiClient = DiceRollerApiClient;
}
