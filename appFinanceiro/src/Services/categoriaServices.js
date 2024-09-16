import { firestore } from '../../firebaseConfig'; 
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';

export const obterCategorias = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'categorias'));
  const categorias = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('Categorias obtidas:', categorias); 
  return categorias;
};

export const criarCategoria = async (categoria) => {
  await addDoc(collection(firestore, 'categorias'), categoria);
};

export const atualizarCategoria = async (id, categoria) => {
  const categoriaDoc = doc(firestore, 'categorias', id);
  await updateDoc(categoriaDoc, categoria);
};

export const deletarCategoria = async (id) => {
  const categoriaDoc = doc(firestore, 'categorias', id);
  await deleteDoc(categoriaDoc);
};

export const obterCategoriaPorId = async (id) => {
  const categoriaDoc = doc(firestore, 'categorias', id);
  const docSnapshot = await getDoc(categoriaDoc);
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};
