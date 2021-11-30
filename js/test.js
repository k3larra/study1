ref = firebase.database().ref('Test01');
ref.once("value", function(snapshot) {
            var title = snapshot.child('Title').val();
            console.log(title);
            snapshot.child('methods').forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              console.log(key,childData);
            });
            console.log(snapshot.child('methods').val());
        });

// ref.once("value", function(snapshot) {
//             var userInfo = snapshot.val();
//             console.log(userInfo);
//         });
// firebase.database().ref("Test01").update({
//                   Title:"false"
//                 });
