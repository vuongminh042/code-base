import { joiResolver } from "@hookform/resolvers/joi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { message } from "antd"
import axios from "axios"
import Joi from "joi"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

type FormData = {
    id?: number,
    name: string,
    price: number,
    image: string,
    description: string
}

const productSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required().min(3),
    price: Joi.number().required().positive().messages({
        "number.base": `"Must be a number"`
    }),
    image: Joi.string(),
    description: Joi.string()
})

const ProductEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: joiResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            image: "",
            description: ""
        }
    })

    useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`)
                reset(response.data)
                return response.data
            } catch (error) {
                console.error(error);
                message.error('Error fetching data')
            }
        }
    })

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.put(`http://localhost:3000/products/${formData.id}`, formData)
            return response.data
        },
        onSuccess: () => {
            message.success('Update Successful')
            navigate('/products')
        },
        onError: (error) => {
            message.error('Update Failed' + error.message)
        }
    })

    const onSubmit = (formData: FormData) => {
        mutation.mutate(formData);
    }

    return (
        <div>
            <h1>Product Edit</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register('name', { required: true, minLength: 3 })} />
                    {errors?.name && <div id="name" className="form-text text-danger">{errors?.name?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" {...register('price', { required: true })} />
                    {errors?.price && <div id="price" className="form-text text-danger">{errors?.price?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" {...register('image')} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" {...register('description')}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default ProductEdit