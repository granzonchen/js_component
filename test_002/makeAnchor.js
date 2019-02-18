function makeAnchor() {
    //get all the H2 heading elements
    let h2s = document.getElementsByTagName("h2");
    //create a new page elements for the menu
    let menu = document.createElement("div");
    //create a Ul element an append to the menu div
    let menuUL = document.createElement("ul");
    menu.appendChild(menuUL);
    //cycle through h2 headings
    for (let i = 0; i < h2s.length; i++) {
        //get text node of h2 element
        let itemText = h2s[i].childNodes[0].nodeValue;
        //add a list item
        let menuLi = document.createElement("li");
        //add it to the menu list
        menuUL.appendChild(menuLi);
        //the list item contains a link
        let menuLiA = document.createElement("a");
        menuLiA = menuLi.appendChild(menuLiA);
        //set the href of the link
        menuLiA.setAttribute("href", "#item" + i);
        //set the text of the link
        let menuText = document.createTextNode(itemText);
        menuLiA.appendChild(menuText);
        //create matching anchor element
        let anc = document.createElement("a");
        anc.setAttribute("name", "item" + i);
        //add anchor before the heading
        document.body.insertBefore(anc, h2s[i]);
    }
    //add menu to the top of the page
    document.body.insertBefore(menu, document.body.firstChild);
}

window.onload = makeAnchor;