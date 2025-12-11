// パスワード
const PASSWORD = "Itsuki914";

// パスワードチェック
document.getElementById("password-btn").addEventListener("click", () => {
    const input = document.getElementById("password-input").value;

    if (input === PASSWORD) {
        document.getElementById("password-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
        loadList();
    } else {
        document.getElementById("pw-error").textContent = "パスワードが違います";
    }
});

// 追加フォーム表示
document.getElementById("add-btn").addEventListener("click", () => {
    document.getElementById("add-form").style.display = "block";
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

    const list = JSON.parse(localStorage.getItem("giftList") || "[]");

    list.push({ amount, expire, code });
    localStorage.setItem("giftList", JSON.stringify(list));

    loadList();
    document.getElementById("add-form").style.display = "none";
});

// 一覧を表示
function loadList() {
    const list = JSON.parse(localStorage.getItem("giftList") || "[]");
    const area = document.getElementById("code-list");
    area.innerHTML = "";

    list.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "gift-item";

        div.innerHTML = `
            <p>金額: ¥${item.amount}</p>
            <p>期限: ${item.expire}</p>
            <p class="gift-code" data-code="${item.code}">コード: ${item.code}</p>
            <button class="del" data-id="${index}">削除</button>
        `;

        area.appendChild(div);
    });

    // コードタップでコピー＋バイブ
    document.querySelectorAll(".gift-code").forEach(el => {
        el.addEventListener("click", () => {
            const code = el.dataset.code;
            navigator.clipboard.writeText(code).then(() => {
                if (navigator.vibrate) navigator.vibrate(100);
                alert("コピーしました: " + code);
            });
        });
    });

    // 削除
    document.querySelectorAll(".del").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;

            if (confirm("本当に削除しますか？")) {
                const list = JSON.parse(localStorage.getItem("giftList") || "[]");
                list.splice(id, 1);
                localStorage.setItem("giftList", JSON.stringify(list));
                loadList();
            }
        });
    });
}
