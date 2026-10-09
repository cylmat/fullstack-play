import { AuthContext } from '#front/providers/AuthProvider.js';
import { useContext, useEffect } from 'preact/hooks';
import './login.scss'

export function Login() {
    const { login } = useContext(AuthContext);

    const handleButtonClick = async (username: string) => {
        await login(username);
    }

    return (
        <div class="login border p-2 d-flex justify-content-between" style={{ width: '200px' }}>
            <button class="cursor-pointer" onClick={() => handleButtonClick('user-username')}>
                <h2>USER</h2>
            </button>

            <button class="cursor-pointer" onClick={() => handleButtonClick('admin-username')}>
                <h2>ADMIN</h2>
            </button>
        </div>
    )
}
