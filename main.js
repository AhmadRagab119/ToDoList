let inpAdd =document.querySelector(".inpAdd")
let btnAdd =document.querySelector(".add")
let Taskes =document.querySelector(".taskes")

let Arrey = [];
if(localStorage.getItem("Taskes")){
    Arrey = JSON.parse(localStorage.getItem("Taskes"))
}
getToLocalStorage()
btnAdd.addEventListener("click",()=>{
   if(inpAdd.value !=""){
    let task ={
        id:Date.now(),
        text:inpAdd.value,
        state:false,
   }
   Arrey.push(task)
   addTaskToPage(Arrey)
   addToLocalStorage(Arrey)

   inpAdd.value =""
}
})

function addTaskToPage(ArreyofTaskes){
    Taskes.innerHTML =""
ArreyofTaskes.forEach((el) => {
    // create Elements
let task =document.createElement("div")
task.className ="task"
task.setAttribute("data-id",el.id)
let content =document.createElement("div")
content.className ="content"
let DivText =document.createElement("div")
DivText.textContent =el.text

if(el.state){
    DivText.className ="finish"
}
let action =document.createElement("div")
action.className ="action"

let Edit =document.createElement("div")
Edit.className="Edit"
Edit.textContent ="EDIT"

// Edit Task

Edit.addEventListener("click",()=>{
    DelteTaskFromLocalStorage(Edit.parentElement.parentElement.getAttribute("data-id"))
    Edit.parentElement.parentElement.remove()
     inpAdd.value = DivText.textContent
     inpAdd.focus()
     btnAdd.addEventListener("click",()=>{
        el.text = inpAdd.value
        DivText.textContent = el.text
     })
})


let Delete =document.createElement("div")
Delete.className="Delete"
Delete.textContent ="DELETE"
let done =document.createElement("div")
console.log(done)
done.className="done"
done.textContent ="DONE"

// Append Elements
action.appendChild(Edit)
action.appendChild(done)
action.appendChild(Delete)

content.appendChild(DivText)

task.appendChild(content)
task.appendChild(action)

Taskes.appendChild(task)

});
}

function addToLocalStorage(Arrey){
    window.localStorage.setItem("Taskes",JSON.stringify(Arrey))
}

function getToLocalStorage(){
    let data = localStorage.getItem("Taskes")
    if(data){
        let task = JSON.parse(data)
        addTaskToPage(task)
    }
}

// update new values in page

document.body.addEventListener("click",(e)=>{
  if(e.target.classList.contains("Delete")){
    DelteTaskFromLocalStorage(e.target.parentElement.parentElement.getAttribute("data-id"))
    e.target.parentElement.parentElement.remove()
  }
  if(e.target.classList.contains("done")){
    updateStateInLcalStorage(e.target.parentElement.parentElement.getAttribute("data-id"))
    e.target.parentElement.previousElementSibling.firstChild.classList.toggle("finish")
  }
})


// update new values in local storage 

function DelteTaskFromLocalStorage(id){
    Arrey = Arrey.filter((task)=> id != task.id )
    addToLocalStorage(Arrey)
}

function updateStateInLcalStorage(id){
 for(i= 0 ;i<Arrey.length ;i++){
    if(Arrey[i].id == id){
        Arrey[i].state === false ? (Arrey[i].state = true) :(Arrey[i].state = false);
    }
    addToLocalStorage(Arrey)
 }

}