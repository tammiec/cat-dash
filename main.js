const fetchImage = () => {

  axios.defaults.headers.common['x-api-key'] = 'dfde1420-ea25-435f-adfe-6ec087c162f1';

  axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit: 1, size: 'full' } })
    .then((res) => {
      console.log('response:', res)

      if (res.status !== 200) {
        // handle client side error message for if status is anything other than 200 but not a request error
      } else {
        const img = res.data[0].url;
        if (img === undefined) {
          // error handling for no image result
        } else {
          // image exists - now what??
          console.log('img:', img);
          const image = document.createElement('img');
          const container = document.getElementById('photo-container');
          image.src = img;
          image.alt = 'Random image of a cat';
          container.appendChild(image);
        }
      }
    }).catch((err) => {
      // handle request error here
      console.log('Fetch Error:', err);
    });

};

window.onload = () => {
  fetchImage();

  const getNewKittyButton = document.getElementById('new-kitty-pls');

  getNewKittyButton.addEventListener('click', () => {
    const oldImg = document.getElementsByTagName('img')[0];
    oldImg.remove();
    fetchImage();
  });
};