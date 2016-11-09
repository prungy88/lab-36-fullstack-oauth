'use strict';

// require('./_home.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService',  LandingController];

function LandingController($log, $rootScope, $location, authService){
  $log.debug('init landingCtrl');

  //$location.search() returns the query parameters of the url
  let query = $location.search();
  //query.token is undefined
  console.log('query', query.token);

  if(query.token){
    //setToken also puts token in localStorage
    authService.setToken(query.token)
    .then(() => {
      $location.url('/#/home');
    });
  }

  $rootScope.$on('locationChangeSuccess', () => {
    let query = $location.search();
    console.log('query', query);
    if(query.token){
      authService.setToken(query.token)
      .then(() => {
        $location.url('/#/home');
      });
    }
  });

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectURI = `redirect_uri=${__API_URL__}/api/auth/oauth_callback`;
  let googleAuthAccessType = 'access_type=offline';
  let googleAuthPrompt = 'prompt=consent';

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`;
}
