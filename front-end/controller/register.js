const register = document.querySelector('#Register')
//const jwt = localStorage.getItem('jwt')
// console.log(token);
register.addEventListener('submit', async (e) =>{
    e.preventDefault()
    console.log(e.target)
    const response = await fetch(e.target.action, {
        method: 'POST',
    })
    const body = await response.json()
    console.log(body);

    const token = localStorage.setItem('token', body.token)
})