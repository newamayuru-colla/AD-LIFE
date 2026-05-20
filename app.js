let currentUser = "";
let currentChat = "";

function loginUser() {
  currentUser = document.getElementById("nameInput").value;
  if (!currentUser) return;

  loadUsers();
}

function getChatId(u1, u2) {
  return [u1, u2].sort().join("_");
}

function openChat(user) {
  currentChat = getChatId(currentUser, user);
  document.getElementById("header").innerText = "Chat with " + user;

  listenMessages();
}

/* SEND MESSAGE */
function sendMsg() {
  const text = document.getElementById("msgInput").value;
  if (!text || !currentChat) return;

  fb.addDoc(
    fb.collection(db, "chats", currentChat, "messages"),
    {
      text,
      sender: currentUser,
      time: Date.now()
    }
  );

  document.getElementById("msgInput").value = "";
}

/* LOAD MESSAGES */
function listenMessages() {
  const q = fb.query(
    fb.collection(db, "chats", currentChat, "messages"),
    fb.orderBy("time")
  );

  fb.onSnapshot(q, (snap) => {
    const box = document.getElementById("messages");
    box.innerHTML = "";

    snap.forEach(doc => {
      const d = doc.data();

      const div = document.createElement("div");
      div.className = "msg " + (d.sender === currentUser ? "me" : "them");
      div.innerText = d.sender + ": " + d.text;

      box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
  });
}

/* DEMO USERS */
function loadUsers() {
  const users = ["Alex", "John", "Sara", "Mike"];

  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(u => {
    if (u === currentUser) return;

    const btn = document.createElement("button");
    btn.innerText = "Chat " + u;
    btn.onclick = () => openChat(u);

    list.appendChild(btn);
  });
}
