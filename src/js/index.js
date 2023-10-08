import {initializeApp} from 'firebase/app' ;
import {getDatabase, ref , onValue} from 'firebase/database' ;

import {
    // Untuk mendapatkan data
    getFirestore, collection , getDocs, getDoc, 
    // Untuk add firestore collection  
    addDoc,
    // Untuk menetepkan docs yang sudah ada atau membuat doc baru
    setDoc,doc 
} from 'firebase/firestore'

console.log('Hello From Bundler JS, coba rebundle') ;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBopesf1yC5BUmYOjF0FnWe3tfWwLzGdy8",
    authDomain: "dicoding-1-8dcb8.firebaseapp.com",
    databaseURL: "https://dicoding-1-8dcb8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dicoding-1-8dcb8",
    storageBucket: "dicoding-1-8dcb8.appspot.com",
    messagingSenderId: "673688133298",
    appId: "1:673688133298:web:dac078a2eedeedc88fb3ab",
    measurementId: "G-M6SML57Y0C"
};

// Initiate App 
const app =initializeApp(firebaseConfig) ; 

// Init Service FireStore
const db = getFirestore(app); 
const bookRef = collection(db, 'Books') ; 
const citiesRef = collection(db, 'cities') ;

/* ====================================================================
REALTIME DATABASE
====================================================================*/

// Init Service Realtime Database 
const dbRealtime = getDatabase() ; 
const realRf = ref(dbRealtime, 'players') ; 

// Get Root Reference without event trigger
onValue(realRf, (snapshot) => {
    console.log(snapshot.val()) ; 
});


/* ====================================================================
FIRESTORE DATABASE
====================================================================*/


try {   
    // Get document Collections From Firestore
    getDocs(bookRef)
    .then((snapshot) => {
        let books = [] ; 
        snapshot.docs.forEach((doc) => {
            books.push({...doc.data(), id: doc.id}) ; 
        });
        // console.log(snapshot.docs[1].data()) ; 
        console.log('Ini hasil data list koleksi dengan method GetDocs Firestore') ; 
        console.log(books) ;
    });
    // Get Specific Document From Collections
    const getSpesifikDoc = await getDoc(doc(bookRef, 'KB'))
    console.log('Ini data penggunakan method getDoc  : ' ) ;
    console.log(getSpesifikDoc.data()) ;  

// Add Data To Firestore's Collection
// const addData = await addDoc(colRef, {
//     author : 'samsul-1', 
//     title : 'Kehidupan seorang mualaf-1'
// }) ; 
// console.log('Data berhasil di tambahkan pada ', addData.id) ; 

// Set Docs akan membuat data baru jika tidak ditemukan id serupa, dan akan mengupdate datanya 
await setDoc(doc(bookRef, "3sbgMczF7F7us1cwPWaY"),{
    author : 'Kneck Brandon', 
    title : 'The Start Decision'
})
console.log('Data Berhasil Diubah dengan Method setDoc') ; 
    

}
catch(err) {
    console.log("Terjadi error saat menambahkan atau mengupdate data doc ke firestore ", err)
}

    