# app.js
const axios = require('axios');

// getData fonksiyonunu tanımlıyoruz
async function getData(userId) {
  try {
    // Kullanıcı bilgilerini çekiyoruz
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const userData = userResponse.data;

    // Kullanıcının postlarını çekiyoruz
    const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const userPosts = postsResponse.data;

    // Kullanıcı bilgileri ile postları birleştirip geri döndürüyoruz
    const combinedData = {
      id: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: userData.address,
      phone: userData.phone,
      website: userData.website,
      company: userData.company,
      posts: userPosts
    };

    return combinedData;
  } catch (error) {
    throw new Error('Veri alınamadı');
  }
}

// getData fonksiyonunu dışa aktarıyoruz
module.exports = getData;

// getData fonksiyonunu çağırıp sonucu log'layarak kontrol ediyoruz
(async () => {
  try {
    const userId = 1; // İstediğiniz user id'sini burada belirtin
    const result = await getData(userId);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
