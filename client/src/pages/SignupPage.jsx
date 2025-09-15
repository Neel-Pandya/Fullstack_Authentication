import { Button, Card, Container, FormControl, TextField, Typography, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'
import { registerApi } from '../api/user.api'
import useMutationHandler from '../hooks/useMutationHandler'


const SignupPage = () => {

    // const mutation = useMutation({ mutationKey: 'register', mutationFn: registerApi });

    const mutation = useMutationHandler({
        mutationFn: registerApi, successCb: (data) => {
            toast.success(data.message)

            setTimeout(() => {
                navigate('/')
            }, 1500)
        }, errorCb: (error) => toast.error(error.message)
    });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        mutation.mutate(data);

    }
    return (
        <>
            <Toaster toastOptions={{ duration: 1500 }} />
            <Container
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Card
                    sx={{
                        maxWidth: "400px",
                        width: "100%",
                        p: 3
                    }}
                    variant="outlined"
                >
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{ textAlign: "center", mb: 2 }}
                        color="primary"
                    >
                        Create Account
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSignup}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <FormControl fullWidth>
                            <TextField
                                name="name"
                                type="text"
                                label="Name"
                                placeholder="Enter Name"
                                required
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Enter email address"
                                required
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter password"
                                required
                            />
                        </FormControl>

                        <Button type="submit" variant="contained" fullWidth>
                            Create Now
                        </Button>

                        <Typography variant="body2" textAlign="center">
                            Have an account?{' '}
                            <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </>
    )
}

export default SignupPage