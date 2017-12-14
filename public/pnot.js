'use strict';

const applicationServerPublicKey = 'BMHSuJfgy5mGp7HY86YrdPVphpVRHtkownJjuLxzi9v_5WeKMhbOTXMyb7X2m4tQOCprZnjCaTy69TISP880HgA';

const pushButton = document.querySelector('.pnot');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function initializeUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}

function updateBtn() {
  if (isSubscribed) {
    console.log('Disable Push Messaging');
  } else {
    console.log('Enable Push Messaging');
  }

  pushButton.disabled = false;
}
