const fetchImage = () => {

  axios.defaults.headers.common['x-api-key'] = 'dfde1420-ea25-435f-adfe-6ec087c162f1';

  axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit: 1, size: 'full' } })
    .then((res) => {

      if (res.status !== 200) {
        // handle client side error message for if status is anything other than 200 but not a request error
      } else {
        const img = res.data[0].url;
        if (img === undefined) {
          // error handling for no image result
        } else {
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

  // fetch image on load
  fetchImage();

  // get a new kitty on button click
  document.getElementById('new-kitty-pls').addEventListener('click', () => {
    document.getElementsByTagName('img')[0].remove();
    fetchImage();
  });

  // username variables
  const storedUserName = localStorage.getItem('receivedName');
  let userName =  storedUserName ? storedUserName : 'Friend';

  // get initial greeting
  const getGreeting = () => {
    document.getElementById("greeting").innerHTML  = `Hello, ${userName}. Here's a cute kitty for you!`;
  };
 
  getGreeting();

  // change and update name
  const saveName = () => {
    localStorage.setItem('receivedName', userName);
  };

  const changeName = () => {
    userName = document.getElementById("name-input").value;
    saveName();
    getGreeting();
  };

  document.getElementById("name-form").addEventListener('submit', function(e) {
    e.preventDefault();
    changeName();
  });

  // toggle settings
  const toggleSettings = () => {
    document.getElementById("settings").classList.toggle("settings-open");
  };

  document.getElementById("settings-button").addEventListener('click', toggleSettings);

  // colour picker settings
  const storedColor = localStorage.getItem('receivedColor');
  let color =  storedColor ? storedColor : '#FFFFF';

  const setColor = () => {
    console.log('color:', color)
    const body = document.getElementsByTagName('body')[0];
    const settings = document.getElementById('settings-button-container');
    body.setAttribute('style', `background-color: ${color};`);
    settings.setAttribute('style', `background-color: ${color};`);
  };
 
  setColor();

  const saveColor = () => {
    localStorage.setItem('receivedColor', color);
  };

  const changeColor = (buttonColor) => {
    color = buttonColor;
    saveColor();
    setColor();
  };

  const colorButtons = document.getElementsByClassName('color-button');

  for (let button of colorButtons) {
    console.log('button:', button)
    button.addEventListener('click', (e) => {
      console.log('e:', e)
      changeColor(e.target.value);
    });
  }
};