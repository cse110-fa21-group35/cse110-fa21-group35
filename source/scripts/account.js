window.addEventListener('DOMContentLoaded', init);
var userInfo = null;

async function init() {
  createOverlay();
  showSpinner();
  let fetchSuccessful = await readUserInfo();
  if (!fetchSuccessful) {
    console.log('User Info fetch unsuccessful');
    return;
  }
  showUserInfo();
  removeSpinner();
  removeOverlay();
}

function showUserInfo() {
  let today = new Date();
  let date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate() +
    ' ' +
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds();

  let header = document.querySelector('div.user-name');
  let info = document.querySelector('p.user-info');
  let day = document.querySelector('p.update-time');
  let count = 0;

  if (userInfo['recipes'] !== undefined) {
    count = Object.keys(userInfo['recipes']).length;
  }

  header.innerHTML = userInfo['name'];
  info.innerHTML = info.innerHTML.replace('username', userInfo['name']);
  info.innerHTML = info.innerHTML.replace('userEmail', userInfo['email']);
  info.innerHTML = info.innerHTML.replace('userid', userID);
  info.innerHTML = info.innerHTML.replace('XX', count);
  day.innerHTML = day.innerHTML.replace('DATE', date);
}
