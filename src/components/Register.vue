<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="userName">Name</label>
      <div>
        <input id="userName" type="text" v-model="userName" required autofocus>
      </div>

      <label for="email" >E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required>
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>

       <div>
        <button type="submit" @click="handleSubmit">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['nextUrl'],
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (this.password === this.password_confirmation && this.password.length > 0) {
        const url = 'http://localhost:3000/auth/signup';
        this.$http.post(url, {
          userName: this.userName,
          email: this.email,
          password: this.password,
        })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('jwt', response.data.token);

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn');
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push('/');
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.password = '';
        this.password_confirmation = '';
        return alert('Passwords do not match');
      }
    },
  },
};
</script>
