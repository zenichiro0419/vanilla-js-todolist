import "./styles.css";

const onClickAdd = () => {
  // id="add-text"のinputタグの値を受け取る
  const inputText = document.getElementById("add-text").value;
  // 受け取った後に入力欄を初期化する
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (deleteTarget) => {
  // 更に１つ上の親タグ(ulタグのincomplete-list)からみて子タグ(div)を削除
  document.getElementById("incomplete-list").removeChild(deleteTarget);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // [DOM追加]divタグ生成
  const div = document.createElement("div");
  // divタグ内にclassを追加
  div.className = "list-row";

  // [DOM追加]liタグ生成
  const li = document.createElement("li");
  // liタグにinputTextを挿入
  li.innerText = text;

  // [DOM追加]button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(div)を未完了リストから削除
    const deleteTarget = completeButton.parentNode;
    deleteFromIncompleteList(deleteTarget);

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode;
    // TODO内のテキスト内容取得
    const text = addTarget.firstElementChild.innerText;
    // div以下(liとbutton)を初期化してdivタグだけにする
    addTarget.textContent = null;
    // liタグを生成
    const li = document.createElement("li");
    li.innerText = text;
    // buttonタグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstChild.innerText;
      createIncompleteList(text);
    })

    //divタグ(addTarget)の子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);
    // 完了リストにdivタグ(addTarget)を追加
    document.getElementById("complete-list").appendChild(addTarget);
  })

  // (DOM追加)button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)を取得
    const deleteTarget = deleteButton.parentNode;
    deleteFromIncompleteList(deleteTarget);
  })

  // divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
}

document.getElementById("add-button").addEventListener("click", () => onClickAdd());