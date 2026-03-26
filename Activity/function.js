//GET



//POST


//PUT
async function putData(){
    const res= await fetch(URL,{
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            
        })
    })
    const data = await res.json()
}



//PATCH
async function patchData(){
    const res = await fetch(URL,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'username':'NTR vs MRT'
        })
        
    })
    const data = await res.json()
    console.log(data)
}
patchData();

//DELETE

async function delData(){
    const res = await fetch(URL,{
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    const data = await res.json();
    console.log("Delete Status", res.status);
    console.log("Response Data:",data);
}

