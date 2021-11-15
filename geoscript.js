console.log('Geolocation Demo');
const geoBtn = document.querySelector('#geoBtn');
const statusParagraph = document.querySelector('.status');

geoBtn.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    console.log('We have a location');

    statusParagraph.innerHTML = 'Fetching position...';
    navigator.geolocation.getCurrentPosition((pos) => {
      statusParagraph.innerHTML = `Got position... Looking for adress!`;
      console.log('Current position is: ', pos);
    });
  } else {
    console.log('No location found');
    statusParagraph.innerHTML = 'No location found';
  }
});
