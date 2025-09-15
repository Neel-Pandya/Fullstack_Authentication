import { Button, Card, Container, FormControl, TextField, Typography, Box, CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router'
import { loginApi } from '../api/user.api'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthContext } from '../contexts/AuthContext'
import useMutationHandler from '../hooks/useMutationHandler'

const LoginPage = () => {
    const navigate = useNavigate();
    const {setAuthToken, authToken} = useAuthContext();
    const { mutate, isPending } = useMutationHandler({
        mutationFn: loginApi, 
        errorCb: (error) => toast.error(error.message), 
        successCb: ({ data, message }) => {
            toast.success(message);
            setAuthToken(data.accessToken)

            setTimeout(() => {
                navigate('/chat');
            }, 1500);
        }
    })

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())
        mutate(data);
    }
    return (
        <>
            <Toaster />
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
                        Login
                    </Typography>

                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                        onSubmit={handleLogin}
                    >
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

                        <Button type="submit" variant="contained" color='info' fullWidth>
                            {isPending ? <CircularProgress size={"30px"} color='info'/> : "Login"}
                        </Button>

                        <Typography variant="body2" textAlign="center">
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
                                Create Now
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </>
    )
}

export default LoginPage
