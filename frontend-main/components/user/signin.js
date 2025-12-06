import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { login } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from "next/router";

const PRIVATE_API_URL = process.env.NEXT_PUBLIC_USER_API_URL;

export default function SignIn() {
    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${PRIVATE_API_URL}/api/user/login`, values);
                console.log('values', response.data.data.user);
                dispatch(login({ token: response.data.data.token, user: response.data.data.user }));
                toast.success('Signed in successfully')
                router.push('/shop')
            } catch (error) {
                console.log('error', error.response.data.msg);
                toast.error(error.response.data.msg)
            }
        }
    });

    return (
        <div className="container small-container mt-5" style={{ maxWidth: '500px' }}>
            <h1 className="my-3 text-center">Sign In</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback d-block">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="invalid-feedback d-block">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="d-grid gap-2 mb-3">
                    <button type="submit" id="signInButton" className="btn btn-primary btn-block">
                        Sign In
                    </button>
                </div>
            </form>
            <div className="text-center">
                New customer? <a href="/sign-up">Create your account</a>
            </div>
        </div>
    );
}
