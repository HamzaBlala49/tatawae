fetch("/foundation/requests/checkRequests")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    self.postMessage(data.data);
  });

setInterval(() => {
  fetch("/foundation/requests/checkRequests")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      self.postMessage(data.data);
    });
}, 6000);
