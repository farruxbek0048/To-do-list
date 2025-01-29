const time = document.querySelector('.time');
const getDate = document.querySelector('.date');

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