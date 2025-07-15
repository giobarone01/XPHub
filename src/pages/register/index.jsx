import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "@heroui/react";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from 'react-toastify';


export default function RegisterPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username
                    }
                }
            });
            if (error) {
                console.error("Signup error:", error.message);
                toast.error("Registration failed! " + error.message);
            } else {
                toast.success("Registration completed successfully!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(ConfirmSchema, property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    };

    const setField = (property) => (value) => {
        setFormState((prev) => ({
            ...prev,
            [property]: value,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-my-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm p-4 sm:p-5 rounded-lg bg-my-black mx-auto translate-y-[-8vh]"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-center mb-5"
                >
                    <div className="flex justify-center mb-4">
                        <img src={logo} alt="Logo" className="h-12 sm:h-14" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Create Your Account</h1>
                </motion.div>

                <form onSubmit={onSubmit} noValidate className="space-y-0">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6"
                    >
                        <Input
                            isClearable
                            label="Email"
                            labelPlacement="inside"
                            name="email"
                            type="email"
                            variant="bordered"
                            value={formState.email}
                            onValueChange={setField("email")}
                            onBlur={onBlur("email")}
                            isInvalid={isInvalid("email")}
                            errorMessage={formErrors.email}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-inside text-sm sm:text-base text-white",
                                inputWrapper: "bg-white/5 border-my-purple/50 hover:border-my-cyan/50 rounded-xl transition-all duration-300",
                                input: "text-white text-sm sm:text-base",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 gap-4 mb-6"
                    >
                        <Input
                            label="First Name"
                            labelPlacement="inside"
                            name="firstName"
                            variant="bordered"
                            value={formState.firstName}
                            onValueChange={setField("firstName")}
                            onBlur={onBlur("firstName")}
                            isInvalid={isInvalid("firstName")}
                            errorMessage={formErrors.firstName}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-inside text-sm sm:text-base text-white",
                                inputWrapper: "bg-white/5 border-my-purple/50 hover:border-my-cyan/50 rounded-xl transition-all duration-300",
                                input: "text-white placeholder-zinc-500 text-sm sm:text-base",
                            }}
                        />

                        <Input
                            label="Last Name"
                            labelPlacement="inside"
                            name="lastName"
                            variant="bordered"
                            value={formState.lastName}
                            onValueChange={setField("lastName")}
                            onBlur={onBlur("lastName")}
                            isInvalid={isInvalid("lastName")}
                            errorMessage={formErrors.lastName}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-inside text-sm sm:text-base text-white",
                                inputWrapper: "bg-white/5 border-my-purple/50 hover:border-my-cyan/50 rounded-xl transition-all duration-300",
                                input: "text-white placeholder-zinc-500 text-sm sm:text-base",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-6"
                    >
                        <Input
                            label="Username"
                            labelPlacement="inside"
                            name="username"
                            variant="bordered"
                            value={formState.username}
                            onValueChange={setField("username")}
                            onBlur={onBlur("username")}
                            isInvalid={isInvalid("username")}
                            errorMessage={formErrors.username}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-inside text-sm sm:text-base text-white",
                                inputWrapper: "bg-white/5 border-my-purple/50 hover:border-my-cyan/50 rounded-xl transition-all duration-300",
                                input: "text-white placeholder-zinc-500 text-sm sm:text-base",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mb-6"
                    >
                        <Input
                            label="Password"
                            labelPlacement="inside"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            variant="bordered"
                            value={formState.password}
                            onValueChange={setField("password")}
                            onBlur={onBlur("password")}
                            isInvalid={isInvalid("password")}
                            errorMessage={formErrors.password}
                            className="w-full"
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash className="text-xl text-default-400" /> : <FaEye className="text-xl text-default-400" />}
                                </button>
                            }
                            classNames={{
                                label: "heroui-input-label-inside text-sm sm:text-base text-white",
                                inputWrapper: "bg-white/5 border-my-purple/50 hover:border-my-cyan/50 rounded-xl transition-all duration-300",
                                input: "text-white placeholder-zinc-500 text-sm sm:text-base",
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="pt-2"
                    >
                        <Button
                            type="submit"
                            className="w-full bg-my-purple hover:bg-my-purple/90 text-white font-medium py-5 flex items-center justify-center min-h-[40px]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <LoadingSpinner size="sm" className="text-white" />
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </motion.div>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center mt-6"
                >
                    <p className="text-zinc-400 text-sm sm:text-base">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-my-cyan hover:text-my-green transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
