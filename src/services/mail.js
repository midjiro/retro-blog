import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";

export async function sendEmail(data) {
  try {
    const mail = {
      from: data.email,
      to: [process.env.REACT_APP_EMAIL],
      message: {
        subject: "Contact message from retro-blog app",
        html: `<h1>Message from ${data.email}:</h1><p>${data.message}</p>`,
      },
    };

    const collectionRef = collection(db, "mails");
    await addDoc(collectionRef, mail);
  } catch (e) {
    console.error(e);
  }
}
