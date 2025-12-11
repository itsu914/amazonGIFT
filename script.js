const PASSWORD = "Itsuki914";

// 画面切り替え
document.getElementById("password-btn").addEventListener("click", () => {
    if (document.getElementById("password-input").value === PASSWORD) {
        document.getElementById("password-screen").classList.add("hidden");
        document.getElementById("main-screen").classList.remove("hidden");
    } else {
        alert("パスワードが違います");
    }
});

// フォーム表示
document.getElementById("add-btn").addEventListener("click", () => {
    document.getElementById("form-area").classList.toggle("hidden");
});

// 保存処理
document.getElementById("save-btn").addEventListener("click", () => {
    const amount = document.getElementById("amount").value;
    const expire = document.getElementById("expire").value;
    const code = document.getElementById("code").value;

    if (!amount || !expire || !code) {
        alert("全て入力してください");
        return;
    }

    const data = JSON.parse(localStorage.getItem("giftlist") || "[]");

    data.push({ amount, expire, code });
    localStorage.setItem("giftlist", JSON.stringify(data));

    alert("保存しました！");
    document.getElementById("form-area").classList.add("hidden");
});

// 開く
document.getElementById("open-btn").addEventListener("click", loadList);

function loadList() {
    const data = JSON.parse(localStorage.getItem("giftlist") || "[]");

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <p>金額: ${item.amount}円</p>
            <p>有効期限: ${item.expire}</p>
            <p>コード: <span class="gift-code" data-code="${item.code}">${item.code}</span></p>
            <button onclick="deleteItem(${index})">削除</button>
        `;

        list.appendChild(div);
    });
}

// 削除
function deleteItem(i) {
    if (!confirm("本当に削除しますか？")) return;

    const data = JSON.parse(localStorage.getItem("giftlist") || "[]");
    data.splice(i, 1);
    localStorage.setItem("giftlist", JSON.stringify(data));
    loadList();
}

// コピー対応（iPhone対応版）
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("gift-code")) {
        const code = e.target.dataset.code;

        try {
            await navigator.clipboard.writeText(code);
            navigator.vibrate(100);
            alert("コピーしました！");
        } catch {
            // iPhone用のフォールバック
            const area = document.createElement("textarea");
            area.value = code;
            document.body.appendChild(area);
            area.select();
            document.execCommand("copy");
            document.body.removeChild(area);

            navigator.vibrate(100);
            alert("コピーしました！");
        }
    }
});
