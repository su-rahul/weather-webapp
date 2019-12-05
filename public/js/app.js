const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')
const autoDetect = document.querySelector('#radio')

weatherForm.addEventListener('submit', (e) => {

  e.preventDefault()
  const location = search.value;

  message1.textContent = 'Fetching data...'
  message2.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error
      }
      else {
        message1.textContent = data.place
        message2.textContent = data.forecast
      }
    })
  })

})

autoDetect.addEventListener('click', (e) => {
  navigator.geolocation.getCurrentPosition(position => {

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    message1.textContent = 'Fetching data...'
    message2.textContent = ''

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

    fetch(proxyUrl + 'https://api.darksky.net/forecast/7de64b2b3eefdd7043982ca1e88d63dc/' + latitude + ',' + longitude).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error
        }
        else {
          fetch(proxyUrl + 'https://us1.locationiq.com/v1/reverse.php?key=59511a0f3dcb43&lat=' + latitude + '&lon=' + longitude + '&format=json').then((response) => {
            response.json().then(({ address: { county } }) => {
              message1.textContent = county;
              search.value = county;
            })
          })
          message2.textContent = data.daily.summary + ' It is currently ' + data.currently.temperature + ' degrees out. The high temperature is ' + data.daily.data[0].temperatureHigh + ' and the low temperature is ' + data.daily.data[0].temperatureLow + '. There is a ' + data.currently.precipProbability + '% chance of rain.'
        }
      })
    })
  })
})