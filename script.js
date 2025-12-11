// パスワード
const PASSWORD = "20110914";

// ギフトコードデータ
const giftCodes = [
    { code: "ABCD-EFGH-1234" },
    { code: "WXYZ-9999-AAAA" },
    { code: "TEST-1111-CODE" }
];

// ――― パスワード判定 ―――
document.getElementById("open-btn").addEventListener("click", () => {
    const input = document.getElementById("password-input").value;

    if (input === PASSWORD) {
        document.getElementById("password-screen").style.display = "none";
        document.getElementById("code-screen").style.display = "block";
        showCodes();
    } else {
        document.getElementById("pw-error").innerText = "パスワードが違います";
    }
});


// ――― ギフトコード表示 ―――
function showCodes() {
    const list = document.getElementById("code-list");
    list.innerHTML = "";

    giftCodes.forEach(item => {
        const div = document.createElement("div");
        div.className = "gift-box";

        div.innerHTML = `
            <p><b>コード:</b> <span class="code-text">${item.code}</span></p>
            <button class="copy-btn">コピー</button>
        `;

        list.appendChild(div);
    });

    // コピー機能
    document.querySelectorAll(".copy-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const text = giftCodes[index].code;

            navigator.clipboard.writeText(text).then(() => {
                // 成功 → バイブ
                if (navigator.vibrate) navigator.vibrate(100);
                btn.innerText = "コピー済み ✔";
                setTimeout(() => btn.innerText = "コピー", 1500);
            });
        });
    });
}
