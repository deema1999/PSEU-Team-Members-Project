let members=[];  
let chechBtn;
let filterdArray;

function Member(name,email,major,role,bio) {

    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.bio = bio;
}

window.onload = function () {

    let mememberList = localStorage.getItem("members-array");
    members = mememberList ? JSON.parse(mememberList) : [];
    showMemberList(members);
}

function addMember(){

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let major = document.getElementById("major-list");
    let stdMajor = major.options[major.selectedIndex].text;
    let role = document.getElementById("role-list");
    let stdRole = role.options[role.selectedIndex].text;
    let bio = document.getElementById('bio').value;

    let newMember = new Member(name,email,stdMajor,stdRole,bio);
    
    let index = document.getElementById('index-input').value;

    if(chechBtn == "checked") {
        members.push(newMember);
    }
    else if(index != null)
    {
        members.splice(index, 0, newMember);
    }
    else if(chechBtn != checked && index == null) {
        members.unshift(newMember);
    }
}

function saveFunction() {

    addMember();
    let jsonMembers = JSON.stringify(members);
    localStorage.setItem('members-array', jsonMembers)
    
} 

function showMemberList(list) {

    document.getElementById("list").innerHTML = "";

    list.forEach(function(m) { 
    let sec = document.createElement('div');
    sec.style.marginLeft = "20px";
    sec.style.marginTop = "30px";
    sec.style.width = "900px";
    
    let deleteBtn = document.createElement('button');
    deleteBtn.style.backgroundColor = "#FF4A4A";
    deleteBtn.style.width = "40px";
    deleteBtn.style.height = "40px";
    deleteBtn.style.float = "left";
    deleteBtn.style.marginTop = "20px";
    deleteBtn.style.marginRight = "10px";
    deleteBtn.style.borderRadius = "50%";
    deleteBtn.style.color ="#fff";
    deleteBtn.style.fontSize ="35px";
    deleteBtn.appendChild(document.createTextNode("-"));
    deleteBtn.onclick = "deleteMember()";
    sec.appendChild(deleteBtn);

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
    bioP.style.maxHeight ="80px";
    bioP.style.wordBreak = "break-all";
    bioP.style.overflow = "hidden";
    bioP.appendChild(document.createTextNode(m.bio));
    sec.appendChild(bioP);
    
    list.appendChild(sec);
  })

}

//check adding member to botom option
function checkAddOption() {

   if (document.getElementById('add-bottom').checked) 
        {
            chechBtn = "checked";
        }
}



