import { axiosInstance } from "."



export const makePayment=async (token,amount)=>{
    try {
      const response=await axiosInstance.post("http://localhost:8088/api/bookings/make-payment", {
          token,
          amount,
        });
        return response.data;
    } catch (err) {
        return err.response
    }
} 

export const bookShow=async(payload)=>{
    try {
        const response = await axiosInstance.post(
          "http://localhost:8088/api/bookings/book-show",payload
        );
        return response.data
    } catch (err) {
        return err.response   
    }
}

export const getAllBookings=async ()=>{
    try {
        const response = await axiosInstance.get(
          "http://localhost:8088/api/bookings/get-all-bookings"
        );
        return response.data
    } catch (err) {
        return err.response        
    }
}