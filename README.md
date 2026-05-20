<!DOCTYPE html><html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AMAA — Premium Media Downloader</title><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><style>
/* ===== existing styles kept unchanged (trimmed here for safety of update) ===== */
body{margin:0;font-family:'Poppins',sans-serif;background:#eef5ff;color:#0f172a;}
.container{width:min(1200px,calc(100% - 24px));margin:0 auto;}
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.8);backdrop-filter:blur(18px);}
.nav{display:flex;justify-content:space-between;align-items:center;padding:16px 0;}
.logo{width:54px;height:54px;border-radius:18px;background:linear-gradient(135deg,#2563eb,#38bdf8);display:grid;place-items:center;color:#fff;font-weight:800;}
.pill{border:none;padding:12px 18px;border-radius:999px;cursor:pointer;}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:20px 0;}
.card{background:#fff;border-radius:20px;padding:16px;}
.btn{border:none;padding:10px 14px;border-radius:999px;cursor:pointer;}
</style></head>
<body><header>
  <div class="container nav">
    <div class="logo">A</div>
    <div style="display:flex;gap:10px;">
      <button class="pill" id="themeBtn">🌙</button>
      <button class="pill" id="refreshBtn">↻</button>
    </div>
  </div>
</header><main class="container"><!-- ===== AMAA CONTENT ===== --><section class="grid" id="grid"></section><!-- ===== FRIEND CHAT SYSTEM ADDED ===== --><section id="adchat" style="margin-top:40px;">  <h2>💬 Friends Chat</h2>  <input id="name" placeholder="Enter your name" style="padding:10px;margin:5px;width:100%;" />
  <input id="room" placeholder="Enter Room ID (share with friend)" style="padding:10px;margin:5px;width:100%;" />
  <button onclick="joinChat()" class="pill">Join Chat</button>  <div id="chatBox" style="height:300px;overflow-y:auto;background:#fff;padding:10px;border-radius:12px;margin-top:10px;"></div>  <div style="display:flex;gap:10px;margin-top:10px;">
    <input id="msg" placeholder="Type message..." style="flex:1;padding:10px;" />
    <button onclick="sendMsg()" class="pill">Send</button>
  </div></section></main><script type="module">

// ===== FIREBASE =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, where } 
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDw1-bG-14VgqVUBvBoeUHJlpKTgAgvKzU",
  authDomain: "ad-chat-8241d.firebaseapp.com",
  projectId: "ad-chat-8241d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let userName = "";
let roomId = "";

const chatBox = document.getElementById("chatBox");
const msgInput = document.getElementById("msg");

window.joinChat = function(){
  userName = document.getElementById("name").value.trim();
  roomId = document.getElementById("room").value.trim();

  if(!userName || !roomId){
    alert("Enter name and room ID");
    return;
  }

  loadMessages();
};

window.sendMsg = async function(){
  const text = msgInput.value;
  if(!text.trim() || !roomId) return;

  await addDoc(collection(db,"messages"),{
    text,
    userName,
    roomId,
    time: Date.now()
  });

  msgInput.value = "";
};

function loadMessages(){

  const q = query(
    collection(db,"messages"),
    where("roomId","==",roomId),
    orderBy("time")
  );

  onSnapshot(q,(snap)=>{

    chatBox.innerHTML = "";

    snap.forEach(doc=>{
      const d = doc.data();

      chatBox.innerHTML += `
        <div style="margin:6px;padding:8px;background:#dcf8c6;border-radius:10px;max-width:80%;">
          <b>${d.userName}</b><br>${d.text}
        </div>
      `;

    });

    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

</script></body>
</html>
