document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value;
  const mode = document.querySelector("input[name='mode']:checked").value;

  const output = document.getElementById("outputArea");
  output.textContent = "提案を生成中...";

  // 本番では: アップロード画像もAPIに送る
  // 例：
  // const imageFile = document.getElementById("imageInput").files[0];

  /*
     ここにAI APIリクエストを書く
     const response = await fetch("/api/generate", { ... })
     const result = await response.json();
     output.textContent = result.text;
  */

  // 今は仮のレスポンス（デモ用）
  const mockResult = generateMockResponse(prompt, mode);
  output.textContent = mockResult;
});


// 仮のAI出力（デモ）
// 本番では削除する
function generateMockResponse(prompt, mode) {

  const baseIntro = `入力：「${prompt}」\nモード：${mode}\n\n---\n整理整頓の提案：\n`;

  if (mode === "cheap") {
    return baseIntro +
      "● 100均ワイヤーバスケット\n" +
      "購入：ダイソー / セリア\n" +
      "価格：110円\n" +
      "サイズ：30×20×15cm\n" +
      "用途：散らばる小物をまとめて収納\n\n" +
      "● ダンボール整理ボックス（自作）\n" +
      "購入：不要ダンボール\n" +
      "価格：0円\n" +
      "用途：引き出し内の仕切りに最適\n";
  }

  if (mode === "easy") {
    return baseIntro +
      "● 無印良品 ポリプロピレン小物整理トレー\n" +
      "価格：190円\n" +
      "購入：無印良品\n" +
      "特徴：置くだけで整う3ステップ収納\n\n" +
      "● ニトリ 仕切りスタンド\n" +
      "価格：399円\n" +
      "用途：本・書類を分けて倒れ防止\n";
  }

  if (mode === "beauty") {
    return baseIntro +
      "● 山崎実業 タワー デスクマット\n" +
      "購入：Amazon\n" +
      "価格：2,000〜3,000円\n" +
      "サイズ：80×40cm\n" +
      "用途：色を統一し、視覚情報を減らす\n\n" +
      "● IKEA SIGNUM ケーブルトレー\n" +
      "価格：1,499円\n" +
      "用途：ケーブルをすべてデスク下に隠す\n\n" +
      "● 無印良品 引き出しケース\n" +
      "価格：1,290円〜\n" +
      "特徴：白・黒で統一すれば美しさUP\n";
  }

  return "エラー：モードが不明です。";
}
