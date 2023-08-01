import firebase_app from "./config";
import { doc, getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebase_app);

export default async function addData(colllectionName) {
	const querySnapshot = await getDocs(collection(db, colllectionName));
	let result = [];
	querySnapshot.forEach((document) => {
		result.push(document);
	});
	return result;
}
