import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export interface GoalData {
    text: string;
}

export async function writeToDB(data: GoalData, collectionName: string) {
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

export async function readDocFromDB(id: string, collectionName: string) {
  try { 
    const docRef = await doc(database, collectionName, id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  }
    catch (err) {
      console.log(err)
    }
  }

  export async function updateDB(id: string, collectionName: string, updateData: {[key: string]: any}) {
    try {
      await setDoc(doc(database, collectionName, id), updateData, { merge: true });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }