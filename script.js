function main() {
    inp.placeholder = "Enter content";
    inp.classList.remove("error");
    const ele = document.createElement("div");
    let help = document.createElement("p");
    if (inp.value) (help.innerText = inp.value), (inp.value = "");
    else {
        inp.placeholder = "Enter correct data!";
        inp.classList.add("error");
        setTimeout(function () {
            inp.placeholder = "Enter content";
            inp.classList.remove("error");
        }, 2000);
        return;
    }
    ele.appendChild(help);
    help = document.createElement("button");
    help.innerText = "Delete";
    help.addEventListener("click", function () {
        ele.remove();
    });
    ele.appendChild(help);
    help = document.createElement("button");
    help.innerText = "Edytuj";
    help.addEventListener("click", function () {
        document
            .querySelectorAll("article button, label *")
            .forEach(function (el) {
                el.disabled = true;
            });
        prm.style.display = "flex";
        edtInp.focus();

        function handleEdit() {
            edtInp.placeholder = "Enter content";
            edtInp.classList.remove("error");
            if (edtInp.value) {
                ele.querySelector("p").innerText = edtInp.value;
            } else {
                edtInp.placeholder = "Enter correct data!";
                edtInp.classList.add("error");
                setTimeout(function () {
                    edtInp.placeholder = "Enter content";
                    edtInp.classList.remove("error");
                }, 2000);
                return;
            }
            edtInp.value = "";
            prm.style.display = "none";
            document
                .querySelectorAll("article button, label *")
                .forEach(function (el) {
                    el.disabled = false;
                });
            edt.removeEventListener("click", handleEdit);
            edtInp.removeEventListener("keydown", handleEdit);
        }
        edt.addEventListener("click", handleEdit);
        edtInp.addEventListener("keydown", function (e) {
            if (e.key === "Enter") handleEdit();
            else if (e.key === "Escape") handleReject();
        });
        function handleReject() {
            prm.style.display = "none";
            edtInp.value = "";
            edt.removeEventListener("click", handleEdit);
            document
                .querySelectorAll("article button, label *")
                .forEach(function (el) {
                    el.disabled = false;
                });
            rej.removeEventListener("click", handleReject);
        }
        rej.addEventListener("click", handleReject);
        edtInp.removeEventListener("keydown", handleEdit);
    });
    ele.appendChild(help);
    document.querySelector("article").appendChild(ele);
}
btn.addEventListener("click", main);
inp.addEventListener("keydown", function (e) {
    if (e.key === "Enter") main();
    else if (e.key === "Escape") inp.value = "";
});
