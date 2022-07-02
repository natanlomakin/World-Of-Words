import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { appendChildToElementById, appendChildToElementBySelectorOrElem, commonIds, insertTextToElement } from "./dom.helper";
import { db, getCollectionRef } from "./fire";

showDataByUrlParams();


async function showDataByUrlParams() {    
    const urlParams = new URLSearchParams(location.search);
    const path = urlParams.get('path');

    if (path) {
        const splitted = path.split('/');
        
        if (splitted.length > 0) {
            const collectionName = splitted[0];
            const docs = await getCollectionDocsSnapshot(collectionName);

            console.log('----------------------');
            console.log(docs);

            if (docs.length) {

                const allHeaders = new Set();// Set only unique values
                docs.forEach(d => {
                    const docKeys = Object.keys(d);
                    console.log('docKeys: ', docKeys);
                    allHeaders.add(...docKeys);
                });

                [...allHeaders].forEach(h => {
                    const thElem = document.createElement('TH');
                    const trSelector = `#${commonIds.dataTable} thead tr`;
                    console.log(trSelector);
                    const newChildContent = h;
                    appendChildToElementBySelectorOrElem(trSelector, thElem, newChildContent);
                });

                docs.forEach(d => {
                    const docKeys = Object.keys(d);

                    const trElem = document.createElement('TR');
                    const tbodySelector = `#${commonIds.dataTable} tbody`;
                    console.log(tbodySelector);
                    appendChildToElementBySelectorOrElem(tbodySelector, trElem, null);
                    
                    docKeys.forEach(k => {
                        const tdElem = document.createElement('TD');
                        // const trSelector = `#${commonIds.dataTable} tbody tr`;// find needed tr by index ??
                        console.log(trElem);
                        const newChildContent = d[k];
                        appendChildToElementBySelectorOrElem(trElem, tdElem, newChildContent);
                    });
                });
            }
            
            // TODO: on changes need to update page
            listenToFirestoreChnagesByCollectionNameOrPath(collectionName);s
        }
    }
}

async function getCollectionDocsSnapshot(collName) {
    const collectionRef = getCollectionRef(collName);
    const querySnapshot = await getDocs(collectionRef);
    const docs = [];
    querySnapshot.forEach(doc => {
        docs.push(doc.data());
    });
    console.log(querySnapshot);
    return docs;
}

let unsubscribeFireChanges;
// TODO: make separate method for doc and path, this is only for collections
function listenToFirestoreChnagesByCollectionNameOrPath(collNameOrPathToDoc) {
    if (!collNameOrPathToDoc) {
        return;
    }

    const collRef = collection(db, collNameOrPathToDoc);
    unsubscribeFireChanges = onSnapshot(
        collRef,
        (collection) => {
            // TODO: on changes need to update page
            console.log("Current data: ", collection.docs.map(d => d.data()));
        }
    );
}


// TODO: check why not working
window.addEventListener('beforeunload', () => {
    alert(';');
    typeof unsubscribeFireChanges === 'function' && unsubscribeFireChanges();
    console.log(
        (
            typeof unsubscribeFireChanges === 'function' && unsubscribeFireChanges()
        )
        ? 'unsubscribed'
        : 'not unsubscribed'
    );
});
