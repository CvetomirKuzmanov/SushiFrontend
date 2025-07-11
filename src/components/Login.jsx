import { useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router";


export default function Login() {
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) {
            console.error("Error signing in with Google:", error.message);
            setErrorMsg(error.message);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            navigate("/");
        }
    };

    return (
        // <div className="flex h-screen bg-gray-100">
            <div className="flex h-screen flex-col lg:flex-row bg-gray-100 relative">
                {/* Background image for mobile */}
                <div className="absolute inset-0 block lg:hidden">
                    <img
                        src="/images/sushi3.jpg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                {/* Left Pane */}
                <div className="hidden lg:flex bg-gray-100 items-center justify-center flex-1 text-black">
                    <div className="w-full h-full flex items-center justify-center">
                        <img
                            src="/images/sushi4.jpg"
                            alt=""
                            className="object-cover w-full h-full max-w-full max-h-full "
                        />
                    </div>
                </div>
                {/* Right Pane */}
                <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center min-h-screen ">
                    <div className="max-w-md w-full p-7 bg-white/80 backdrop-blur-md rounded-lg shadow-lg mb-10  ">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Login</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Welcome Back</h1>

                        {errorMsg && (
                            <div className="mb-4 text-red-600 text-center">{errorMsg}</div>
                        )}

                        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                            <div className="w-full border rounded-md mb-2 lg:mb-0">
                                <button
                                    onClick={handleGoogleSignIn}
                                    type="button"
                                    className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                                >
                                    {/* Google SVG icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                                        <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                                        <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                                        <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                                        <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                                    </svg> Login with Google
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>or with your credentials</p>
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>
                                Don't have an account? <a href="/register" className="text-black hover:underline">Sign up here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            );
}
