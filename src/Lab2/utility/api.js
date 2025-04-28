import { v4 as uuidv4 } from 'uuid';  // không dùng v4 luôn cũng được vì API có sẵn id

const mapContacts = contact => {
    const { id, firstName, lastName, image, phone, email } = contact;
    return {
      id, 
      name: firstName + " " + lastName,
      avatar: image,
      phone,
      cell: phone, // cell lấy chung với phone
      email,
      favorite: Math.random() >= 0.5,
    };
};

const fetchContacts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contactsData = await response.json();

    if (contactsData && Array.isArray(contactsData.users)) {
      return contactsData.users.map(mapContacts);
    } else {
      throw new Error('Dữ liệu không hợp lệ, không có danh sách người dùng.');
    }
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu:', err.message || err);
    if (err.message.includes('502')) {
      throw new Error('Lỗi máy chủ, vui lòng thử lại sau.');
    } else if (err.message.includes('NetworkError')) {
      throw new Error('Lỗi kết nối mạng, vui lòng kiểm tra lại kết nối!');
    } else {
      throw new Error('Có lỗi xảy ra khi lấy dữ liệu, vui lòng thử lại!');
    }
  }
};

const fetchUserContacts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const userData = await response.json();
    return mapContacts(userData.users[0]);
  } catch (err) {
    console.error('Lỗi khi lấy người dùng:', err.message || err);
  }
};

const fetchRandomContacts = async () => {
  try {
    const randomResponse = await fetch('https://dummyjson.com/users');
    const randomData = await randomResponse.json();
    const randomIndex = Math.floor(Math.random() * randomData.users.length);
    return mapContacts(randomData.users[randomIndex]);
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu ngẫu nhiên:', err.message || err);
  }
};

export { fetchContacts, fetchUserContacts, fetchRandomContacts };
