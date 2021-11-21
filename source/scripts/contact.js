function showContact() {
  document.querySelector('main').innerHTML = '';
  const styleEle = document.createElement('style');
  const style = `
    body {
        background: #dbdcd7;
    }
    
    div.card {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 80%;
        font-family: "Roboto", "sans-serif";
        border-radius: 20px;
        border-width: 0;
        box-shadow: 3px 3px 10px 0px #405262;
    }
    
    #void {
        background-color: white;
        height: 30px;
    }
    
    div.card-header {
        background-color: #fde79b;
        text-align: center;
        font-weight: bold;
        font-size: 32px;
        color: #405262;
        border-width: 0;
    }
    
    div.card-header:first-child {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    
    .contact {
        background-color: #405262;
        border-radius: 10px;
        color: white;
        width: 40%;
        padding: 2% 0 1% 0;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        margin-top: 13%;
        margin-bottom: 13%;
        font-weight: 400;
        font-size: 20px;
    }
    `;
  styleEle.innerHTML = style;
  document.querySelector('main').appendChild(styleEle);
  createContactUsCard();
}

function createContactUsCard() {
  const card = document.createElement('div');
  card.className = 'card';

  const emptyHeader = document.createElement('div');
  emptyHeader.id = 'void';
  emptyHeader.className = 'card-header';

  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = 'Customer Service';

  const body = document.createElement('div');
  body.className = 'card-body';
  const contact = document.createElement('div');
  contact.className = 'contact';
  const text = document.createElement('p');
  text.innerHTML = 'Phone: 123-456-7890<br>Email: eggcellent@gmail.com';

  contact.appendChild(text);
  body.appendChild(body);
  card.appendChild(emptyHeader);
  card.appendChild(header);
  card.appendChild(body);
}
