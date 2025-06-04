import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "@heroui/react";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
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
                alert("Signing up error 👎🏻! " + error.message);
            } else {
                alert("Signed up 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-my-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 rounded-lg bg-my-black"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-center mb-8"
                >
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="h-15"/>
                    </div>

                    <h1 className="text-3xl font-bold mb-2 text-white">Create Your Account</h1>
                </motion.div>

                <form onSubmit={onSubmit} noValidate className="space-y-0">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-1"
                    >
                        <Input
                            isClearable
                            label="Email"
                            labelPlacement="outside"
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
                                label: "heroui-input-label-outside text-my-cyan",
                                inputWrapper: "bg-my-black border-my-purple",
                                input: "text-white placeholder-zinc-500",
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
                            labelPlacement="outside"
                            name="firstName"
                            variant="bordered"
                            value={formState.firstName}
                            onValueChange={setField("firstName")}
                            onBlur={onBlur("firstName")}
                            isInvalid={isInvalid("firstName")}
                            errorMessage={formErrors.firstName}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-outside text-my-cyan",
                                inputWrapper: "bg-my-black border-my-purple",
                                input: "text-white placeholder-zinc-500",
                            }}
                        />

                        <Input
                            label="Last Name"
                            labelPlacement="outside"
                            name="lastName"
                            variant="bordered"
                            value={formState.lastName}
                            onValueChange={setField("lastName")}
                            onBlur={onBlur("lastName")}
                            isInvalid={isInvalid("lastName")}
                            errorMessage={formErrors.lastName}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-outside text-my-cyan",
                                inputWrapper: "bg-my-black border-my-purple",
                                input: "text-white placeholder-zinc-500",
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
                            labelPlacement="outside"
                            name="username"
                            variant="bordered"
                            value={formState.username}
                            onValueChange={setField("username")}
                            onBlur={onBlur("username")}
                            isInvalid={isInvalid("username")}
                            errorMessage={formErrors.username}
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-outside text-my-cyan",
                                inputWrapper: "bg-my-black border-my-purple",
                                input: "text-white placeholder-zinc-500",
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
                            labelPlacement="outside"
                            name="password"
                            type="password"
                            variant="bordered"
                            value={formState.password}
                            onValueChange={setField("password")}
                            onBlur={onBlur("password")}
                            isInvalid={isInvalid("password")}
                            errorMessage={formErrors.password}
                            description="At least 8 characters with uppercase, lowercase and number"
                            className="w-full"
                            classNames={{
                                label: "heroui-input-label-outside text-my-cyan",
                                inputWrapper: "bg-my-black border-my-purple",
                                input: "text-white placeholder-zinc-500",
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
                            className="w-full bg-my-purple hover:bg-my-purple/90 text-white font-medium py-5"
                        >
                            Sign Up
                        </Button>
                    </motion.div>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center mt-6"
                >
                    <p className="text-zinc-400">
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
