<template>
  <b-row class="flex-column align-items-center">
    <h5 style="width: 25rem; font-size: 1.2rem; text-align:center">Login</h5>

    <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="max-width: 30rem; border-radius: 8px !important;">
      <b-form class="" @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-group id="input-group-1" label="Email address:" label-align="left" label-class="font-weight-bold pt-0" label-for="email">
              <b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Password:" label-align="left" label-class="font-weight-bold pt-0" label-for="password" >
              <b-form-input id="password" v-model="form.password" type="password" required ></b-form-input>
          </b-form-group>

          <b-button block type="submit" style="background-color: #017ED9; border: solid 1px blue">
            <b-spinner v-if="loading" small type="grow"></b-spinner>
            Signin
            </b-button>
      </b-form>
    </b-card>
    <p>Don't have any account? <router-link to="/signup">Sign up</router-link></p>
  </b-row>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      loading: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.signin()
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    signin () {
      this.loading = true
      this.$store.dispatch('signin', this.form)
        .then(message => {
          this.loading = false

          this.$swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000
          }).fire({
            type: 'success',
            title: message
          })
          this.$router.push('/')
        })
        .catch(errors => {
          this.loading = false
          errors.forEach(error => {
            this.$swal.mixin({
              toast: true,
              position: 'top-right',
              showConfirmButton: false,
              timer: 3000
            }).fire({
              type: 'warning',
              title: error
            })
          })
        })
    }
  }
}
</script>

<style>

</style>
