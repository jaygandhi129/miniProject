console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log(data);
  console.log("Push Recieved...");
  var options = {
    body: data.body,
    icon: data.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  if (Notification.permission == 'granted') {
  self.registration.showNotification(data.title, options);}
});