showthreads();


let editingPostId = null; // 🔥 GLOBAL
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("Please login again");
  window.location.href = "startpage.htm";
}

if (currentUser.username === "NVI16112@GMAIL.COM") {
  alert("Welcome admin");
  document.getElementById("setting").innerHTML =
    `<button onclick="goToAdmin()">⚙ </button>`;
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "startpage.htm";
}

function goToAdmin() {
  window.location.href = "adminsetting.htm";
}

function Posthread() {
  let inputUser = document.getElementById("userPost").value.trim();
  if (!inputUser) {
    alert("Textbox cannot be empty");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const post = {
    id: Date.now(),
    
    inputUser,

    createdBy: currentUser.username,
    like: 0,
    dislike: 0,
    hShare: 0
  };

  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
   document.getElementById("userPost").value = "";
  showthreads();
}

// function showthreads() {
//   const posts = JSON.parse(localStorage.getItem("posts")) || [];
//   let container = document.getElementById("postthreads");

//   if (!container) {
//     alert("Container not found");
//     return;
//   }

//   container.innerHTML = ""; // clear old threads

//   posts.forEach((t, index) => {
//     container.innerHTML += `
//       <div class="post-box">
//         <p class="question"><strong>Q.</strong> ${t.inputUser}</p>
//         <div class="post-actions">
//           <button onclick="likePost(${t.id})">👍</button> <span>${t.like}</span>
//           <button onclick="dislikePost(${t.id})">👎</button> <span>${t.dislike}</span>
//           <button onclick="hSharePost(${t.id})">🙏</button> <span>${t.hShare}</span>
//           if(${t.username === "NVI16112@GMAIL.COM"} || ${t.createdBy === currentUser.username} ){
//           <button onclick="editPost(${t.id})">Edit</button>
//           <button onclick="deletePost(${t.id})">Delete</button>}
//         </div>
//         <p class="createdBy">Created by: ${t.createdBy}</p>
//       </div>
//     `;
//   });
// }

function showthreads(  postlist = null) {
  const posts = postlist || JSON.parse(localStorage.getItem("posts")) || [];
  let container = document.getElementById("postthreads");

  if (!container) {
    alert("Container not found");
    return;
  }

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  container.innerHTML = ""; // clear old threads

  posts.forEach((t, index) => {
    // Check permission: show buttons only if admin or owner
    const showButtons =
      currentUser.username === "NVI16112@GMAIL.COM" ||
      currentUser.username === t.createdBy;

    // Add edit/delete buttons only if allowed
    const buttons = showButtons
      ? `
        <button onclick="editPost(${t.id})">Edit</button>
        <button onclick="deletePost(${t.id})">Delete</button>
      `
      : "";

    container.innerHTML += `
      <div class="post-box">
        <p class="question"><strong>Q.</strong> ${t.inputUser}</p>
        <div class="post-actions">
          <button onclick="likePost(${t.id})">👍</button> <span>${t.like}</span>
          <button onclick="dislikePost(${t.id})">👎</button> <span>${t.dislike}</span>
          <button onclick="hSharePost(${t.id})">🙏</button> <span>${t.hShare}</span>
          ${buttons}
        </div>
        <p class="createdBy">Created by: ${t.createdBy}</p>
        <p class="createdBy">Created at: ${t.timestamp}</p>
      </div>
    `;
  });
}


function likePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.map(p => {
    if (p.id === id) {
      p.like += 1;
    }
    return p;
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  showthreads();
}

function dislikePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.map(p => {
    if (p.id === id) {
      p.dislike += 1;
    }
    return p;
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  showthreads();
}

function hSharePost(id) {
 let posts = JSON.parse(localStorage.getItem("posts")) || []

 posts = posts.map(p =>{
        if(p.id === id ){
            p.hShare +=1 ;
            // console.log(p);
        }
        
        return p;
 });
 localStorage.setItem("posts", JSON.stringify(posts));
 showthreads();
}


function deletePost(id){
  

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

     // Filter out the post with the given id
    posts = posts.filter(p => 
        p.id !== id);

    localStorage.setItem("posts", JSON.stringify(posts));
    showthreads();


    
}


// function editPost(id){


//     alert("chako");
//   ;
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];

//     posts = posts.map(p =>{
//         if(p.id === id){
//             document.getElementById("userPost").innerHTML = "jai jai";
//             document.getElementById("entrySection").innerHTML = `
//         <button onclick="RePost(${id})">Edit</button>
    
//       `;

//         }

//     });


// }

function editPost(id) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find(p => p.id === id);

  if (!post) return;

  document.getElementById("userPost").value = post.inputUser; // ✅ use .value
  editingPostId = id;
 document.getElementById("submitPost").style.display = "none";
document.getElementById("repostBtn").style.display = "inline-block";

}

function repost() {
     
  const updatedText = document.getElementById("userPost").value.trim();
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (!updatedText) {
    alert("please press edit from your post ");
    return;
  }

  const updatedPosts = posts.map(p => {
    if (p.id === editingPostId) {
      return { ...p , inputUser: updatedText };
    }
    return p;
  });

  localStorage.setItem("posts", JSON.stringify(updatedPosts));

  // Reset form
  document.getElementById("userPost").value = "";

  editingPostId = null;

  showthreads(); // Refresh posts

  document.getElementById("submitPost").style.display = "inline-block";
document.getElementById("repostBtn").style.display = "none";

}


// function FindOut(){

//     let usersearch = document.getElementById("searchArea").value.trim();

//     if(!usersearch){
//         alert("please insert to search");
//     }
//     let posts = JSON.parse(localStorage.getItem("posts")) || [];

    
//     posts = posts.map(p =>{
//             if(p.createdBy === usersearch ){
                
                


                
//                 // console.log(p);
//             }
            
//             return p;
//     });
//     localStorage.setItem("posts", JSON.stringify(posts));
//     showthreads();

// }

function FindOut() {
    
  let usersearch = document.getElementById("searchArea").value.trim().toLowerCase();

  if (!usersearch) {
    alert("Please enter a username to search");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Filter posts that match the searched user
  let filteredPosts = posts.filter(p =>
     p.createdBy.toLowerCase().includes(usersearch));
     if(!filteredPosts){
        alert("no matching username/ email found");
     }

  // Now render only filtered posts
  showthreads(filteredPosts);
  document.getElementById("allPost").style.display = "inline-block";
  
   
    
}

function allPost(){
    showthreads();
    document.getElementById("searchArea").value = "";
    document.getElementById("allPost").style.display = "";
}
