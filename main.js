// tt0978718 no poster
// tt1285016 with poster
// apikey=5b101d64

$(document).ready(() => {
	//enter key tiggers the submit button
	$('input').keypress(function (e) {
	 var key = e.which;
	 if(key == 13)  // the enter key code
	  {
	    $('#submit-button-id').click();
	    return false;  
	  }
	});   

	//submit button calls the getAllData function
	$('#submit-button-id').click(() => {

		getAllData();

		
	})
})

// getAllData() starts
let getAllData = () => {
	

	let movieId = $('#movie-id-id').val();
	let movieName = $('#movie-title-id').val();
	let movieYear = $('#movie-year-id').val();


	console.log("requesting");

	console.log(movieId)
	console.log(movieName)
	console.log(movieYear)
	console.log(`https://www.omdbapi.com/?s=${movieName}&y=${movieYear}&i=${movieId}&apikey=5b101d64`);
// Ajax Request Starts
	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url : `https://www.omdbapi.com/?s=${movieName}&y=${movieYear}&i=${movieId}&apikey=5b101d64`,

		success: (data) => {
			$('.movie-cards-wrapper').html('');


			$('html, body').animate({
		        scrollTop: $(".movie-cards-head").offset().top
		    }, 1000);


			console.log("requesting")
			console.log(data)

			// If movie id and movie title and year all are empty
			if((movieId === '' || movieId === null) && (movieName === '' || movieName === null) && (movieYear === '' || movieYear === null)){
				let yearWarning = `<div class="alert alert-danger" role="alert">
							  No details entered.
						</div>`
			$('.movie-cards-wrapper').append(yearWarning)
			} else {
				if((movieId === '' || movieId === null) && (movieName === '' || movieName === null) && (movieYear !== '' || movieYear !== null)){
				
			 let Warning = `<div class="alert alert-danger" role="alert">
							  Unable to search movies through year alone.<br>
							  Please provide more details.
						</div>`
			$('.movie-cards-wrapper').append(Warning)
			 
			} else {
				// If movie id is entered
				if((movieId !== '' || movieId !== null) && (movieName === '' || movieName === null)) {
				if(data.Response === 'False') {
					// alert(data.Error)
					let Warning = `<div class="alert alert-danger" role="alert">
							  ${data.Error}
						</div>`
			$('.movie-cards-wrapper').append(Warning)

				} else {
					// If movie poster not available
					if(data.Poster === "N/A"){
					let tempCard = `<div class="card movie-info-card" style="width: 18rem;">
			                      <img class="card-img-top movie-card-img" src='images/dummy2.png' alt="Card image cap">
			                      <div class="card-body">
			                        <h4 class="card-title">${data.Title}</h4>
			                        <p class="card-text">Year: ${data.Year}</p>
			                        <p class="card-text">Type: ${data.Type}</p>
			                        <p class="card-text">imdbID: ${data.imdbID}</p>
			                        <p class="card-text">imdbRating: ${data.imdbRating}</p>
			                      </div>
			                    </div>`

			    $('.movie-cards-wrapper').append(tempCard)
				
			} else {
				// If movie poster is available
				let tempCard = `<div class="card movie-info-card" style="width: 18rem;">
			                      <img class="card-img-top movie-card-img" src='${data.Poster}' alt="Card image cap">
			                      <div class="card-body">
			                        <h4 class="card-title">${data.Title}</h4>
			                        <p class="card-text">Year: ${data.Year}</p>
			                        <p class="card-text">Type: ${data.Type}</p>
			                        <p class="card-text">imdbID: ${data.imdbID}</p>
			                        <p class="card-text">imdbRating: ${data.imdbRating}</p>
			                      </div>
			                    </div>`

			    $('.movie-cards-wrapper').append(tempCard)
			}
				}

				
			} else {
				// When movie title is entered
				let searchData = data.Search;

				if(data.Response === 'False') {
					let Warning = `<div class="alert alert-danger" role="alert">
							  ${data.Error}
								</div>`
					$('.movie-cards-wrapper').append(Warning)
				} else {
					for(movie of searchData) {
						// If movie poster not available
						if(movie.Poster === "N/A"){
					let tempCard = `<div class="card movie-info-card" style="width: 18rem;">
			                      <img class="card-img-top movie-card-img" src='images/dummy2.png' alt="Card image cap">
			                      <div class="card-body">
			                        <h4 class="card-title">${movie.Title}</h4>
			                        <p class="card-text">Year: ${movie.Year}</p>
			                        <p class="card-text">Type: ${movie.Type}</p>
			                        <p class="card-text">imdbID: ${movie.imdbID}</p>
			                      </div>
			                    </div>`

			    $('.movie-cards-wrapper').append(tempCard)
				
			} else {
				// If movie poster is available
				let tempCard = `<div class="card movie-info-card" style="width: 18rem;">
			                      <img class="card-img-top movie-card-img" src='${movie.Poster}' alt="Card image cap">
			                      <div class="card-body">
			                        <h4 class="card-title">${movie.Title}</h4>
			                        <p class="card-text">Year: ${movie.Year}</p>
			                        <p class="card-text">Type: ${movie.Type}</p>
			                        <p class="card-text">imdbID: ${movie.imdbID}</p>
			                      </div>
			                    </div>`

			    $('.movie-cards-wrapper').append(tempCard)
			}
					}
				}
		}
			} 
			}
			},//success ends
			beforeSend: () => {
				let Warning = `<div class="alert alert-primary" role="alert">
							  Searching for results...
								</div>`
					$('.movie-cards-wrapper').append(Warning)
			},//beforeSend ends
			complete: () => {
				$('.footer-section').css('position', 'relative');
			},//complete ends
			error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)
        }//error ends		
	})//Ajax request ends
}//getAllData ends