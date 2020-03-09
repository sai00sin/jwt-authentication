import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    user: null
  },
  mutations: {
    authUser (state, idToken) {
      state.idToken = idToken
    },
    storeUser (state, user) {
      state.user = user
    },
  },
  actions: {
    signup (ctx, authData) {
      if (authData.email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (authData.password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Create user with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
        .then(() => {
          ctx.dispatch('storeUser', authData)
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
    },
    login (ctx, authData) {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        if (authData.email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (authData.password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
          .then(res => {
            console.log(res)
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
              ctx.commit('authUser', {
                token: idToken,
                //userId: res.data.localId
              })
              // Send token to your backend via HTTPS
              // ...
            }).catch(function(error) {
              console.log(error)
              // Handle error
            });
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
    storeUser (ctx, authData) {
      firebase.database().ref('users/').push({
        email: authData.email,
        age: authData.age,
        password: authData.password,
        country: authData.country,
        hobbies: authData.hobbies,
        terms: authData.terms
      });
    },
    fetchUser (ctx) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // [START_EXCLUDE]
          console.log(ctx)
          ctx.commit('storeUser', user)
        }
        //commit('storeUser', users[0])
      });
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  },
  modules: {
  }
})