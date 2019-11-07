/*Dæmatími 

    document.querySelector('.form')
    element = document.createElement(tagName)
    -> element.classlist.add('className')
    -> element.addEventListener(type,method)

    document.createTextNode('..')
    .appendChild/.removeChild

*/


const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');
  const itemtext = document.querySelectorAll('.item__text');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items, _itemtext) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    for (let item of items.querySelectorAll('.item')) {
      const checkbox = item.querySelector('.item__checkbox');
      checkbox.addEventListener('click', finish);

      const itemtext = item.querySelector('.item__text');
      itemtext.addEventListener('click', edit);

      const button = item.querySelector('.item__button');
      button.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector('.form__input');
    if(input.value.length>0) {
      add(input.value);
    }
    input.value = '';
    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu

  function finish(e) {
    console.log("checkbox");
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log("itemtext");
    const { target } = e;
    const { textContent, parentNode } = target;
    parentNode.removeChild(target);

    const input = el('input','item__edit');
    input.setAttribute('type','text');
    input.setValue = textContent;
    input.addEventListener('keyup', commit);

    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(input, button);
    input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const { keyCode, target } = e;
    if(keyCode!=ENTER_KEYCODE) return;

    const { value, parentNode } = target;
    target.removeEventListener('keyup', commit);
    parentNode.removeChild(target);

    const comText = el('span','.item__text', edit);
    comText.appendChild(document.createTextNode(value));

    const button = parentNode.querySelector('.item__button');
    parentNode.insertBefore(comText, button);

  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const eToAdd = el('li', 'item');
    const checkbox = el('input','item__checkbox',finish);
    checkbox.setAttribute('type','checkbox');
    const itemtext = el('span','item__text', edit);
    itemtext.appendChild(document.createTextNode(value));
    const itembutton = el('button','item__button', deleteItem);
    itembutton.appendChild(document.createTextNode('Eyða'));

    eToAdd.appendChild(checkbox);
    eToAdd.appendChild(itemtext);
    eToAdd.appendChild(itembutton);

    items.appendChild(eToAdd);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const dItem = e.target.parentNode;
    const dCheckbox = dItem.querySelector('.item__checkbox');
    const dText = dItem.querySelector('.item__text');
    const dButton = dItem.querySelector('.item__button');

    dCheckbox.removeEventListener('click', finish);
    dText.removeEventListener('click', edit);
    dButton.removeEventListener('click', deleteItem);

    dItem.parentNode.removeChild(dItem);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    if(className) {
      element.classList.add(className);
    }
    if(clickHandler) {
      element.addEventListener('click', clickHandler);
    }
    return element;
  }

  return {
    init: init
  }
})();
