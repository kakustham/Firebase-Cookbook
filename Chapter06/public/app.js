 var config = {
    apiKey: "AIzaSyB3amU4g4smm77PGOX39meBm71rW2G2vK8",
    authDomain: "fir-cookbook.firebaseapp.com",
    databaseURL: "https://fir-cookbook.firebaseio.com",
    projectId: "fir-cookbook",
    storageBucket: "fir-cookbook.appspot.com",
    messagingSenderId: "329935171550"
 };
 firebase.initializeApp(config);

 const messaging = firebase.messaging();
 messaging.requestPermission()
     .then(() => {
         return messaging.getToken();
     })
     .then((token) => {
         console.log(token);
         document.getElementById('endpoint').innerHTML = token
         socket.emit("new_user", token);
         document.getElementById('push').onclick = function() {
             title = document.getElementById('push_title');
             payload = document.getElementById('push_message');
             console.log("About to send :" + token, " + ", "payload:", payload.value);
             console.log('sending push');
             socket.emit('pushme', {
                 endpoint: token,
                 payload: {
                   title : title.value,
                   body : payload.value
                 }
             });
         }
     })
     .catch(function(err) {
         //TODO : Implement propoer error handling
     });

 //[*] Showasing a model insteam of a notification when user is physicaly on the page.
 messaging.onMessage((notif) => {
     console.log(notif);
     var dialog = document.querySelector('dialog');
     if (!dialog.showModal) {
         dialogPolyfill.registerDialog(dialog);
     }
     document.getElementById('message').innerHTML = notif.notification.body;
     document.getElementById('title').innerHTML = notif.notification.title;
     dialog.showModal();
     dialog.querySelector('.close').addEventListener('click', () => {
         dialog.close();
     });
 });
