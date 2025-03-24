import axios from 'axios';

const UpdateUserInfo = (user) => {
    axios.get(`http://127.0.0.1:8000/api/get_user_info/${user.id}/`)
    .then(response => {
        console.log(response.data)
        localStorage.setItem('user_info', JSON.stringify(response.data))
    })
    .catch(error => {
        console.log(error)
    })
}

export default UpdateUserInfo;