function redirect() {
  setTimeout(myURL, 3000);
  var result = document.getElementById('result');
  result.innerHTML = '<b> The page will redirect after delay of 5 seconds';
}

function myURL() {
  document.location.href = 'index.html';
}

redirect();
