//retrieving data of items previously added -- if there is an error or data is null, it is reset to an empty array
var itemData;
try {
  itemData = JSON.parse(localStorage.getItem('itemData'));
}catch {
  itemData = [];
}
if (itemData == null || itemData == 'null') {
  itemData = [];
}

//creating button to show itemdata in correct format
var showBtn = createBtn('btn btn-success btn-xs', '10px', null, 'Show Float List');
showBtn.addEventListener('click', function() {
  var showText = '';
  for (item of itemData) {
    try {
      showText += item + '\n';
    }catch {
      //something wrong or can't be added
    }
  }
  (showText === '') ? alert('No floats added') : alert(showText);
});
document.querySelector('div.col-md-8.col-sm-12.col-xs-12.col-md-offset-2.col-sm-offset-0.col-xs-offset-0').appendChild(showBtn);

//creating button that will reset itemdata to nothing
var resetBtn = showBtn = createBtn('btn btn-success btn-xs', '10px', null, 'Clear Float List');
resetBtn.addEventListener('click', function() {
  localStorage.setItem('itemData', '');
  itemData = [];
  addBtns();
});
document.querySelector('div.col-md-8.col-sm-12.col-xs-12.col-md-offset-2.col-sm-offset-0.col-xs-offset-0').appendChild(resetBtn);

//adding float buttons
addBtns();

//function to create buttons with specific properties
function createBtn(className, marginLeft, background, innerHTML, spanInnerHTML, spanBackground) {
  var btn = document.createElement('button'), span = document.createElement('span');
  if (spanInnerHTML) span.innerHTML = spanInnerHTML;
  if (spanBackground) span.style.background = spanBackground;
  btn.appendChild(span);

  if (innerHTML !== null) btn.innerHTML = innerHTML;
  if (className !== null) btn.className = className;
  if (marginLeft !== null) btn.style.marginLeft = marginLeft;
  if (background !== null) btn.style.background = background;

  return btn;
}

//function to clear float buttons
function clearBtns(index) {
  var floatBtns = document.querySelectorAll('button.andersonp196');
  if (index == 'all') {
    for (floatBtn of floatBtns) {
      floatBtn.parentNode.removeChild(floatBtn);
    }
  }else {
    floatBtns[index].parentNode.removeChild(floatBtns[index]);
  }
}

//function to add float buttons
function addBtns() {
  clearBtns('all');
  var itemDivs = document.querySelectorAll('div.item-solo');

  for (div of itemDivs) {
    //checking what itemdata would be for each item
    var tempInfo = `${div.querySelector('div.text-muted.text-center').innerText.replace('Wear: ', '')}++${div.querySelector('div.panel-heading.item-title').innerText}++${div.querySelector('span.item-price-display').innerText}`, floatBtn;
    //if itemdata already contains that itemdata the button will be the red 'remove float' variety instead of green 'add float'
    (itemData.includes(tempInfo)) ? floatBtn = createBtn('btn btn-success btn-xs added andersonp196', '0.1px', null, 'Remove Float') : floatBtn = createBtn('btn btn-success btn-xs andersonp196', '0.1px', null, 'Add Float');

    //when button is clicked, it will toggle display and either add or remove float
    floatBtn.addEventListener('click', function() {
      var info = `${this.parentNode.parentNode.parentNode.parentNode.querySelector('div.text-muted.text-center').innerText.replace('Wear: ', '')}++${this.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('div.panel-heading.item-title').innerText}++${this.parentNode.parentNode.parentNode.querySelector('span.item-price-display').innerText}`;
      if (!this.classList.contains('added')) {
        //if the float has not been added yet
        this.classList.add('added');
        this.innerHTML = 'Remove Float';
        //this.style.background = 'linear-gradient(rgb(155, 26, 26) 5%, rgb(62, 15, 15) 95%)';
        //this.style.background = 'linear-gradient(rgb(90, 18, 57) 5%, rgb(36, 43, 11) 95%)';
        itemData.push(info);
      }else {
        //if the float has previously been added
        this.classList.remove('added');
        this.innerHTML = 'Add Float';
        //this.childNodes[0].style.background = 'linear-gradient(rgb(0, 87, 133) 5%, rgb(3, 40, 80) 95%)';
        //this.style.background = 'linear-gradient(rgb(0, 40, 121) 5%, rgb(20, 24, 5) 95%)';
        itemData.splice(itemData.indexOf(info), 1);
      }
      localStorage.setItem('itemData', JSON.stringify(itemData));
    });

    div.querySelector('button.btn.btn-success.btn-xs.addToCartButton').parentNode.appendChild(floatBtn);
  }
}
