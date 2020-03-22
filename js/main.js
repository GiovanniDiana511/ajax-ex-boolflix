$(document).ready(function(){
    /*function controllaCover(cover) {
        if (cover == null) {
            var prova = "prova";
        }
        return prova
    }*/
    function punteggioStella(voto, stella) {
        voto = Math.ceil(voto/2);
        for (var x = 0; x <= 5; x++) {
            if (x <= voto) {
                var star = '<i class="fas fa-star"></i>';
                stella += star;
            } else {
            var star = '<i class="far fa-star"></i>';
            stella += star;
            }
        }
        return stella
    }
    function controlloLingua(lingua){
        if (lingua == "ja") {
            lingua = "jp";
        } else if (lingua == "en") {
            lingua = "us";
        } else if (lingua == "cs") {
            lingua = "cz";
        }
        return lingua
    }
    function cercaFilm(input) {

        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie",
            data: {
                api_key: "ac276298d3559f44db38fabbb3f9c6eb",
                query: input,
                language: "it-IT"
            },
            method: 'GET',
            success: function (data) {
                var films = data.results;
                //console.log(films);
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    //console.log(film);
                    var dataApi = {
                        cover: film.poster_path,
                        //emptyCover: prova,
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: controlloLingua(film.original_language),
                        voto: film.vote_average,
                        stella: punteggioStella(film.vote_average, ""),
                        trama: film.overview
                    }
                    var templateFull = template(dataApi);
                    $(".container-inner.result").append(templateFull);
                }
            },
            error: function (err) {
                alert('Perché non provi a scrivere qualcosa?');
            }
        });
    }
    function cercaSerieTV(input) {

        $.ajax({
            url: "https://api.themoviedb.org/3/search/tv",
            data: {
                api_key: "ac276298d3559f44db38fabbb3f9c6eb",
                query: input,
                language: "it-IT"
            },
            method: 'GET',
            success: function (data) {
                var movies = data.results;
                //console.log(films);
                for (var i = 0; i < movies.length; i++) {
                    var movie = movies[i];
                    //console.log(film);
                    var dataApi = {
                        cover: movie.poster_path,
                        emptyCover: '',
                        titolo: movie.name,
                        titoloOriginale: movie.original_name,
                        lingua: controlloLingua(movie.original_language),
                        voto: movie.vote_average,
                        stella: punteggioStella(movie.vote_average, ""),
                        trama: movie.overview
                    }
                    var templateFull = template(dataApi);
                    $(".container-inner.result").append(templateFull);
                }
            },
            error: function (err) {
                alert('Perché non provi a scrivere qualcosa?');
            }
        });
    }
    function cercaTutto(input){
        cercaFilm(input);
        cercaSerieTV(input);
    }

    var source = $("#template").html();             // Prendiamo il template in lettura e lo asssociamo ad una variabile
    var template = Handlebars.compile(source);      // Compiliamo la variabile assegnata in precedenza e la riassegniamo a sua volta

    $("#button-search").click(function () {         // Al click del tasto parte la funzione
        cercaTutto($("#input-text").val());
        $("#input-text").val("");
        $(".container-inner.result").html("");
    });

    $('#input-text').keypress(function(event) {             // Alla pressione di tasti nel box, parte un evento
       if(event.key == "Enter") {                           // Se il tasto è INVIO
           if($('#input-text').val().trim().length == 0) {  // Se il valore in lettura del box, togliendo gli spazi ha una lunghezza pari a 0, allora;
               alert('Inserisci un testo da cercare');
           } else {                                         // Altrimenti, parte la funzione
               cercaTutto($("#input-text").val());
               $("#input-text").val("");
               $(".container-inner.result").html("");
           }
       }
   });

});
