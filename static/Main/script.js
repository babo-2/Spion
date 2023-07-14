
var buttonsData = [
    {
      name: 'Ort',
      items: ['Bauernhof', 'Parkplatz', 'Baustelle'],
      activated: false,
    },
    {
      name: 'Land',
      items: ['Deutschland', 'Frankreich', 'Russland'],
      activated: false,
    },
    {
      name: 'Stadt',
      items: ['München', 'Paris', 'Washington'],
      activated: false,
    },
    {
      name: 'Person',
      items: ['John Cina', 'Scholz', 'Washington'],
      activated: false,
    }
  ];

function set_data(data){
   var dataw = JSON.parse(data.replaceAll("&#34;", '"').replaceAll("False", "false"))
   buttonsData = dataw
   console.log(buttonsData)
   for (var i =0;i<buttonsData.length; i++){
      addButton(buttonsData[i])
   }
}


function addButton(buttonData) {
      main_div = document.querySelector(".all_buttons")
      div = document.createElement('div');
      dropdown_text = document.createElement("span")
      dropdown_button = document.createElement("button")
      main_button = document.createElement('button');
      
      
      div.className = buttonData["name"]
      div.setAttribute("id", "group");

      dropdown_button.className = "dropdown-button"
      dropdown_text.textContent = "⏏"
      dropdown_text.className = "rotate"
      dropdown_button.appendChild(dropdown_text)
      main_button.className = "main-button"
      main_button.textContent = buttonData["name"]
      console.log(buttonData["name"], buttonData["activated"])
      if (buttonData["activated"]){
        main_button.style.backgroundColor = "green"
      }else{
        main_button.style.backgroundColor = "red"
      }
      

      main_button.addEventListener('click', function() {
          var parentElement = this.parentElement;
          db = buttonsData.find(function(dictionary) {
            return dictionary.name === parentElement.className;
          });
          db["activated"] != db["activated"]
          var color = parentElement.querySelector(".main-button").style.backgroundColor
          if (color == "red" || color == ""){
            parentElement.querySelector(".main-button").style.backgroundColor = "green"
            db["activated"] = true
          }else{
            parentElement.querySelector(".main-button").style.backgroundColor = "red"
            db["activated"] = false
          }
          save()
        });

      dropdown_button.addEventListener('click', function() {
          var parentElement = this.parentElement;
          
          if (parentElement.querySelector('.dropdown') == null || parentElement.querySelector('.dropdown').style.height === "0px"){
            parentElement.querySelector(".rotate").style.transform = 'rotate(' + 180 + 'deg)';
              dropdown = parentElement.querySelector('.dropdown')
              add = document.createElement("div")
              delete_all = document.createElement("div")
              add_text = document.createElement("button")
              delete_text = document.createElement("button")
    
              add_text.textContent = "ADD"
              add_text.style.backgroundColor = "green"
              add_text.className = "add_text"

              delete_text.className = "delete_all"
              delete_text.textContent = "DELETE ALL"
              delete_text.style.backgroundColor = "red"

              add_text.addEventListener('click', function() {
                while (true){
                  var value = prompt("Name:");
                  if (value==null ||value==""){
                    return
                  }
                            
                  db = buttonsData.find(function(dictionary) {
                    return dictionary.name === parentElement.className;
                  });

                  var items_ = db["items"]
                  if (value.length > 40){
                      alert("Name to long use under 40 letters")
                      continue
                  }
                  if (items_.some(element => element.toLowerCase() === value.toLowerCase())){
                    alert(value + " already inside " + parentElement.className)
                  }else{
                    items_.push(value)
                    break
                  }
                }
                parentElement.querySelector(".dropdown").style.height = parentElement.querySelector(".dropdown").scrollHeight + 100 + "px";
                save()
                add_item(dropdown, value, true)
              });
    
              delete_text.addEventListener('click', function() {
                var value = prompt("type confirm to confirm that you want to delete all (cannot be undone):");
                if (value!="confirm"){
                  return
                }
                
                db = buttonsData.find(function(dictionary) {
                  return dictionary.name === parentElement.className;
                });
                index = buttonsData.indexOf(db)
                buttonsData[index]["items"] = []
                
                var childNodes = parentElement.querySelector('.dropdown').childNodes;

                for (var i = childNodes.length - 3; i >= 0; i--) {
                  parentElement.querySelector('.dropdown').removeChild(childNodes[i]);
                }
                parentElement.querySelector(".dropdown").style.height = parentElement.querySelector(".dropdown").scrollHeight + 100 + "px";
                save()
              });
    
              add.appendChild(add_text)
              delete_all.appendChild(delete_text)

              dropdown = document.createElement("li")

              db = buttonsData.find(function(dictionary) {
                return dictionary.name === parentElement.className;
              });

              for (var i = 0; i < db["items"].length; i++) {
                  add_item(dropdown, db["items"][i], false)
                }

              dropdown.appendChild(add)
              dropdown.appendChild(delete_all)
              dropdown.className = "dropdown"
              if (parentElement.querySelector('.dropdown') != null){
                parentElement.querySelector('.dropdown').remove()
              }
              parentElement.appendChild(dropdown)
              parentElement.querySelector(".dropdown").style.height = parentElement.querySelector(".dropdown").scrollHeight + "px";
            
          }else{
            parentElement.querySelector(".rotate").style.transform = 'rotate(' + 0 + 'deg)';
            parentElement.querySelector(".dropdown").style.height = "0";
          }
          
      })

      div.appendChild(main_button)
      div.appendChild(dropdown_button)
      main_div.appendChild(div)
}

function add_item(dropdown, text_content, appendlast=false){
    a = document.createElement("a")
    remove = document.createElement("button")
    dropdown_item = document.createElement("div")
    
    dropdown_item.className = "container"
    a.textContent = text_content
    a.className = "Item"
    
    remove.textContent = ""
    remove.innerHTML = "<i class='fa fa-trash-o'></i>";
    remove.backgroundColor = "red"
    remove.className = "RemoveButton"

    remove.addEventListener('click', function() {
      parent_ = this.parentElement;
      var name = parent_.querySelector(".Item").textContent
      var group = parent_.parentNode.parentNode.className
      db = buttonsData.find(function(dictionary) {
        return dictionary.name === group;
      });
      db["items"] = db["items"].filter(item => item !== name);
      var childNodes = parent_.parentNode.childNodes;
      parent_.parentNode.style.height = parent_.parentNode.scrollHeight - 100 + "px";
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i] == parent_){
          parent_.parentNode.removeChild(childNodes[i]);
          break
        }
      }
      save()
      delete parent_
    })

    dropdown_item.appendChild(remove)
    dropdown_item.appendChild(a)
    if (appendlast){
      dropdown.insertBefore(dropdown_item, dropdown.childNodes[dropdown.childNodes.length-2]);
    }else{
      dropdown.appendChild(dropdown_item)
    }
    
}

function save(){
  console.log("save")
  const url = '/save';

  console.log(buttonsData)

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(buttonsData)})
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      //console.error('Error:', error);
    });
}

document.querySelector(".Start_button").addEventListener("click", function(){
  save()
  window.location.pathname = "/ready";
})

document.querySelector(".Add_group").addEventListener("click", function(){
  while (true){
    value = prompt("Group name")
    if (value == null || value == ""){
      return
    }
    if (value.length > 40){
      alert("Name to long use under 40 letters")
      continue
      }
    break
  }
  data = {}
  data["name"] = value
  data["activated"] = false
  data["items"] = []
  buttonsData.push(data)
  addButton(data)
  save()
})