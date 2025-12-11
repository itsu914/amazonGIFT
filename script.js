const PASSWORD = "20110914";

// パスワード開くボタン
document.getElementById("passwordButton").addEventListener("click", () => {
    const input = document.getElementById("passwordField").value;
    const err = document.getElementById("passwordError");

    if (input === PASSWORD) {
        document.getElementById("passwordScreen").classList.add("hidden");
        document.getElementById("mainScreen").classList.remove("hidden");
        loadList();
    } else {
        err.textContent = "パスワードが違います";
    }
});

// 追加フォーム開閉
document.getElementById("addButton").addEventListener("click", () => {
    document.getElementById("formArea").classList.toggle("hidden");
});

// 保存
document.getElementById("saveButton").addEventListener("click", () => {
    const amount = document.getElementById("amount").value;
    const expire = document.getElementById("expire").value;
    const code = document.getElementById("giftCode").value;

    if (!amount || !expire || !code) {
        alert("全て入力してください");
        return;
    }

    const data = JSON.parse(localStorage.getItem("giftList") || "[]");
    data.push({ amount, expire, code });
    localStorage.setItem("giftList", JSON.stringify(data));

    document.getElementById("amount").value = "";
    document.getElementById("expire").value = "";
    document.getElementById("giftCode").value = "";

    loadList();
});

// 開く
document.getElementById("openButton").addEventListener("click", loadList);

// 一覧表示
function loadList() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    const data = JSON.parse(localStorage.getItem("giftList") || "[]");

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <p>金額: ${item.amount} 円</p>
            <p>期限: ${item.expire}</p>
            <p>コード: <span class="gift-code" data-code="${item.code}">${item.code}</span></p>
            <button onclick="deleteItem(${index})">削除</button>
        `;
        list.appendChild(div);
    });
}

// 削除
function deleteItem(i) {
    if (!confirm("本当に削除しますか？")) return;
    const data = JSON.parse(localStorage.getItem("giftList") || "[]");
    data.splice(i, 1);
    localStorage.setItem("giftList", JSON.stringify(data));
    loadList();
}

// コピー対応
document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("gift-code")) {
        const code = e.target.dataset.code;
        try {
            await navigator.clipboard.writeText(code);
            if ("vibrate" in navigator) navigator.vibrate(100);
            alert("コピーしました: " + code);
        } catch {
            alert("コピーできませんでした");
        }
    }
});
document.getElementById("passwordButton").addEventListener("click", () => {
    const input = document.getElementById("passwordField").value;
    const err = document.getElementById("passwordError");

    if (input === PASSWORD) {
        document.getElementById("passwordScreen").classList.add("hidden");
        document.getElementById("mainScreen").classList.remove("hidden");
        loadList();
    } else {
        err.textContent = "パスワードが違います";
    }
});
