const form = document.getElementById('form-todo')
const content = document.getElementById('content')
const desc = document.getElementById('desc')
const todolist = document.getElementById('todo-list')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    //alert to do list jika belum terisi
    const value = content.value
    if (!value) {
        alert('Isi dulu bang todo nya!')
        return
    }

    const vDesc = desc.value
    if (!vDesc) {
        alert('Deskripsi nya hey isi dulu!')
        return
    }

    //simpan data todo ke local storage
    let todos = localStorage.getItem('todo')
    todos = todos ? JSON.parse(todos) : []

    todos.push({ value, vDesc });

    //simpan array yang baru di local storage
    localStorage.setItem('todo', JSON.stringify(todos))
    console.log(todos)
    renderTodos()

    //UPDATE BARU #1
    content.value = ''
    desc.value = ''

})

//render semua todo yang tersimpan di localStorage
function renderTodos() {
    const stored = localStorage.getItem('todo')
    const arr = stored ? JSON.parse(stored) : []
    todolist.innerHTML = ''
    arr.forEach(function (t, idx) {
        const li = document.createElement('li')

        //UPDATE BARU #2
        const title = document.createElement('strong')
        title.textContent = t.value
        title.classList.add('todo-title')

        const descP = document.createElement('p')
        descP.textContent = t.vDesc
        descP.classList.add('todo-desc')

        const actionWrap = document.createElement('div')
        actionWrap.classList.add('action')


        //tombol edit
        const editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'
        editBtn.type = 'button'
        editBtn.classList.add('editBtn')

        //edit mode
        editBtn.addEventListener('click', function () {
            const input = document.createElement('input')
            input.type = 'text'
            input.value = t.value
            input.classList.add('editInput')

            const descInput = document.createElement('textarea')
            descInput.type = 'text'
            descInput.value = t.vDesc
            descInput.classList.add('inputDesc')

            const actionEdit = document.createElement('div')
            actionEdit.classList.add('actionEdit')

            //save button
            const saveBtn = document.createElement('button')
            saveBtn.type = 'button'
            saveBtn.textContent = 'simpan'
            saveBtn.classList.add('saveBtn')

            //cancel button
            const cancelBtn = document.createElement('button')
            cancelBtn.textContent = 'cancel'
            cancelBtn.type = 'button'
            cancelBtn.classList.add('cancelBtn')

            //klik manual
            cancelBtn.addEventListener('click', function () {
                renderTodos()
            })

            //klik esc buat cancel
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    event.preventDefault()
                    cancelBtn.click()
                }
            })

            //save manual
            saveBtn.addEventListener('click', function () {
                const newVal = { value: input.value, vDesc: descInput.value }
                if (confirm('Yakin ingin simpan ini?')) {
                    // alert('Todo berhasil di perbarui')
                    console.log(newVal)
                    if (newVal) {
                        const current = localStorage.getItem('todo')
                        const listArr = current ? JSON.parse(current) : []
                        listArr[idx] = newVal
                        localStorage.setItem('todo', JSON.stringify(listArr))
                        renderTodos()
                        console.log(listArr)
                    }
                }
            })

            //klik enter untuk save
            input.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault()
                    saveBtn.click()
                }
            })

            cancelBtn.addEventListener('click', function () {
                renderTodos()
            })

            //tambah input, tombol save, cancel, ketika edit di klik
            actionEdit.appendChild(saveBtn)
            actionEdit.appendChild(cancelBtn)

            li.innerHTML = ''
            li.appendChild(input)
            li.appendChild(descInput)
            li.appendChild(actionEdit)
            input.focus()
        })

        //tombol delete
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Hapus'
        deleteBtn.type = 'button'
        deleteBtn.classList.add('deleteBtn')

        deleteBtn.addEventListener('click', function () {
            if (confirm('Yakin ingin hapus to do list ini?')) {
                alert('todo berhasil dihapus')
                arr.splice(idx, 1)

                localStorage.setItem('todo', JSON.stringify(arr))
                renderTodos()
            }
        })

        actionWrap.appendChild(editBtn)
        actionWrap.appendChild(deleteBtn)

        li.appendChild(title)
        li.appendChild(descP)
        li.appendChild(actionWrap)

        todolist.appendChild(li)
    })
}
renderTodos()