// =============================
// パスワード（好きに変更してOK）
// =============================
const PASSWORD = "20110914";

// ----------------------
// パスワード解除
// ----------------------
function unlock() {
    const input = document.getElementById("passwordInput").value;
    if (input === PASSWORD) {
        document.getElementById("lockScreen").classList.add("hidden");
        document.getElementById("main").classList.remove("hidden");
        loadCodes();
    } else {
        document.getElementById("errorMsg").innerText = "パスワードが違います";
    }
}

// ----------------------
// フォーム開閉
// ----------------------
function openForm() {
    document.getElementById("form").classList.remove("hidden");
}

function closeForm() {
    document.getElementById("form").classList.add("hidden");
}

// ----------------------
// ギフトコード追加
// ----------------------
function addCode() {
    const amount = document.getElementById("amount").value.trim();
    const code = document.getElementById("code").value.trim();
    const date = document.getElementById("date").value;

    if (!amount || !code || !date) {
        alert("すべて入力してください！");
        return;
    }

    const data = JSON.parse(localStorage.getItem("codes") || "[]");

    data.push({ amount, code, date });

    localStorage.setItem("codes", JSON.stringify(data));

    document.getElementById("amount").value = "";
    document.getElementById("code").value = "";
    document.getElementById("date").value = "";

    closeForm();
    loadCodes();
}

// ----------------------
// 読み込み
// ----------------------
function loadCodes() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("codes") || "[]");

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "code-item";

        div.innerHTML = `
            <strong>金額:</strong> ${item.amount} 円<br>
            <strong>コード:</strong> ${item.code}<br>
            <strong>有効期限:</strong> ${item.date}<br><br>
            <button onclick="deleteCode(${index})">削除</button>
        `;

        list.appendChild(div);
    });
}

// ----------------------
// 削除
// ----------------------
function deleteCode(index) {
    if (!confirm("本当に削除しますか？")) return;

    const data = JSON.parse(localStorage.getItem("codes") || "[]");
    data.splice(index, 1);
    localStorage.setItem("codes", JSON.stringify(data));
    loadCodes();
}
