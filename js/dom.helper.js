export function insertTextToElement(id, text) {
    document.createTextNode(text);

    const element = document.querySelector(`#${id}`);

    element.innerHTML = text;
}