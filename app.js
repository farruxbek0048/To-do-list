const time = document.querySelector('.time');
const getDate = document.querySelector('.date');

const taskInput = document.getElementById('task-input');
const message = document.getElementById('message');
const ulItems = document.getElementById('ul-items');
const addItem = document.querySelector('.add-item');
const overlay = document.querySelector('.overlay');

const task = document.querySelector('.task');
const deleteModal = document.getElementById('delete-modal');
const closeModalItem = document.getElementById('close-modal-item');
const deleteModalItem = document.getElementById('delete-modal-item');

const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-input');
const closeModalEdit = document.getElementById('close-modal-edit');
const saveModalItem = document.getElementById('save-modal-item');

function getFullDate(){
    const date = new Date()

    const months = [
        "Yanvar", "Febral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ]

    const getFullYear = date.getFullYear()
    const getMonth = date.getMonth()
    const getDay = date.getDate().toString().padStart(2, 0)

    const getHours = date.getHours().toString().padStart(2, 0)
    const getMinutes = date.getMinutes().toString().padStart(2, 0)
    const getSeconds = date.getSeconds().toString().padStart(2, 0)

    return {
        date: `${getDay}-${months[getMonth]}, ${getFullYear}`,
        time: `${getHours}:${getMinutes}:${getSeconds}`
    }

}

setInterval(() => {
    time.textContent = getFullDate().time
    getDate.textContent = getFullDate().date
}, 1000)


//toggle modal
function toggleModal(modal, isActive){
    if(isActive){
        modal.classList.add('active')
        overlay.classList.add('active')
    } else{
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
}

let currentItem = null

//delete task
function deleteOpenModal(target){
    currentItem = target.closest('li')
    task.textContent = currentItem.textContent
    if (currentItem){
        toggleModal(deleteModal, true)
    }
}

deleteModalItem.addEventListener('click', () => {
    if(currentItem){
        currentItem.remove()
        toggleModal(deleteModal, false)
        message.textContent = `${currentItem.textContent} muvaffaqiyatli o'chirildi`
        message.classList.add('active')
        setTimeout(() => message.textContent = '', 3000)
    }
})

closeModalItem.addEventListener('click', () => toggleModal(deleteModal, false))

//etid task
function editOpenModal(target){
    currentItem = target.closest('li')

    if (currentItem){
        toggleModal(editModal, true)
        editInput.value = currentItem.textContent.trim()
    }
}

saveModalItem.addEventListener('click', () => {
    const newValue = editInput.value.trm()
    currentItem.querySelector('.name').textContent = newValue
    toggleModal(editModal, false)
})

ulItems.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('fa-trash-can')){
        deleteOpenModal(target, true) 
    } else if (target.classList.contains('fa-pen-to-square')){
        editOpenModal(target, true)
    }
    
})

//create task
function createTask(inputValue){
    const li = document.createElement('li')
    li.innerHTML = `
    <div class="name">${inputValue}</div>
    <div class="actions">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash-can"></i>
    </div>
    `
    li.addEventListener('dblclick', () => {
        li.classList.toggle('complated')
    })
    ulItems.appendChild(li)
}

//add item
addItem.addEventListener('click', () => {
    const inputValue = taskInput.value.trim() 

    if(inputValue.trim()){
        createTask(inputValue)
    } else{
        message.textContent = "Input bo'sh bo'lmasligi kerak";
        message.classList.add('error')
        setTimeout (() => message.textContent = '', 3000)
    }

    taskInput.value = ''
})