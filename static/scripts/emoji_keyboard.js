
function hide_emojis() {  //Hides the emoji that are clicked on the chat screen or on input text
    const div1 = document.getElementById("all-emoji");
    div1.style.display = "none";
}

function copy_To_Clipboard(a) {//Copy the desired emoji to input text
    const input = document.getElementById('text')
    input.value += a;
}

function emoji_keyboard() {
    const url = "api/chats/emojis"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("emojis", JSON.stringify(data));
        })
    const emojis = JSON.parse(localStorage.getItem("emojis"))
    const father_div = document.getElementById('all-emoji')
    const son = document.createElement('div')
    son.classList.add("row");
    father_div.appendChild(son)
    let id_emojis = 0
    const max_for = 221
    for (let i = 0; i < max_for; i++) {
        for (let j = 0; j < 12; j++) {
            const son_row = document.createElement('div')
            son_row.innerHTML = `<div>${emojis[id_emojis].code}</div>`
            son_row.classList.add("emojis");
            son_row.id = `emoji-${id_emojis}`
            
            // שמור את הערך לפני שמוסיפים את האלמנט
            let img = emojis[id_emojis].code
            
            son.appendChild(son_row)
            add_Cell_Click_emoji(`emoji-${id_emojis}`, img) // השתמש בזהות המדויק
            id_emojis++
        }
    }
}
function add_Cell_Click_emoji(divId, number) { //Adds onclick to every emoji
    const div = document.getElementById(divId);
    div.addEventListener("click", function () {
        copy_To_Clipboard(number);
    });
}
