$(document).ready(function(){
    var source = $("#template").html();             // Prendiamo il template in lettura e lo asssociamo ad una variabile
    var template = Handlebars.compile(source);      // Compiliamo la variabile assegnata in precedenza e la riassegniamo a sua volta

    $("#button-search").click(function () {                 // Al click del tasto parte la funzione
        if($('#input-text').val().trim().length == 0) {     // Se il valore in lettura del box, togliendo gli spazi ha una lunghezza pari a 0, allora;
            alert('Inserisci un testo da cercare');
        } else {                                             // Altrimenti, parte la funzione
            cercaTutto($("#input-text").val());
            $("#input-text").val("");
            $(".container-inner.result").html("");
        }
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

    $(".logo img").click(function(){
       $("#input-text").val("");
       $(".container-inner.result").html("");
    });



    function controllaCover(cover, predefinito) {
        if (cover == null) {
           predefinito = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kinja-img.com%2Fgawker-media%2Fimage%2Fupload%2Fs--NnsOtS20--%2FImage_Not_Found_1x_qjofp8.png&f=1&nofb=1";
        }
        return predefinito
    }
    function punteggioStella(voto, stella) {
        for (var x = 1; x <= 5; x++) {
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
                if (data.results.length == 0) {
                   alert("Film non presenti nell'archivio");
                } else {
                    var films = data.results;
                    //console.log(films);
                    for (var i = 0; i < films.length; i++) {
                        var film = films[i];
                        //console.log(film);
                        var dataApi = {
                            cover: film.poster_path,
                            emptyCover: controllaCover(film.poster_path, ""),
                            titolo: film.title,
                            titoloOriginale: film.original_title,
                            lingua: controlloLingua(film.original_language),
                            voto: Math.ceil(film.vote_average/2),
                            stella: punteggioStella(Math.ceil(film.vote_average/2), ""),
                            trama: film.overview
                        }
                        var templateFull = template(dataApi);
                        $(".container-inner.result").append(templateFull);
                    }
                }
            },
            error: function (err) {
                console.log('Error');
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
                if (data.results.length == 0) {
                   alert("Serie TV non presenti nell'archivio");
                } else {
                    var movies = data.results;
                    //console.log(movies);
                    for (var i = 0; i < movies.length; i++) {
                        var movie = movies[i];
                        //console.log(movie);
                        var dataApi = {
                           cover: movie.poster_path,
                           emptyCover: controllaCover(movie.poster_path, ""),
                           titolo: movie.name,
                           titoloOriginale: movie.original_name,
                           lingua: controlloLingua(movie.original_language),
                           voto: Math.ceil(movie.vote_average/2),
                           stella: punteggioStella(Math.ceil(movie.vote_average/2), ""),
                           trama: movie.overview
                        }
                        var templateFull = template(dataApi);
                        $(".container-inner.result").append(templateFull);
                    }
                }
            },
            error: function (err) {
               console.log('Error');
            }
        });
    }
    function cercaTutto(input){
       cercaFilm(input);
       cercaSerieTV(input);
   }
});

/*
Titolo su emptycover
*/
