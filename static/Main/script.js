
const buttonsData = [
    {
      name: 'Ort',
      items: ['Bauernhof', 'Parkplatz', 'Baustelle']
    },
    {
      name: 'Land',
      items: ['Deutschland', 'Frankreich', 'Russland']
    },
    {
      name: 'Stadt',
      items: ['München', 'Paris', 'Washington']
    }
  ];
  
function addButton(buttonData) {
      main_div = document.querySelector(".all_buttons")
      div = document.createElement('div');
      dropdown_button = document.createElement("button")
      main_button = document.createElement('button');
      
      div.className = buttonData["name"]

      dropdown_button.className = "dropdown-button"
      dropdown_button.textContent = "▼"

      main_button.className = "main-button"
      main_button.textContent = buttonData["name"]

      main_button.addEventListener('click', function() {
          var parentElement = this.parentElement;
          console.log(parentElement);
          
        });

      dropdown_button.addEventListener('click', function() {
          var parentElement = this.parentElement;
          if (parentElement.querySelector('.dropdown') == null){
              dropdown = document.createElement("ul")

              db = buttonsData.find(function(dictionary) {
                return dictionary.name === parentElement.className;
              });

              for (var i = 0; i < db["items"].length; i++) {
                a = document.createElement("a")
                dropdown_item = document.createElement("div")
                a.textContent = db["items"][i]
                dropdown_item.appendChild(a)
                dropdown.appendChild(dropdown_item)
              }
            
              dropdown.className = "dropdown"
              parentElement.appendChild(dropdown)
          }else{
            parentElement.removeChild(parentElement.querySelector(".dropdown"))
          }
      })

      //div.appendChild(dropdown)
      div.appendChild(main_button)
      div.appendChild(dropdown_button)
      main_div.appendChild(div)
}

addButton(buttonsData[0])
addButton(buttonsData[1])
addButton(buttonsData[2])