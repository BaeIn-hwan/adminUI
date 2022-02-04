import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbrL1cU5F9KWCUPZd3nes-5qJep_EfPkc",
  authDomain: "naniboard-d0f0d.firebaseapp.com",
  projectId: "naniboard-d0f0d",
  storageBucket: "naniboard-d0f0d.appspot.com",
  messagingSenderId: "1074355123314",
  appId: "1:1074355123314:web:12f5d189c9f8af6d513eeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
	app,
	auth
}