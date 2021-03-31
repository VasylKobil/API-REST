const ele = document.getElementsByClassName('ele');
const place = document.getElementById('words');

loadBooks = () => {
    setTimeout( function (){
        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", "http://localhost:3000/words/", false);
        xhttp.send();

        const words = JSON.parse(xhttp.responseText);

        if(ele){
            place.innerHTML = '';
        }
        const map = new Map();
        for (let ele of words) {
            if(ele.word === ""){continue}
            let count = 0;
            for(let eleIn of words){
                if(ele.word === eleIn.word){
                    count++;
                }
            }
            if(!map.has(ele.word)){
                map.set(ele.word, {count: count})
            }
        }
        renderHTML(map);
    }, 0)
}

renderHTML = (data) => {
    for(let ele of data) {
        const x = `
                        <div class="col-6 ele">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${ele[0]}(${ele[1].count})</h5>
                                    <button onclick="deleteWord(${ele.num})" type="button" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                        `
        place.innerHTML = place.innerHTML + x;
    }
}


deleteWord = (num) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/book/${num}`, false);
    xhttp.send();

    location.reload();
}
