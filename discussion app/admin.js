showthreads();


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

       if(!currentUser){
        alert("please login again");    
        window.location.href = "startpage.htm";   
    }

    // console.log(currentUser);


    if(currentUser.username === "NVI16112@GMAIL.COM")

    {
        alert("welocime admin");
        document.getElementById("setting").innerHTML=
        `<button onclick="goToAdmin()">⚙ </button>`;
    }
  

//logout function

function logOut(){

    localStorage.removeItem("currentUser");
    window.location.href = "startpage.htm";

}

function goToAdmin(){
    window.location.href = "adminsetting.htm";
}



function Posthread(){
    

   let inputUser = document.getElementById("inputUser").value.trim();

   if(!inputUser){
    alert("textbox can not be empty");
    return;
   }

   const posts = JSON.parse(localStorage.getItem("posts")) || [];

   const post = {
                  id:  Date.now(),
                  inputUser,
                  createdBy:currentUser.username,
                   currentUser: "NVI16112@GMAIL.COM"
   };
   posts.push(post);
//    console.log(post);

   localStorage.setItem("posts", JSON.stringify(posts));

   showthreads();



}

function showthreads(){
   
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    let container = document.getElementById("postthreads");

    if(!container){
        alert("null property found");
        return;
    }
  
    // console.log(posts);

    //bug fsa pda hai
    
      posts.forEach(t => {
           container.innerHTML += `
           <div class="threads1">
           
  <div class="threads">
    <h6 id="crtdBy"> <small>${t.createdBy}</small></h6>
   

    
    ${
      t.currentUser !== "NVI16112@GMAIL.COM"
        ? `
          <button id="editBtn" onclick="editPost(${t.id})">Edit</button>
          <button id="deleteBtn" onclick="deletePost(${t.id})">Delete</button>
        `
        : ""
    }
     
  </div>

    <div class="threads0">
   <p id="strd">${t.inputUser}</p>
  </div>
  </div>
`;

      });

   
    

    }