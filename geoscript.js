console.log('Geolocation Demo');
const geoBtn = document.querySelector('#geoBtn');
const statusParagraph = document.querySelector('.status');

geoBtn.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    console.log('We have a location');

    statusParagraph.innerHTML = 'Fetching position...';
    navigator.geolocation.getCurrentPosition(onSuccess, (error) => {
      statusParagraph.innerHTML =
        'Sorry! Something went worng.' + '<br>' + error.message;
    });
  } else {
    console.log('No location found');
    statusParagraph.innerHTML = 'No location found';
  }
});

async function onSuccess(pos) {
  statusParagraph.innerHTML = `Got position... Looking for adress!`;
  console.log('Current position is: ', pos);
  const address = await lookupPosition(
    pos.coords.latitude,
    pos.coords.longitude
  );
  if (address) {
    showAdress(address);
  }
}

async function lookupPosition(lat, long) {
  //   const url = `https://geocode.xyz/${lat},${long}?geoit=json`;
  try {
    const res = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json&auth=446968249876491397676x26597`
    );
    const data = await res.json();
    if (data.error) {
      statusParagraph.innerHTML =
        "Couldn't get position." + '<br>' + error.message;
      return null;
    }
    console.log(data);
    return data;
  } catch (error) {
    statusParagraph.innerHTML = "Couldn't get position. " + error.message;
    return null;
  }
}

function showAdress(address) {
  statusParagraph.innerHTML = `Country: ${address.country} <br> 
City: ${address.city} <br>
Address: ${address.staddress}`;
}
