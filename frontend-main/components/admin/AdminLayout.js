import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminLayout = ({ children }) => {
    const { user, isAuthenticated, isInitialized } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (isInitialized) {
            if (!isAuthenticated || !user?.isAdmin) {
                router.push('/sign-in');
            }
        }
    }, [isAuthenticated, user, router, isInitialized]);

    if (!isInitialized || !isAuthenticated || !user?.isAdmin) {
        return null; 
    }

    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
                <h3>Admin Panel</h3>
                <ul className="nav flex-column mt-4">
                    <li className="nav-item mb-2">
                        <Link href="/admin/dashboard" className="nav-link text-white">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/products" className="nav-link text-white">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/users" className="nav-link text-white">
                            Users
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link href="/admin/orders" className="nav-link text-white">
                            Orders
                        </Link>
                    </li>
                    <li className="nav-item mt-5">
                        <Link href="/" className="nav-link text-white">
                            Back to Store
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex-grow-1 p-4 bg-light">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
