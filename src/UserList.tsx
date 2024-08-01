import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import axios from "axios"
import { Link } from "react-router-dom"

type User = {
    id?: number,
    username: string,
    email: string
}

const UserList = () => {
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const response = await axios.get("http://localhost:3000/users")
                return response.data
            } catch (error) {
                console.error(error);
            }
        }
    })

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            const confirm = window.confirm('Do you want delete ?')
            if (confirm) {
                await axios.delete(`http://localhost:3000/users/${id}`)
                message.success('Delete Successful')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
        },
        onError: (error) => {
            message.error('Delete Failed' + error.message)
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
        <div>
            <h1>User List</h1>
            <Link to='/signup' className="btn btn-warning">Sign Up</Link>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user: User, index: number) => {
                        return (
                            <tr key={index}>
                                <td scope="col">{index + 1}</td>
                                <td scope="col">{user.username}</td>
                                <td scope="col">{user.email}</td>
                                <td scope="col">
                                    <button className="btn btn-danger" onClick={() => mutation.mutate(user.id!)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default UserList