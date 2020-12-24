const form = document.querySelector('.user-form')
const inputs = form.querySelectorAll('input')
console.log(inputs);
let errores = {}

form.addEventListener('submit', (event) =>{
    checkInputs();
    console.log('hola');
    event.preventDefault();
});

function checkInputs() {
    inputs.forEach(input => {
        let value = input.value.trim();
        console.log(input.id);
        if (value === '') {
            setError(input,'El campo no puede estar vacio')
        }
        // switch (input.id) {
        //     case 'nombre':

        //         setSucces(username)
                
        //         break;
        
        //     default:
        //         break;
        // }
    });
}
function setError(input ,message){
    let formControl = input.parentElement
    let msg = formControl.querySelector('p')
    msg.innerText = message
    formControl.className = '.invalid'
    errores[input.name] = message
}

function setSucces(input) {
    let formControl = input.parentElement
    let small = formControl.querySelector('small')
    
    formControl.className = 'form-control succes'
    small.innerText = ''
    
    delete errores[input.name] 
}
