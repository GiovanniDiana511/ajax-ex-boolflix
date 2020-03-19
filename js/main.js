$(document).ready(function(){

    var source = $("#template").html();             // Prendiamo il template in lettura e lo asssociamo ad una variabile
    var template = Handlebars.compile(source);      // Compiliamo la variabile assegnata in precedenza e la riassegniamo a sua volta

    $("#button-search").click(function () {         // Al click del tasto parte la funzione
        cerca();
    });

    $('#input-text').keypress(function(event) {             // Alla pressione di tasti nel box, parte un evento
       if(event.key == "Enter") {                           // Se il tasto è INVIO
           if($('#input-text').val().trim().length == 0) {  // Se il valore in lettura del box, togliendo gli spazi ha una lunghezza pari a 0, allora;
               alert('Inserisci un testo da cercare');
           } else {                                         // Altrimenti, parte la funzione
               cerca();
           }
       }
   });

    function cerca() {

        var valoreInput = $("#input-text").val();           // Assegniamo il valore in lettura ad una variabile

        $.ajax({

            url: "https://api.themoviedb.org/3/search/movie?api_key=ac276298d3559f44db38fabbb3f9c6eb&language=en-US&page=1&include_adult=false&query=" + valoreInput, // Completiamo l'url con la query dell'utente
            method: 'GET',
            success: function (data) {
                var films = data.results;
                //console.log(films);
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    //console.log(film);
                    var dataApi = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: film.vote_average,
                        stella: ''
                    }

                    dataApi.voto = Math.round(dataApi.voto/2);
                    for (var x = 1; x <= 5; x++) {

                        if(x <= dataApi.voto) {                         // Se la stella che stampo è minore del voto allora è piena
                            var star = '<i class="fas fa-star"></i>';
                            dataApi.stella += star;
                        } else {                                        // E' una stella vuota
                            var star = '<i class="far fa-star"></i>';
                            dataApi.stella += star;
                        }

                    }
                    var templateFull = template(dataApi);
                    $(".container-inner.result").append(templateFull);
                }
            },
            error: function (err) {
                alert('Perché non provi a scrivere qualcosa?');
            }
        });
        
        $("#input-text").val("");
        $(".container-inner.result").html("");
    }


});
