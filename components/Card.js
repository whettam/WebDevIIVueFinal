// Matt Ballard
// 5/14/2023

// Bootstrap card that will show the highlights for each movie and add buttons for adult or child
// obj is a placeholder for the "movies" array in scripts.js
export default {
    template: `
    <div class="card bg-warning p-1 m-5 border border-dark custom-shadow" style="width: 30rem;">
  <img v-bind:src="obj.img" class="card-img-top border border-dark" alt="...">
  <div class="card-body d-flex flex-column justify-content-between">
    <div>
      <h5 class="card-title movie-title-text text-center">{{obj.title}}</h5>
      <p class="card-text text-center">{{obj.overview}}</p>
    </div>
    <div class="d-flex flex-column">
      <a v-on:click="addAdult" class="btn m-2 p-2 btn-dark btn-ticket btn-lg movie-btn-text">Add Adult</a>
      <a v-on:click="addChild" class="btn m-2 p-2 btn-dark btn-ticket btn-lg movie-btn-text">Add Child</a>
    </div>
  </div>
</div>

    `,
    props: ["obj"],
    // When button is clicked it will increment the adult or child ticket by 1 
    methods: {
      // creates function addAdult which is called upon in this card. 
      // Incremenets adultcount by 1
      // Using emit we declare a term(adultclicked) that we can call upon to emit the obj to addAdultTicket(movieid which is adultclicked). 
        addAdult() {
            this.adultcount++;
            this.$emit("adultclicked", this.obj.id)
        },
        addChild(){
            this.childcount++
            // console.log(this.childcount)
            this.$emit("childclicked", this.obj.id)
        }
    },
    // 
    data() {
        return {
            adultcount: 0,
            childcount:0
        }
    }
}