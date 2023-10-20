const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjJhZTA0OWQ1MTZlMTJjZTMwODE4NjEwNWQ3NTE5MyIsInN1YiI6IjY1MzA4Zjg2OWQ1OTJjMDEyZTFmM2UxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mhkOWSigtwz6N2N0wlAcvSW6moyV0tSVH71M99AO8_M'
    }
};

let cont = 1;
const Bsig = document.getElementById('btnSiguiente');
const Bant = document.getElementById('btnAnterior');
Bsig.addEventListener('click',() =>{
    if(cont<=10)
        cont++;
    cargarPeliculas();
})
Bant.addEventListener('click',() =>{
    if(cont>1)
        cont--;
    cargarPeliculas();
})
const cargarPeliculas = async() =>{
    try{
        //const respuesta = await fetch("https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=4b2ae049d516e12ce308186105d75193")
        const respuesta = await fetch(`https://api.themoviedb.org/3/keyword/1701/movies?include_adult=true&language=en-US&page=${cont}`,options)
        if(respuesta.status === 200){
            const json = await respuesta.json();
            let peliculas = '';
            json.results.forEach(element => {
                peliculas+=`
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${element.poster_path}">
                </div>
                <h1>${element.title}</h1>`
                console.log(element)
            });
            document.getElementById('contenedor').innerHTML = peliculas;    
        }
        else if(respuesta.status === 404){
            console.log("pusiste la llave mal")
        }
        //console.log(json);

    }catch(error){
        console.log("nose se pudo abrir");
    }   
}
cargarPeliculas();