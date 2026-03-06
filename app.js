document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value;
  const mode = document.querySelector("input[name='mode']:checked").value;

  const analysisCard = document.getElementById("analysisCard");
  const proposalCard = document.getElementById("proposalCard");
  const imageCard = document.getElementById("imageCard");

  analysisCard.classList.add("hidden");
  proposalCard.classList.add("hidden");
  imageCard.classList.add("hidden");

  analysisCard.textContent = "解析中…";
  proposalCard.textContent = "";
  analysisCard.classList.remove("hidden");

  // 画像（Base64化）
  const imageFile = document.getElementById("imageInput").files[0];
  let base64Image = null;

  if (imageFile) base64Image = await toBase64(imageFile);

  // ====== 疑似AI：カテゴリ判定 ======
  const category = detectCategory(prompt, base64Image);
  const summary = mockSummary(category);
  analysisCard.innerHTML = `
    <h3>状況解析結果（疑似AI）</h3>
    <p>カテゴリ：<strong>${category}</strong></p>
    <p>${summary}</p>
  `;

  // ====== 疑似AI：片付け方法・収納術提案 ======
  proposalCard.classList.remove("hidden");
  const suggestion = generateSuggestion(prompt, mode, category);
  proposalCard.innerHTML = `
    <h3>AI提案（疑似）</h3>
    ${suggestion}
  `;

  // ====== 疑似AI：Before / After 画像 ======
  const before = getBeforeImage(category);
  const after = getAfterImage(category);

  imageCard.classList.remove("hidden");
  document.getElementById("beforeImage").src = before;
  document.getElementById("afterImage").src = after;
});


// --------------------------------------------------
// 疑似AI：カテゴリ判定
// --------------------------------------------------
function detectCategory(prompt, image) {
  const p = prompt;

  if (/キッチン|台所|料理/.test(p)) return "キッチン";
  if (/デスク|机|パソコン/.test(p)) return "デスク";
  if (/服|クローゼット|衣類/.test(p)) return "クローゼット";
  if (/洗面|タオル|洗濯/.test(p)) return "洗面所";

  return "リビング";
}

function mockSummary(cat) {
  return `${cat}の片付けが必要と判断しました。散らかり要因を整理し、美しく整える方法を提案します。`;
}

// --------------------------------------------------
// 疑似AI：収納術 & 商品提案
// --------------------------------------------------
function generateSuggestion(prompt, mode, category) {
  return `
● Before → After イメージ  
Before：${category}が散乱している状態  
After：用途ごとに分けられ、統一感のある美しい空間に変化  

● 3ステップ片付け方法  
1. 物を「使う・使わない」で分類  
2. カテゴリ別にまとめる  
3. 色を揃えて収納し、視覚のノイズを減らす  

● ${category}の収納術  
・縦に立てる  
・ボックスで隠す  
・色を白/黒/木目で統一  

● おすすめ商品  
・無印良品 ポリプロピレン収納  
・ニトリ 収納ボックス  
・山崎実業 tower シリーズ  

（本物のAIに接続すると、ここがリアルな商品名・価格付きになります）
`;
}

// --------------------------------------------------
// 疑似AI画像：カテゴリごとに固定の写真
// --------------------------------------------------
function getBeforeImage(category) {
  const map = {
    "キッチン": "https://picsum.photos/seed/kitchenbefore/400/300",
    "デスク": "https://picsum.photos/seed/deskbefore/400/300",
    "クローゼット": "https://picsum.photos/seed/closetbefore/400/300",
    "洗面所": "https://picsum.photos/seed/washbefore/400/300",
    "リビング": "https://picsum.photos/seed/livingbefore/400/300",
  };
  return map[category];
}

function getAfterImage(category) {
  const map = {
    "キッチン": "https://picsum.photos/seed/kitchenafter/400/300",
    "デスク": "https://picsum.photos/seed/deskafter/400/300",
    "クローゼット": "https://picsum.photos/seed/closetafter/400/300",
    "洗面所": "https://picsum.photos/seed/washafter/400/300",
    "リビング": "https://picsum.photos/seed/livingafter/400/300",
  };
  return map[category];
}

// --------------------------------------------------
function toBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
