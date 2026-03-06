document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("promptInput").value;
  const mode = document.querySelector("input[name='mode']:checked").value;

  const analysisCard = document.getElementById("analysisCard");
  const proposalCard = document.getElementById("proposalCard");
  const imageCard = document.getElementById("imageCard");

  analysisCard.classList.add("hidden");
  proposalCard.classList.add("hidden");
  imageCard.classList.add("hidden");

  analysisCard.textContent = "AIが状況を解析中…";
  proposalCard.textContent = "";
  analysisCard.classList.remove("hidden");

  const imageFile = document.getElementById("imageInput").files[0];
  let base64Image = null;

  if (imageFile) base64Image = await toBase64(imageFile);

  try {
    // ----- Step 1：画像＋文章でカテゴリ解析 -----
    const analyzeRes = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        image: base64Image
      })
    });

    const analyzeJson = await analyzeRes.json();
    const detectedCategory = analyzeJson.category;

    analysisCard.innerHTML = `
      <h3>状況解析結果</h3>
      <p>カテゴリ：<strong>${detectedCategory}</strong></p>
      <p>${analyzeJson.summary}</p>
    `;

    // ----- Step 2：片付け方法＋商品提案 -----
    proposalCard.classList.remove("hidden");
    proposalCard.textContent = "提案を生成中…";

    const generateRes = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        mode: mode,
        category: detectedCategory
      })
    });

    const generateJson = await generateRes.json();
    proposalCard.innerHTML = `
      <h3>AI提案</h3>
      ${generateJson.text}
    `;

    // ----- Step 3：Before/After AI画像生成 -----
    imageCard.classList.remove("hidden");

    const beforeAfterRes = await fetch("/api/beforeafter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: detectedCategory,
        prompt: prompt
      })
    });

    const beforeAfterJson = await beforeAfterRes.json();

    document.getElementById("beforeImage").src = beforeAfterJson.before;
    document.getElementById("afterImage").src = beforeAfterJson.after;

  } catch (error) {
    analysisCard.textContent = "エラーが発生しました：" + error;
  }
});

function toBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
