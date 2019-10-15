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
        members.splice(index-1, 0, newMember);
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
       
        let emailInfo = document.getElementById('email-info');
        let majorInfo = document.getElementById('major-info');
        let roleInfo = document.getElementById('role-info');
        emailInfo.appendChild(document.createTextNode(m.email));
        majorInfo.options[0].text = m.major;
        roleInfo.options[0].text = m.role;
        emailInfo.style.color = "#2D89E6";

        let bioPara = document.getElementById('member-bio');
        bioPara.appendChild(document.createTextNode(m.bio));

        let deleteMemBtn = document.getElementById('del-btn');
        deleteMemBtn.onclick = function () {

            members.splice(index,1);
            jsonMembers = JSON.stringify(members);
            localStorage.setItem('members-array', jsonMembers);
            showMemberList(members);
    
        };
        let saveMemInfoBtn = document.getElementById('save-btn');
        saveMemInfoBtn.onclick = function () {
    
            m.name = name.innerHTML;
            m.email = emailInfo.innerHTML;
            m.bio = bioPara.innerHTML;
            m.major = majorInfo.options[majorInfo.selectedIndex].value;
            m.role = roleInfo.options[roleInfo.selectedIndex].value;
            jsonMembers = JSON.stringify(members);
            localStorage.setItem('members-array', jsonMembers);
            showMemberList(members);
    
        };
        let canclelBtn = document.getElementById('cancel-btn');
        canclelBtn.onclick = function () {
           
            popup.style.visibility = "hidden";
            document.getElementById('overlay').style.display = "none"; 
            name.innerHTML = "";
            emailInfo.innerHTML="";
            bioPara.innerHTML="";

        };  

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

    let sortOption = document.getElementById('sort-by-alphabit').value;

    if(sortOption == "A-Z") {

        filterdArray.sort(compareValues('name'));  
    }
    else if(sortOption == "Z-A") {

        filterdArray.sort(compareValues('name','desc'));
        
    }
    
}

function filter() {

    filterdArray = members;
    let majorOption = document.getElementById('filter-by-major').value;
    let roleOption = document.getElementById('filter-by-role').value;
    let sortOption = document.getElementById('sort-by-alphabit');
    let inputName = document.getElementById('search-name').value;

    if(majorOption != "Major") {
    
        filterdArray = filterdArray.filter(obj => { return obj.major == majorOption});
    }
    if(roleOption != "Role") {
    
        filterdArray = filterdArray.filter(obj => { return obj.role == roleOption});
    }
    if(sortOption != 'A-Z') {
    
        sortByAlpha();
    }
    if(inputName != undefined) {
        
        filterdArray = filterdArray.filter(obj => {return obj.name.toLowerCase().includes(inputName.toLowerCase())});
    }
    showMemberList(filterdArray);
}

