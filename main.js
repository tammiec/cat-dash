// const axios = require('axios');

const fetchImage = () => {

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
          const image = document.getElementById('cat-photo');
          console.log('image:', image)
          image.src = img;
        }
      }
    }).catch((err) => {
      // handle request error here
      console.log('Fetch Error:', err);
    });

};

window.onload = () => {
  fetchImage();
};