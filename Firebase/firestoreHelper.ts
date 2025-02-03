import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { database } from "./firebaseSetup";

export interface goalData {
    text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data)
    } catch (e) {   
        console.error("Error adding document: ", e);
    }
    
}

// delete the goal from the database
export async function deleteFromDB(id: string, collectionName: string) {
    try {
        await deleteDoc(doc(database, collectionName, id));
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function deleteAllFromDB(collectionName: string) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        querySnapshot.forEach((document) => {
            deleteDoc(doc(database, collectionName, document.id));
        });
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}