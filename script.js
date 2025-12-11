document.addEventListener("DOMContentLoaded", () => {
    loadList();

    document.getElementById("add-button").addEventListener("click", () => {
        const amount = document.getElementById("amount").value;
        const expire = document.getElementById("expire").value;
        const code = document.getElementById("code").value;

        if (!amount || !expire || !code) {
            alert("全て入力してください");
            return;
        }

        const password = prompt("パスワードを入力してください");
        if (password !== "20110914") {
            alert("パスワードが違います");
            return;
        }

        const item = { amount, expire, code };

        let data = JSON.parse(localStorage.getItem("giftList") || "[]");
        data.push(item);
        localStorage.setItem("giftList", JSON.stringify(data));

        loadList();

        document.getElementById("amount").value = "";
        document.getElementById("expire").value = "";
        document.getElementById("code").value = "";
    });
});

function loadList() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("giftList") || "[]");

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gift-box";

        div.innerHTML = `
            <p>金額: ${item.amount} 円</p>
            <p>有効期限: ${item.expire}</p>
            <p class="gift-code">コード: <span class="code-text">${item.code}</span></p>
            <button class="delete" data-index="${index}">削除</button>
        `;

        list.appendChild(div);
    });

    // 🔥 コピー処理（ここが大事）
    document.querySelectorAll(".code-text").forEach(span => {
        span.addEventListener("click", async () => {
            const text = span.innerText;

            try {
                await navigator.clipboard.writeText(text);

                // 📳 iPhone バイブ
                if (navigator.vibrate) navigator.vibrate(50);

                alert("コピーしました: " + text);

            } catch (e) {
                alert("コピーに失敗しました");
            }
        });
    });

    // 削除ボタン
    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            let data = JSON.parse(localStorage.getItem("giftList") || "[]");
            data.splice(index, 1);
            localStorage.setItem("giftList", JSON.stringify(data));
            loadList();
        });
    });
}
