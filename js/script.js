$(document).ready(function(){

  $('#search').click(function() {

    var input = $('#input').val();
    console.log(input);

    //inizio ajax
    $.ajax(
      {
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
          api_key: 'a37d25ddedf8f63da854e0a07d06f5f1',
          query: input,
          language: 'it-IT',
        },
        success: function(risposta){

          var movies = risposta.results;

          // loop to get objects
          for ( var i = 0 ; i < movies.length; i++) {

            console.log(movies);

            var source = $('#movie-template').html();
            var template = Handlebars.compile(source);

            // var context = {
            //   title: movies[i].title,
            //   original_title: movies[i].original_title,
            //   original_language: movies[i].original_language,
            //   vote_average: movies[i].vote_average,
            // }

            // save object content
            var context = movies[i];
            var html = template(context);

            console.log(context);

            //inserimento object in html
            $('.container').append(html);

            input = $('#input').val('');

          }

        },
        'error':function(){
          alert('errore!');
        }
      }
    );
     //fine ajax
  });


});
