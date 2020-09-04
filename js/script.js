$(document).ready(function(){

  $('#search').click(function() {

    var input = $('#input').val().toLowerCase();
    console.log(input);

    $('.container').empty();

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

            var context = {
              title: movies[i].title,
              original_title: movies[i].original_title,
              original_language: insertFlag(movies[i].original_language),
              vote_average: insertStars(movies[i].vote_average),
            }

            // save object content
            // var context = movies[i];
            var html = template(context);

            console.log(context);

            //inserimento object in html
            $('.container').append(html);
            //clear search bar
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


//FUNCTIONS


//Funzione stars
function insertStars(num) {
  var resto = num % 2;
  var stars = Math.ceil(num / 2);
  var star = '';

  for (var i = 0; i < 5; i++) {
    if (i <= stars) {
      star += '<i class="fas fa-star"></i>';
    } else if (resto != 0) {
      star += '<i class="fas fa-star-half-alt"></i>';
      resto= 0;
    } else {
      star += '<i class="far fa-star"></i>';
    };
  }

 return star;

};

//Funzione flags
function insertFlag(lingua) {

  var flag = '';

  if ( (lingua == 'it') || (lingua == 'en') ){
    flag =  '<img src="img/' + lingua + '.svg"/>';
  } else {
    flag = lingua;
  }

  return flag;

}
