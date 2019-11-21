<template>
  <b-row class="flex-column align-items-center">
    <h5 style="width: 25rem; font-size: 1.2rem">Sign Up</h5>

    <b-card class="mt-4 shadow p-0 mb-5 bg-white" style="max-width: 30rem; border-radius: 8px !important;">
      <b-form class="" @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-2" label="Name" label-align="left" label-class="font-weight-bold pt-0" label-for="name">
              <b-form-input id="name" v-model="form.name" required></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Email" label-align="left" label-class="font-weight-bold pt-0" label-for="email">
              <b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Password" label-align="left" label-class="font-weight-bold pt-0" label-for="password" description="Passwords must contain at least six characters" >
              <b-form-input id="password" v-model="form.password" type="password" required ></b-form-input>
          </b-form-group>

          <b-button block type="submit" style="background-color: #017ED9; border: solid 1px blue">
            <b-spinner v-if="loading" small type="grow"></b-spinner>
            Signup
            </b-button>
      </b-form>
    </b-card>

    <p>Already have an account? <router-link to="/signin">Sign in</router-link></p>
  </b-row>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      },
      show: true,
      loading: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.signup()
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    signup () {
      this.loading = true
      this.$store.dispatch('signup', this.form)
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
