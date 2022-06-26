import { getDocs } from "firebase/firestore";
import { insertTextToElement } from "./dom.helper";
import { getCollectionRef } from "./fire";

showDataByUrlParams();

async function showDataByUrlParams() {    
    const urlParams = new URLSearchParams(location.search);
    const path = urlParams.get('path');

    if (path) {
        const splitted = path.split('/');
        
        if (splitted.length > 0) {
            const collectionName = splitted[0];
            const docs = await getCollectionDocsSnapshot(collectionName);
            
            debugger;
            
            insertTextToElement('data-json', JSON.stringify(docs));
        }
    }
}

async function getCollectionDocsSnapshot(name) {
    const collectionRef = getCollectionRef(name);
    const querySnapshot = await getDocs(collectionRef);
    const docs = [];
    querySnapshot.forEach(doc => {
        docs.push(doc.data());
    });
    debugger;
    return docs;
}
