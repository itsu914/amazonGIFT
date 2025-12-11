// パスワード
const PASSWORD = "20110914";

// ロード時
window.onload = function () {
    const pass = prompt("パスワードを入力してください");
    if (pass !== PASSWORD) {
        alert("パスワードが違います");
        location.reload();
        return;
    }

    loadGiftCodes();
};

// ギフトコード保存
function saveGiftCode() {
    const amount = document.getElementById("amount").value;
    const expire = document.getElementById("expire").value;
    const code = document.getElementById("code").value;

    if (!amount || !expire || !code) {
        alert("すべて入力してください");
        return;
    }

    const giftData = JSON.parse(localStorage.getItem("giftCodes") || "[]");

    giftData.push({
        amount: amount,
        expire: expire,
        code: code
    });

    localStorage.setItem("giftCodes", JSON.stringify(giftData));

    document.getElementById("amount").value = "";
    document.getElementById("expire").value = "";
    document.getElementById("code").value = "";

    loadGiftCodes();
}

// ギフトコード読み込み
function loadGiftCodes() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const giftData = JSON.parse(localStorage.getItem("giftCodes") || "[]");

    giftData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gift-item";

        div.innerHTML = `
            <p>金額：${item.amount}</p>
            <p>有効期限：${item.expire}</p>
            <p>コード：<span class="gift-code">${item.code}</span></p>
            <button onclick="deleteGiftCode(${index})">削除</button>
        `;

        list.appendChild(div);
    });
}

// 削除
function deleteGiftCode(index) {
    if (!confirm("本当に削除しますか？")) return;

    const giftData = JSON.parse(localStorage.getItem("giftCodes") || "[]");
    giftData.splice(index, 1);
    localStorage.setItem("giftCodes", JSON.stringify(giftData));
    loadGiftCodes();
}

// ---- ▼ iPhone対応：タップでコピー & バイブ ▼ ----
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("gift-code")) {

        const codeText = e.target.textContent.trim();

        try {
            await navigator.clipboard.writeText(codeText);

            // 振動 (iPhone対応)
            if ("vibrate" in navigator) {
                navigator.vibrate(100);
            }

            alert("コピーしました： " + codeText);
        } catch (err) {
            alert("コピーに失敗しました");
        }
    }
});
