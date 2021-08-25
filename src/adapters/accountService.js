import axios from 'axios';

const url = 'http://localhost:8080';

export default class AccountService{

    static checkInDriver(id){
        return axios.put(url + '/drivers/checkIn/' + id);
    }
    static checkOutDriver(id){
        return axios.put(url + '/drivers/checkOut/' + id);
    }
    static getDriverStatus(id){
        return axios.get(url + '/drivers/status/' + id);
    }
    static getDriverPay(id){
        return axios.get(url + '/drivers/pay/' + id);
    }
    static forgotPassword(email){
        return axios.get(url + '/users/email/' + email);
    }
}
