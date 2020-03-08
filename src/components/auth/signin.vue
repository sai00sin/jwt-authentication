<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="submit">
          <button type="submit" >Submit</button>
        </div>
      </form>
          <!-- Container where we'll display the user details -->
          <div class="quickstart-user-details-container">
            Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
            <div>Firebase auth <code>currentUser</code> object value:</div>
            <pre><code id="quickstart-account-details">null</code></pre>
          </div>


    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        console.log('q234')
        const formData = {
          email: this.email,
          password: this.password,
        }
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          if (formData.email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (formData.password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then(res => {
              console.log(res)
              this.isSignedIn()
            })
            .catch(function(error) {
              console.log(error)
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
              // [END_EXCLUDE]
            });
            // [END authwithemail]
        }
      },
      isSignedIn() {
        console.log(12345678)
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
          }
        });
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>