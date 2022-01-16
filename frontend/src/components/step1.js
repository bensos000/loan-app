import { useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { ACTIONS, UserContext } from "../context";
import { useForm } from "react-hook-form";

export default function Step1() {
    const navigate  = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        switch (state.step) {
            case 1:
                navigate('/', { replace: true });
                break;
            case 2:
                navigate('/step2', { replace: true });
                break;
            case 3:
                navigate('/step3', { replace: true });
                break;
            default:
                break;
        }
    }, [state, navigate]);

    const onSubmit = data => {    
        dispatch({ type: ACTIONS.UPDATE_INFOS, payload: {
                fullname: data.fullname,
                email: data.email,
                phone: data.phone,
                step: 2
            } 
        });
        navigate('/step2', { replace: true });
    };

    return (
        <div className='container px-20 py-20 mx-auto flex bg-gray-600'>
            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>Step 1</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='relative mb-4'>
                        <label className="leading-7 text-sm text-gray-600">Full Name:</label>
                        <input {...register("fullname", { required: true })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        {errors.fullname && <span className='text-sm text-red-600 leading-8'>This field is required</span>}
                    </div>
                    <div className='relative mb-4'>
                        <label className="leading-7 text-sm text-gray-600">Email:</label>
                        <input {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        {errors.email && <span className='text-sm text-red-600 leading-8'>This field is required and must be a valid email</span>}
                    </div>
                    <div className='relative mb-4'>
                        <label className="leading-7 text-sm text-gray-600">Phone:</label>
                        <input {...register("phone", { required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        {errors.phone && <span className='text-sm text-red-600 leading-8'>This field is required and must be a valid phone</span>}<br/>
                    </div>
                    <input type="submit" value="Submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" />
                </form>
            </div>
        </div>
    );
}