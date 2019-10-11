let members=[];  
let chechBtn;

function member(name,email,major,role,bio) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.bio = bio;
}

window.onload = function () {
    if (localStorage.getItem("members-array") != null) {
        let mem = localStorage.getItem("members-array");
        members = JSON.parse(mem);
        showMemberList();
    }
}

function addMember(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let major = document.getElementById("major-list");
    let stdMajor = major.options[major.selectedIndex].text;
    let role = document.getElementById("role-list");
    let stdRole = role.options[role.selectedIndex].text;
    let bio = document.getElementById('bio').value;

    let student = new member(name,email,stdMajor,stdRole,bio);

    members.unshift(student);
}

function saveFunction() {
    addMember();
    let jsonMembers = JSON.stringify(members);
    localStorage.setItem('members-array', jsonMembers)
} 

function showMemberList(){
    members.forEach(function(m){ 
    let sec = document.createElement('div');
    sec.style.marginLeft = "20px";
    sec.style.marginTop = "30px";
    
    let icon = document.createElement('img');
    icon.style.width = "40px";
    icon.style.hight = "40px";
    icon.style.float = "left";
    icon.style.marginTop = "20px";
    icon.style.marginRight = "5px";
    icon.src = "icon1.PNG";
    sec.appendChild(icon);
    
    /*let deleteBtn = document.createElement('button');
    deleteBtn.style.backgroundColor = "#FF4A4A";
    deleteBtn.style.width = "40px";
    deleteBtn.style.height = "40px";
    deleteBtn.style.float = "left";
    deleteBtn.style.marginTop = "20px";
    deleteBtn.style.marginRight = "10px";
    deleteBtn.style.borderRadius = "50%";
    sec.appendChild(deleteBtn);*/

    let nameH = document.createElement('H2'); 
    let list = document.getElementById('list'); 
    nameH.appendChild(document.createTextNode(m.name)); 
    sec.appendChild(nameH);
    

    let p = document.createElement('p');
    p.style.color = "#2D89E6";
    p.appendChild(document.createTextNode(m.email+" / "+m.major+" / "+m.role));
    sec.appendChild(p);
    

    let bioP = document.createElement('p');
    bioP.style.color = "#6A6A6A";
    bioP.style.marginLeft = "43px";
    bioP.style.height = "40px";
    bioP.style.lineHeight ="20px";
    bioP.style.overflow = "hidden";
    bioP.appendChild(document.createTextNode(m.bio));
    sec.appendChild(bioP);
    
    list.appendChild(sec);
  })
}

//chech adding member to botom option
function checkAddOption()
{
   if (document.getElementById('add-bottom').checked) 
   {
       chechBtn = 0;
   }
   
}


 


 
 