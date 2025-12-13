import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "@/components/contexts/cartContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {OrderSummary} from './orderSummary'
import { useRouter } from "next/router";

const PRIVATE_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

export default function Checkout() {
    const { cartItems } = useContext(CartContext);
    const router = useRouter()

    // Calculate Subtotal
    const SubTotal = cartItems?.items?.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    ) || 0;

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            shippingAddress: {
                city: "",
                addressLine1: "",
                phoneNumber: "",
                postalCode: "",
            },
            status: "Pending",
            PaymentMethod: "Cash on Delivery",
            items: cartItems?.items || [],
            totalAmount: SubTotal + 10,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            shippingAddress: Yup.object({
                phoneNumber: Yup.string().required("Phone number is required"),
                postalCode: Yup.string().required("Postal code is required"),
                city: Yup.string().required("City is required"),
                addressLine1: Yup.string().required("Address line is required"),
            }),
            PaymentMethod: Yup.string().required("Payment method is required"),
        }),
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post(
                    `${PRIVATE_API_URL}/api/order/create`,
                    values,
                    { headers: { "x-access-token": token } }
                );

                toast.success("Order placed successfully.");
                router.push('/my-orders')
            } catch (error) {
                console.error("Error in placing order:", error);
                toast.error(error.response?.data?.msg || "Failed to place order.");
            }
        },
    });

    return (
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <div className="row px-xl-5">
                    {/* Billing Address */}
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Billing Address</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                {/* First Name */}
                                <InputField
                                    label="First Name"
                                    name="firstName"
                                    placeholder="John"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.errors.firstName}
                                    touched={formik.touched.firstName}
                                />
                                {/* Last Name */}
                                <InputField
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Doe"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.errors.lastName}
                                    touched={formik.touched.lastName}
                                />
                                {/* Phone Number */}
                                <InputField
                                    label="Mobile No"
                                    name="shippingAddress.phoneNumber"
                                    placeholder="+123 456 789"
                                    value={formik.values.shippingAddress.phoneNumber}
                                    onChange={formik.handleChange}
                                    error={formik.errors.shippingAddress?.phoneNumber}
                                    touched={formik.touched.shippingAddress?.phoneNumber}
                                />
                                {/* Address */}
                                <InputField
                                    label="Address Line 1"
                                    name="shippingAddress.addressLine1"
                                    placeholder="123 Street"
                                    value={formik.values.shippingAddress.addressLine1}
                                    onChange={formik.handleChange}
                                    error={formik.errors.shippingAddress?.addressLine1}
                                    touched={formik.touched.shippingAddress?.addressLine1}
                                />
                                {/* City */}
                                <InputField
                                    label="City"
                                    name="shippingAddress.city"
                                    placeholder="Lahore"
                                    value={formik.values.shippingAddress.city}
                                    onChange={formik.handleChange}
                                    error={formik.errors.shippingAddress?.city}
                                    touched={formik.touched.shippingAddress?.city}
                                />
                                {/* Postal Code */}
                                <InputField
                                    label="ZIP Code"
                                    name="shippingAddress.postalCode"
                                    placeholder="12345"
                                    value={formik.values.shippingAddress.postalCode}
                                    onChange={formik.handleChange}
                                    error={formik.errors.shippingAddress?.postalCode}
                                    touched={formik.touched.shippingAddress?.postalCode}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Order Total</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <OrderSummary cartItems={cartItems} SubTotal={SubTotal} />
                            <button
                                type="submit"
                                className="btn btn-block btn-primary font-weight-bold py-3"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Reusable InputField Component
const InputField = ({ label, name, placeholder, value, onChange, error, touched }) => (
    <div className="col-md-6 form-group">
        <label>{label}</label>
        <input
            className={`form-control ${error && touched ? "is-invalid" : ""}`}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {error && touched && <small className="text-danger">{error}</small>}
    </div>
);

