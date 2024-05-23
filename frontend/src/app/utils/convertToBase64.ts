export function filesToBase64(files: File[]) {
  const promises = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // @ts-ignore
        const base64 = reader.result.split(',')[1];
        resolve('data:image/jpeg;base64,' + base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    promises.push(promise);
  }

  return Promise.all(promises);
}
