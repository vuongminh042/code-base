import { joiResolver } from "@hookform/resolvers/joi"
import { useMutation } from "@tanstack/react-query"
import { message } from "antd"
import axios from "axios"
import Joi from "joi"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type FormData = {
    name: string,
    price: number,
    image: string,
    description: string
}

const productSchema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().required().positive().messages({
        "number.base": "Must be a number"
    }),
    image: Joi.string(),
    description: Joi.string()
})

const ProductAdd = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: joiResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            image: "",
            description: ""
        }
    })

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post('http://localhost:3000/products', formData)
            return response.data
        },
        onSuccess: () => {
            message.success('Add Successful')
            navigate('/products')
        },
        onError: (error) => {
            message.error('Add Failed' + error.message)
        }
    })

    const onSubmit = (formData: FormData) => {
        mutation.mutate(formData);
    }

    return (
        <div>
            <h1>Product Add</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" {...register('name', { required: true, minLength: 3 })} />
                    {errors?.name && <div id="name" className="form-text text-danger">{errors?.name?.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" {...register('price', { required: true })} />
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

export default ProductAdd