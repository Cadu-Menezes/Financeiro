import { firestore } from '../../firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';

// Função para obter todas as categorias
export const obterCategorias = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'categorias'));
  const categorias = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('Categorias obtidas:', categorias); // Adicione este log
  return categorias;
};


// Função para criar uma nova categoria
export const criarCategoria = async (categoria) => {
  await addDoc(collection(firestore, 'categorias'), categoria);
};

// Função para atualizar uma categoria existente
export const atualizarCategoria = async (id, categoria) => {
  const categoriaDoc = doc(firestore, 'categorias', id);
  await updateDoc(categoriaDoc, categoria);
};

// Função para deletar uma categoria
export const deletarCategoria = async (id) => {
  const categoriaDoc = doc(firestore, 'categorias', id);
  await deleteDoc(categoriaDoc);
};

// Função para obter uma categoria por ID (opcional)
export const obterCategoriaPorId = async (id) => {
  const categoriaDoc = doc(firestore, 'categorias', id);
  const docSnapshot = await getDoc(categoriaDoc);
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};
