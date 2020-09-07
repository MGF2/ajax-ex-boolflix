$(document).ready(function(){

  $('#search').click(function() {

    var input = $('#input').val().toLowerCase();
    console.log(input);
    reset();
    cercaFilm(input, 'movie');
    cercaFilm(input, 'tv');

  });

  $('#input').keyup(function(event) {

    if ( (event.keyCode == 13) || (event.which == 13) ) {

      var input = $('#input').val().toLowerCase();

      reset();
      cercaFilm(input, 'movie');
      cercaFilm(input, 'tv');
    }

  });


});


//FUNCTIONS

//Funzione cerca film
function cercaFilm(data, type) {
  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/' + type,
      method: 'GET',
      data:
      {
        api_key: 'a37d25ddedf8f63da854e0a07d06f5f1',
        query: data,
        language: 'it-IT',
      },
      success: function(risposta){

        if (risposta.total_results > 0) {
          addFilm(risposta,type);
        } else {
          noResult(type);
        }


      },
      error:function(){
        alert('errore!');
      }
    }
  );
}

//Funzione aggiungi film
function addFilm(data,type) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.results.length; i++){

   if (type == 'movie') {
     var context = {
       title: data.results[i].title,
       original_title: data.results[i].original_title,
       tipo: 'Film',
       original_language: insertFlag(data.results[i].original_language),
       vote_average: insertStars(data.results[i].vote_average),
       poster_path: poster(data.results[i].poster_path),
       overview: insertOverview(data.results[i].overview.substring(0,250))
     }
   } else {
     var context = {
       title: data.results[i].name,
       original_title: data.results[i].original_name,
       tipo: 'Serie TV',
       original_language: insertFlag(data.results[i].original_language),
       vote_average: insertStars(data.results[i].vote_average),
       poster_path: poster(data.results[i].poster_path),
       overview: insertOverview(data.results[i].overview.substring(0,250))
     }

  }
    var html = template(context);
    $('.container').append(html);

    // if (type == 'movie'){
    //   $('.film').append(html);
    // } else {
    //   $('.tv').append(html);
    // }
  }
}

//Funzione nessun risultato
function noResult(type){
  var source = $("#no-result-template").html();
  var template = Handlebars.compile(source);
  var context = {
    noResult: 'Non ci sono risultati in: ' + type
  };
  var html = template(context);
  $('.container').append(html);

}


//Funzione reset
function reset() {

  $('#input').val('');
  $('.container').empty();

}


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

//Funzione poster
function poster(src) {
  console.log(src);
  var poster = '';

  if ( src == null ) {

    poster = '<img src="img/null3.png"/>';

  } else {

    poster = '<img src="https://image.tmdb.org/t/p/w185/' + src + ' "/>';

  }

 return poster;

}

//Funzione overview
function insertOverview(text) {

  var over = "";

  if (text == "") {
    over = 'Nessuna descrizione.';
  } else {
    over = text + ' [...]';
  }

  return over;
}
