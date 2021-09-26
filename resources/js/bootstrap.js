window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
import Echo from "laravel-echo"

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'websocketkey',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});

window.Echo.join(`online`)
    .here((users) => {
      for (var i =0 ; i <users.length ; i++)
      {
          document.getElementsByClassName('list-group')[0].innerHTML+=` 
          <li class="list-group-item id = `+users[i].id+`">`+users[i].name+` </li>
          ` ; 
      }

    })
    .joining((user) => {
       if (!document.getElementsByClassName('list-group')[0].innerHTML.includes(`<li class="list-group-item id = `+user.id+`">`+user.name+` </li>`))
       {
        document.getElementsByClassName('list-group')[0].innerHTML+=` 
        <li class="list-group-item id = `+user.id+`">`+user.name+` </li>
        `
       }
    })
    .leaving((user) => {
        document.getElementsByClassName('list-group')[0].innerHTML = document.getElementsByClassName('list-group')[0].innerHTML.replace(
            ` <li class="list-group-item id = `+user.id+`">`+user.name+` </li>`,'');
        
    })
    .error((error) => {
        console.error(error);
    });