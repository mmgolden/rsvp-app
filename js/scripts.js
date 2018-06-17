// Declare constants
const header = document.querySelector('header');
const form = document.getElementById('invitationForm');
const input = document.querySelector('input');
const ul = document.getElementById('inviteeList');
const allBtn = document.getElementById('allBtn');
const confirmedBtn = document.getElementById('confirmedBtn');
const unconfirmedBtn = document.getElementById('unconfirmedBtn');
const list = document.getElementsByTagName('LI');

// Filter confirmed and unconfirmed names
function filterNames(property, value) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].childNodes[1][property] === value) {
      list[i].style.display = 'none';
    } else {
      list[i].style.display = 'flex';
    }
  }
}

// When the form is submitted
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const li = document.createElement('li');
  const error = document.createElement('p');
  error.textContent = 'Please enter a name';
  
  if (input.value === '') {
    // If the input is empty, show an error
    header.insertBefore(error, form.nextSibling);
  } else {
    
    // Remove the error
    if (header.childNodes[4].tagName === 'P') {   
      const error = document.querySelector('header p');
      header.removeChild(error);  
    } 
    
    // Create a new element and assign a value
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }

    // Append the new element to the list item
    function appendToLi(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
    }

    appendToLi('span', 'textContent', input.value);
    appendToLi('button', 'textContent', 'Confirm');
    appendToLi('i', 'className', 'fa fa-pencil-square-o');
    appendToLi('i', 'className', 'fa fa-times-circle-o');

    // Append the list item to the unordered list
    ul.appendChild(li);

    // Clear the input
    input.value = '';
  }
});

// When an element is clicked inside the unordered list
ul.addEventListener('click', (event) => {
  // Declare constants
  const currentItem = event.target;
  const li = currentItem.parentNode;
  const ul = li.parentNode;
  const currentClass = currentItem.className;
  const currentTag = currentItem.tagName;
  
  // Remove the name
  function removeName(parent, child) {
    parent.removeChild(child);
  }
  
  // Edit the name
  function editName() {
    const input = document.createElement('input');
    const name = currentItem.previousSibling.previousSibling;
    const saveBtn = document.createElement('i');
    saveBtn.className = 'fa fa-floppy-o';
    input.type = 'text';
    input.value = name.textContent;
    li.insertBefore(input, name);
    li.removeChild(name);
    li.insertBefore(saveBtn, currentItem);
    li.removeChild(currentItem);
  }
  
  // Save the name
  function saveName() {
    const span = document.createElement('span');
    const input = currentItem.previousSibling.previousSibling;
    const editBtn = document.createElement('i');
    editBtn.className = 'fa fa-pencil-square-o';
    span.textContent = input.value;
    li.insertBefore(span, input);
    li.removeChild(input);
    li.insertBefore(editBtn, currentItem);
    li.removeChild(currentItem);
  }
  
  // Mark the name as confirmed
  function confirmName() {
    const confirmed = document.createElement('span');
    confirmed.textContent = 'Confirmed';
    confirmed.className = 'confirmed';
    li.insertBefore(confirmed, currentItem);
    li.removeChild(currentItem);
  }
  
  if (currentClass === 'fa fa-times-circle-o') {
    removeName(ul, li);
  } else if (currentClass === 'fa fa-pencil-square-o') {
    editName();
  } else if (currentClass === 'fa fa-floppy-o') {
    saveName();
  } else if (currentTag === 'BUTTON') {
    confirmName();
  }
});

// When the all button is clicked
allBtn.addEventListener('click', (event) => {
  // Change the class to active
  confirmedBtn.className = 'btn';
  unconfirmedBtn.className = 'btn';
  allBtn.className = 'btn active';
  // Display all of the list items
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'flex';
  }
});

// When the confirmed button is clicked
confirmedBtn.addEventListener('click', (event) => {
  // Change the class to active
  allBtn.className = 'btn';
  unconfirmedBtn.className = 'btn';
  confirmedBtn.className = 'btn active';
  // Only display the confirmed names
  filterNames('tagName', 'BUTTON');
});

// When the unconfirmed button is clicked
unconfirmedBtn.addEventListener('click', (event) => {
  // Change the class to active
  allBtn.className = 'btn';
  confirmedBtn.className = 'btn';
  unconfirmedBtn.className = 'btn active';
  // Only display the unconfirmed names
  filterNames('className', 'confirmed');
});