import { addDoc, collection } from "firebase/firestore";
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