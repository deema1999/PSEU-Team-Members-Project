let members = [];  
let chechBtn;
let filterdArray;
let shownMembersNo = 0;

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
    localStorage.setItem('members-array', jsonMembers);
    
} 

function showMemberList(list) {

    document.getElementById("list").innerHTML = "";

    list.forEach(function(m,index) { 
    let sec = document.createElement('div');
    sec.id = "memeSec";
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
    deleteBtn.id = "delBtn";
    deleteBtn.onclick = function () {

        members.splice(index,1);
        jsonMembers = JSON.stringify(members);
        localStorage.setItem('members-array', jsonMembers);
        showMemberList(members);

    };
    sec.appendChild(deleteBtn);

    let nameH = document.createElement('H2'); 
    let list = document.getElementById('list'); 
    nameH.appendChild(document.createTextNode(m.name)); 
    sec.appendChild(nameH);
    
    let p = document.createElement('p');
    p.style.color = "#2D89E6";
    p.style.marginTop = "10px";
    p.appendChild(document.createTextNode(m.email+" / "+m.major+" / "+m.role));
    sec.appendChild(p);
    
    let bioP = document.createElement('p');
    bioP.style.color = "#6A6A6A";
    bioP.style.marginLeft = "48px";
    bioP.style.height = "40px";
    bioP.style.lineHeight ="20px";
    bioP.style.maxHeight ="80px";
    bioP.style.wordBreak = "break-all";
    bioP.style.overflow = "hidden";
    bioP.style.marginTop = "10px";
    bioP.appendChild(document.createTextNode(m.bio));
    sec.appendChild(bioP);

    //show a modal with all member's information with black overlay backdrop
    nameH.onclick = function() {

        let popup = document.getElementById('popup');
        document.getElementById('overlay').style.display = "block";
        popup.style.visibility = "visible";
        
        
        let name = document.getElementById('member-name');
        name.appendChild(document.createTextNode(m.name));
       

        let para1 = document.getElementById('member-info');
        
        para1.appendChild(document.createTextNode(m.email+" / "+m.major+" / "+m.role));
        
        let bioPara = document.getElementById('member-bio');
        bioPara.appendChild(document.createTextNode(m.bio));

    };
    list.appendChild(sec);
  });

  shownMembersNo = list.length;
  document.getElementById('items').innerHTML = shownMembersNo + " ITEMS";

}

//check adding member to bottom option
function checkAddOption() {

   if (document.getElementById('add-bottom').checked) 
        {
            chechBtn = "checked";
        }
}
// compare two values 
function compareValues(key, order='asc') {

    return function(a, b) {

      const varA = a[key].toUpperCase();
      const varB = b[key].toUpperCase();
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
}
//sort members array by alphabetical order, ascending and descending based on user choice
function sortByAlpha(){

    let item = document.getElementById('sort-by-alphabit');
    let option = item.options[item.selectedIndex].value;
   
    if(option == "A-Z")
    {
        members.sort(compareValues('name'));  
        showMemberList(members);
    }
    else if(option == "Z-A") {
        members.sort(compareValues('name','desc'));
        showMemberList(members);
    }
    
}

function search(option,name) {

    filterdArray = [];
    members.forEach(function(m) { 
        if (m[name] === option) {
            filterdArray.push(m);
        }
    })
return filterdArray;
}

//filter members based on thier roles and majors selected by the user 
function filterByMajor() {

    let item1 = document.getElementById('filter-by-major');
    let majorOption = item1.options[item1.selectedIndex].value;

    search(majorOption,"major");
    showMemberList(filterdArray);
}

function filterByRole() {

    let item1 = document.getElementById('filter-by-role');
    let roleOption = item1.options[item1.selectedIndex].value;

    search(roleOption,"role");
    showMemberList(filterdArray);
}
function filter() {

    filterByMajor();
    filterByRole();
    showMemberList(filterdArray);
}



