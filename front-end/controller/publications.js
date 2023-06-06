const publication = document.querySelector('#Publications')
// const token = localStorage.setItem('token', token)
const token = localStorage.getItem('token')
console.log(token);
publication.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const response = await fetch(e.target.action, {
        method: 'POST',
        headers: {
            Authorization: token
        }
    })
})
