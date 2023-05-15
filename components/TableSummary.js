export default {
    template: `
<div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Movie</th>
      <th scope="col">Adult Tickets</th>
      <th scope="col">Children Tickets</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="movie in movies">
      <th scope="row">{{tableObj.title}}</th>
      <td>{{tableObj.totalAdultTickets}} x {{tableObj.totalAdultPrice}}</td>
      <td>{{tableObj.totalChildTickets}} x {{tableObj.totalChildPrice}}</td>
      <td>{{totalPrice}}</td>
    </tr>
  </tbody>
</table>
</div>
    `,
    props: ["tableObj"],
    methods: {
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
    data() {
        return {
            adultcount: 0,
            childcount:0
        }
    }
}