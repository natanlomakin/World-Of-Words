export function appendChildToElementBySelectorOrElem(selectorOrElement, childElement, childContent) {
    let element;
    const typeInserting = typeof selectorOrElement;

    if (typeInserting === "string") {
        element = document.querySelector(selectorOrElement);
    } else if (typeInserting && selectorOrElement.className?.length >= 0) {
        element = selectorOrElement;
    }

    if (element && childElement) {
        

        if (childContent) {
            insertTextToElement(childElement, childContent);
        }

        element.appendChild(childElement);

        console.log(element, selectorOrElement, childElement, childContent);
    }
}

// TODO reuse by selector
export function appendChildToElementById(id, childElement) {
    const element = document.querySelector(`#${id}`);

    if (element) {
        element.appendChild(childElement);
    }
}

export function insertTextToElement(selectorOrElement, text) {
    document.createTextNode(text);

    let element;
    const typeInserting = typeof selectorOrElement;

    if (typeInserting === "string") {
        element = document.querySelector(selector);
    } else if (typeInserting && selectorOrElement.className?.length >= 0) {
        element = selectorOrElement;
    }

    if (element && text) {
        element.appendChild(document.createTextNode(text));
        // element.innerHTML = text;// this replaces all element content with new html/text this function called insert
    }
}

export const commonIds = {
    mainContent: 'main-content',
    dataTable: 'data-table'
};