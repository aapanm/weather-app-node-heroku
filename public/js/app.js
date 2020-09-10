const baseUrl = new URL('/weather?')




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messagetwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', ()=>{
    event.preventDefault();

    const location = search.value;

    baseUrl.search = "";
    const params = {address:location}
    Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]))
    
    fetch(baseUrl).then((response)=>{
    response.json().then((data)=>{
       if(data.Error){
           messageOne.textContent = data.Error;
       }else{
        messageOne.textContent = data.location;
        messagetwo.textContent = data.forecast;
       }
    })
})

    console.log(location);
})