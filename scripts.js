// Matt Ballard
// 5/14/2023

// Importing componenets 
import Card from "./components/Card.js";
import TableSummary from "./components/TableSummary.js"

// Beginning of Vue app
let myapp = {
    data() {
        // Variables that will be useable in my index.html file.
        // The majority are 0 or blank(array) because they will be updated depending on what the user does. 
        // adultPrice and childPrice are set because they won't change
        return {
            title: "Now Playing",
            movies: [],
            totalMovies: 0,
            totalAdultTickets: 0,
            totalChildTickets: 0,

            adultPrice: 6.99,
            childPrice: 4.99,
            totalAdultPrice: 0,
            totalChildPrice: 0,
            totalPrice: 0,

            showModal: false,
        }
    },
    // API call to themoviedb.org using axios
    created() {
        axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=fc318c4e6b302985855506321ed3cb88&language=en-US&page=1")
            .then(response => {
                console.log(response.data.results)
                console.log(response.data)

                // Declaring movieArray and mapping the response data to obj and index
                const movieArray = response.data.results.map((obj, index) => {

                    // getting and setting various parts of the response
                    // For each response(movie object) tmpMovie sets these properties of the object as follows. Each tmpMovie is returned and becomes one with movieArray.
                    let tmpMovie = {
                        id: index,
                        title: obj.title,
                        img: "https://image.tmdb.org/t/p/w500/" + obj.poster_path,
                        overview: obj.overview,
                        adultSelected: 0,
                        childSelected: 0
                    }
                    return tmpMovie
                })
                // Add/remove to the second number to increase/decrease the number of movies in the array.
                // My previously blank array "movies" in data() is now filled with the first three elements from movieArray because of .slice()
                this.movies = movieArray.slice(0, 3);

            })
            .catch(error => {
                console.log(error);
            });
    },

    // creating variables to be used in the index.html for componenets
    components: {
        card: Card,
        sumtable: TableSummary
    },
    computed: {
        // Filters the movies array so that only movies with adult or child selected greater than 0 with be added.
        // Used as the basis for if/conditional statements in index.html
        selectedMovies() {
            return this.movies.filter(movie => movie.adultSelected > 0 || movie.childSelected > 0);
        },
    },
    methods: {
        // Updates all the adult movie variables. Adds tickets, calculatates price for adults and subtotal.
        addAdultTicket(movieid) {
            // Increments totalMovies and totalAdultTickets by 1 when function is run 
            this.totalMovies++
            this.totalAdultTickets++
            // Calculates total adult movie price and sets the decimal places to 2 digits
            this.totalAdultPrice = (this.adultPrice * this.totalAdultTickets).toFixed(2)

            // this.movies[movieid].selected = this.movies[movieid].selected || 0

            // Incrementing adultSelected by 1 for the selected movie
            this.movies[movieid].adultSelected++

            console.log("adult ticket: " + this.movies[movieid].adultSelected)

            // Calculating total price. totalPrice wasn't working unless parseFloat(converts to floating point number) was added. parseFloat should need to be added if any of these were declared as 'strings', but they've always been 'ints'. Perhaps you can help me understand why. 
            this.totalPrice = (parseFloat(this.totalAdultPrice) + parseFloat(this.totalChildPrice)).toFixed(2)
        },
        addChildTicket(movieid) {
            this.totalMovies++
            this.totalChildTickets++

            this.totalChildPrice = (this.childPrice * this.totalChildTickets).toFixed(2)

            // this.movies[movieid].selected = this.movies[movieid].selected || 0
            this.movies[movieid].childSelected++
            console.log("child ticket: " + this.movies[movieid].childSelected)

            console.log(movieid)

            this.totalPrice = (parseFloat(this.totalAdultPrice) + parseFloat(this.totalChildPrice)).toFixed(2)
        },
        // Essentially is an undo button for addAdultTicket

        removeAdultTicket(movieid) {
            if (this.movies[movieid].adultSelected > 0) {
                this.totalMovies--
                this.movies[movieid].adultSelected--
                this.totalAdultTickets--
                this.totalPrice = (this.totalPrice - this.adultPrice).toFixed(2)
                this.totalAdultPrice = (this.totalAdultPrice - this.adultPrice).toFixed(2)
            }
        },
        removeChildTicket(movieid) {
            if (this.movies[movieid].childSelected > 0) {
                this.totalMovies--
                this.movies[movieid].childSelected--
                this.totalChildTickets--
                this.totalPrice = (this.totalPrice - this.childPrice).toFixed(2)
                this.totalChildPrice = (this.totalChildPrice - this.childPrice).toFixed(2)
            }
        },
        // Removes all tickets when the button it's tied to is clicked
        removeAllTickets(movieid) {
            // Saving space with movie variable
            const movie = this.movies[movieid]
            // Making sure a movie has been selected
            if (this.movies[movieid].adultSelected > 0 || this.movies[movieid].childSelected > 0) {

                // subtracting the sum of adults and children selected from the total amount of movies
                this.totalMovies -= (movie.adultSelected + movie.childSelected);
                // subtracts adultSelected from totalAdultTickets
                this.totalAdultTickets -= movie.adultSelected;
                this.totalChildTickets -= movie.childSelected;
                // zeroing out the total price for the movie selected
                this.totalPrice = (parseFloat(this.totalPrice) - (this.adultPrice * movie.adultSelected) - (this.childPrice * movie.childSelected)).toFixed(2);
                // zeroing out total adult price for movie selected
                this.totalAdultPrice = (this.adultPrice * this.totalAdultTickets).toFixed(2);
                this.totalChildPrice = (this.childPrice * this.totalChildTickets).toFixed(2);


                movie.adultSelected = 0;
                movie.childSelected = 0;

                console.log("adult Ticket: " + movie.adultSelected)
            }
        },
    },

}
// Creating Vue app(myapp) and mounting it to the div of #myapp
Vue.createApp(myapp).mount("#myapp")