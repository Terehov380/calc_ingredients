//кнопка
let recipe = [] //все ингредиенты, массив с объектами

//Инструкция
const details = document.querySelector('details')
const summary = details.querySelector('summary')
const detailsContent = details.querySelector('.details_content')
summary.addEventListener('click', function (e) {
    e.preventDefault()

    if (details.open) {
        details.classList.add('is-closing')

        setTimeout(function () {
            details.open = false
            details.classList.remove('is-closing')
        }, 800)
    } else {
        details.open = true
    }
})


//Кнопка добавить
document.querySelector('.add_btn').addEventListener('click', function () {
    let name = document.querySelector('.item_name')
    let count = document.querySelector('.item_count')
    let type = document.querySelector('.item_type')
    let itemNameError = document.querySelector('.item_name_error')
    if (!name.value.trim()) {
        itemNameError.textContent = 'Введите название ингредиента'
        name.classList.add('input_error')
        return false
    }
    itemNameError.textContent = ''
    name.classList.remove('input_error')
    recipe.push({
        "name": name.value.trim(),
        "count": +count.value,
        "type": type.value
    })
    let result
    if (+count.value === 0) {
        result = `${name.value.trim()} - по вкусу`
    } else {
        result = `${name.value} - ${count.value} ${type.value}`
    }
    let div = document.createElement('div')
    div.innerHTML = `
<div class = "recipe_item d-flex space_between">
    <div>${result}</div>
    <button class = "remove_btn" data-name="${name.value.trim()}">&times;</button>
</div>
`
    document.querySelector('.recipe').append(div)
    name.value = ''
    count.value = ''
})

//Кнопка вычислить
document.querySelector('.result_button').addEventListener('click', function () {
    document.querySelector('.result_new_recipe').innerHTML = ''
    let ratio_type = +document.querySelector('.item_ratio_type').value
    let ratioInput = document.querySelector('.item_ratio')
    let ratio = +ratioInput.value
    let ratioError = document.querySelector('.ratio_error')
    if (!ratio || ratio <= 0) {
        ratioError.textContent = 'Введите число больше нуля'
        ratioInput.classList.add('input_error')
        return false
    }
    ratioError.textContent = ''
    ratioInput.classList.remove('input_error')
    let new_recipe = []
    if (ratio_type === 1) {
        for (let i = 0; i < recipe.length; i++) {
            new_recipe.push({
                "name": recipe[i]["name"],
                "count": (+recipe[i]["count"] / ratio).toFixed(3),
                "type": recipe[i]["type"]
            })
        }
    } else if (ratio_type === 2) {
        for (let i = 0; i < recipe.length; i++) {
            new_recipe.push({
                "name": recipe[i]["name"],
                "count": (+recipe[i]["count"] * ratio).toFixed(3),
                "type": recipe[i]["type"]
            })
        }
    }
    for (let i = 0; i < new_recipe.length; i++) {
        let result
        if (+new_recipe[i]["count"] == 0) {
            result = 'по вкусу'
        } else {
            result = `${new_recipe[i]["count"]} ${new_recipe[i]["type"]}`
        }
        let div = document.createElement('div')
        div.innerHTML = `
<div class="d-flex">
    <div>${new_recipe[i]["name"]} - ${result}</div>
</div>
`
        document.querySelector('.result_new_recipe').append(div)
    }
})


//Кнопка удалить конкретный ингредиент
document.querySelector('.recipe').addEventListener('click', function (e) {
    if (!e.target.dataset.name) {
        return false
    }
    let item = e.target.closest('.d-flex')
    item.classList.add('removing')
    setTimeout(function () {
        item.remove()
    }, 300)
    for (let i = 0; i < recipe.length; i++) {
        if (recipe[i]["name"] == e.target.dataset.name) {
            recipe.splice(i, 1)
        }
    }
})

//Копирование рецепта в буфер обмена
const copyButton = document.getElementById('copy_btn')

// Обработчик события нажатия на кнопку
copyButton.addEventListener('click', () => {
    // Получаем текст из блока .text
    const recipeName = document.querySelector('.recipe_name').value.trim()
    const recipeText = document.querySelector('.result_new_recipe').innerText
    const textToCopy = `${recipeName || 'Рецепт'}\n${recipeText}`

    // Копируем текст в буфер обмена
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const toast = document.getElementById('copyToast')
            toast.classList.add('show')
            setTimeout(function () {
                toast.classList.remove('show')
            }, 2000)
        })
        .catch(err => {
            console.error('Не удалось скопировать текст:', err)
        })
})

// Кнопки увеличения и уменьшиния текста страницы
const decreaseButton = document.getElementById('decreaseFont')
const increaseButton = document.getElementById('increaseFont')
//Кнопка смены темы сайта
const themeButton = document.getElementById('themeFont')
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
</svg>`

function decreaseFontSize() {
    let currentFontSize = parseInt(window.getComputedStyle(document.body).fontSize);

    if (currentFontSize > 8) {
        document.body.style.fontSize = `${currentFontSize - 1}px`;
    }
}

function increaseFontSize() {
    let currentFontSize = parseInt(window.getComputedStyle(document.body).fontSize);

    if (currentFontSize < 22) {
        document.body.style.fontSize = `${currentFontSize + 1}px`;
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark_theme')
    if (document.body.classList.contains('dark_theme')) {
        themeButton.innerHTML = moonIcon
    } else {
        themeButton.innerHTML = sunIcon
    }
}

decreaseButton.addEventListener('click', decreaseFontSize);
increaseButton.addEventListener('click', increaseFontSize);
themeButton.addEventListener('click', toggleTheme);