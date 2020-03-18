$(document).ready(function(){

    var source = $("#template").html();
    var template = Handlebars.compile(source);

    $("#button-search").click(function () {

        var valoreInput = $("#input-text").val();

        $.ajax({

            url: "https://api.themoviedb.org/3/search/movie?api_key=ac276298d3559f44db38fabbb3f9c6eb&language=en-US&page=1&include_adult=false&query=" + valoreInput,
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
                        voto: film.vote_average
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
    });



});
