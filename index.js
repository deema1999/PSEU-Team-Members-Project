let members=[];  

function member(name,email,major,role,bio) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.bio = bio;
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

 


 
 