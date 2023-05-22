export async function getAllData(collection) {
  const data = [];
  await adminDB
    .collection(collection)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

  return { result: data };
}
