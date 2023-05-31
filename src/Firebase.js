import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC5l4BE2G_YHgOrWH9Fl0PKx7lc47lV8RU",
  authDomain: "arched-pier-364611.firebaseapp.com",
  projectId: "arched-pier-364611",
  storageBucket: "arched-pier-364611.appspot.com",
  messagingSenderId: "615834238963",
  appId: "1:615834238963:web:084d04759e2b15415f1c86",
  measurementId: "G-2EP6WJZJ5K"
};

 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 