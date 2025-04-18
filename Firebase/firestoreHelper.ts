import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, setDoc, QuerySnapshot } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { User, Address, Geo } from "@/components/GoalUsers";

export interface GoalData {
    text: string;
    owner: string;
    imageUri: string;
}

export async function writeToDB(data: GoalData|User, path: string, id?: string) {
    try {
      if (id) {
        const docRef = await setDoc(doc(database, path, id), data, { merge: true });
      } else {
        const docRef = await addDoc(collection(database, path), data)
      }
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

export async function readAllFromDB(collectionName: string) {
  const querySnapshot = await getDocs(collection(database, collectionName));
  if (querySnapshot.empty) {
    return null;
  } else {
    let data: User[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as User);
    });
    return data;
  }
}


export async function updateDB(id: string, collectionName: string, updateData: {[key: string]: any}) {
  try {
    await setDoc(doc(database, collectionName, id), updateData, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}