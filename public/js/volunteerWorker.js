fetch("/volunteer/requests/checkRequests")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    self.postMessage(data.data);
  });

setInterval(() => {
  fetch("/volunteer/requests/checkRequests")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      self.postMessage(data.data);
    });
}, 50000);
