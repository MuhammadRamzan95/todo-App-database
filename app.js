var list = document.getElementById('list')

firebase.database().ref('todos').on('child_added',function(data){
     //create li tag
  var li = document.createElement('li')
  var litext = document.createTextNode(data.val().value)
  li.appendChild(litext)
   
  //create deletebtn
  var delBtn = document.createElement("button")
  var deltext = document.createTextNode("Delete");
  delBtn.setAttribute("id" ,data.val().key)
  delBtn.setAttribute("class" , "btn")
  delBtn.setAttribute("onclick" ,"delItem(this)")
  delBtn.appendChild(deltext)

  //create Edit btn
  var editbtn = document.createElement("button")
  var edittext = document.createTextNode("EDIT")
  
  editbtn.setAttribute('id', data.val().key)
  editbtn.setAttribute("class" , "btn")
  editbtn.setAttribute("onclick" ,"editBtn(this)")
  editbtn.appendChild(edittext);
  li.appendChild(delBtn)
  li.appendChild(editbtn)

  list.appendChild(li)
})

function addTodo(){
  var todo=  document.getElementById("todo");
  // var database = firebase.database().ref('todos')
  var key =firebase.database().ref('todos') .push().key;
  var todoapp = {
    value :todo.value,
    key :key
  }
  firebase.database().ref('todos').child(key).set(todoapp)
    

   todo.value=""
    
}
function delItem(p){
 
  firebase.database().ref('todos').child(p.id).remove();
  p.parentNode.remove()

  
}
function editBtn(e){
  
  var editValue = prompt("Enter edit value" , e.parentNode.firstChild.nodeValue);
  var edittodo = {
    value :editValue,
    key : e.id
  }
  firebase.database().ref('todos').child(e.id).set(edittodo)
  e.parentNode.firstChild.nodeValue = editValue;

}
function deleteAll(){
  list.innerHTML = ""
}