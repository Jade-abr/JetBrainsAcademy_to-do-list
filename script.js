var list = document.querySelector('#task-list');
var deleteIt = document.getElementsByClassName("delete-btn");
var changeIt = document.getElementsByClassName("checkbox-input");

function getValues() {
  var storedValues = localStorage.getItem('ul-task-list');
  if (!storedValues) {
    list.innerHTML = '<li>' +
      '<input type="checkbox" class="checkbox-input">' +
      ' <span class="task">Task One</span>' +
      ' <button class="delete-btn">Delete</button>' +
      '  </li>' +
      ' <li>' +
      ' <input type="checkbox" class="checkbox-input">' +
      ' <span class="task">Task Two</span>' +
      ' <button class="delete-btn">Delete</button>' +
      ' </li>' +
      '  <li>' +
      ' <input type="checkbox" class="checkbox-input">' +
      ' <span class="task">Task Three</span>' +
      '<button class="delete-btn">Delete</button>' +
      ' </li>';
  } else {
    list.innerHTML = storedValues;
  }
  afterGetValues();
}

function afterGetValues() {
  // add event listener on task at the initialization
  for (var i = 0; i < deleteIt.length; i++) {
    deleteIt[i].addEventListener("click", removeItem);
  }
  for (var j = 0; j < changeIt.length; j++) {
    changeIt[j].addEventListener("click", completeItem);
  }

  //Adds text to the list if not empty
  document.getElementById("add-task-button").addEventListener("click", function () {
    var task = document.getElementById("input-task").value;
    if (task) {
      addNewTask(task);
      document.getElementById("input-task").value = "";
    }
  });
}

function store() {
  localStorage.setItem('ul-task-list', list.innerHTML);
}

//Adds new item to the list
function addNewTask(item) {
  var list = document.getElementById("task-list");
  var newItem = document.createElement("li");
  var checkboxItem = document.createElement("input");
  checkboxItem.type = "checkbox";
  checkboxItem.classList.add("checkbox-input");
  checkboxItem.addEventListener("click", completeItem);
  newItem.appendChild(checkboxItem);
  var spanItem = document.createElement("span")
  spanItem.classList.add("task");
  spanItem.textContent = item;
  newItem.appendChild(spanItem);
  //creates remove button
  var remove = document.createElement("button");
  remove.classList.add("delete-btn");
  remove.textContent = 'Delete';
  remove.addEventListener("click", removeItem);
  newItem.appendChild(remove);
  //insert new item before the first element
  list.insertBefore(newItem, list.childNodes[0]);
  store();
}

function removeItem() {
  var item = this.parentNode;
  var parent = this.parentNode.parentNode;
  parent.removeChild(item);
  store();
}

function completeItem() {
  var item = this.parentNode;
  var childItem = this.parentNode.firstChild;
  if (item.classList.contains('completed-task-style')) {
    item.classList.remove('completed-task-style');
    childItem.removeAttribute('checked');
  } else {
    item.classList.add("completed-task-style");
    childItem.setAttribute('checked', 'true');
  }
  store();
}

getValues();
