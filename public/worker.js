console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("inside push listener",data);
  console.log("Push Recieved...");
  var options = {
    body: data.body,
    icon: data.icon,
    vibrate: [100, 50, 100],
    data: {
      url: data.url
    }
  };
  if (Notification.permission == 'granted') {
    console.log("Showing notification");
  self.registration.showNotification(data.title, options);}
});

self.addEventListener("pushsubscriptionchange", event => {
  console.log("change here");
  event.waitUntil(swRegistration.pushManager.subscribe(event.oldSubscription.options)
    .then(subscription => {
      return fetch("/subscribeNotification", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          subscription
        })
      });
    })
  );
}, false);
