import { logoutApi, profileApi } from '../api/user.api'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from "react-router"
import { Avatar, Button, capitalize, Card, Container, Skeleton, Typography } from "@mui/material"
import useQueryHandler from '../hooks/useQueryHandler'
import useMutationHandler from '../hooks/useMutationHandler'
import { useAuthContext } from '../contexts/AuthContext'

const ProfilePage = () => {
    const navigate = useNavigate();
    const { setAuthToken } = useAuthContext();
    const { data, isLoading, isError } = useQueryHandler({
        queryKey: ['fetch-profile'],
        queryFn: profileApi,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 5000,
        errorCb: () => {
            navigate('/')
        }
    });

    const { mutate } = useMutationHandler({
        mutationFn: logoutApi,
        successCb: (data) => {
            setAuthToken('');
            toast.success(data.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 
        errorCb: (error) => toast.error(error.message), 
        mutationKey: ['logout']
    })

    const handleLogout = () => {
        mutate();
    }

    return (
        <>
            <Toaster />
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}>
                <Card sx={{
                    maxWidth: "400px",
                    width: "100%",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: 'wrap',
                    flexDirection: "column"
                }}>

                    {!isLoading && !isError ? (
                        <> <Avatar>{data?.data.user.name.charAt(0).toUpperCase()}</Avatar>
                            <Typography variant='h5'>{`${capitalize(data?.data.user.name)}`}</Typography>
                            <Typography variant='h6'>{`${data?.data.user.email}`}</Typography>
                            <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (<>
                        <Skeleton variant='circular' width={60} height={60} />
                        <Skeleton variant='rectangular' width={100} />
                        <Skeleton variant='rectangular' width={150} />
                        <Skeleton variant='rectangular' width={100} />
                    </>)}
                </Card>
            </Container>
        </>
    )
}

export default ProfilePage