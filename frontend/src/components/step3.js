import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ACTIONS, UserContext } from "../context";
import { useForm } from "react-hook-form";

export default function Step3() {
    const navigate  = useNavigate();
    const { state,  dispatch } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {    
        await dispatch({ type: ACTIONS.UPDATE_INFOS, payload: {
                fundingAmount: data.fundingAmount,
                step: 1
            } 
        });
        if (parseInt(state.fundingAmount) < 25000 || parseInt(state.yearlyRevenue) < 50000) {
            await dispatch({ type: ACTIONS.RESET_INFOS });
            await navigate('/failure', { replace: true });
        } else {
            await dispatch({ type: ACTIONS.SAVE_INFOS, payload: {
                    fullname: state.fullname,
                    email: state.email,
                    phone: state.phone,
                    yearlyRevenue: state.yearlyRevenue,
                    fundingAmount: state.fundingAmount
                } 
            });
            await dispatch({ type: ACTIONS.RESET_INFOS });
            await navigate('/success', { replace: true });
        }
    };

    return (
        <div className='container px-20 py-20 mx-auto flex bg-gray-600'>
            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>Step 3</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='relative mb-4'>
                    <label className="leading-7 text-sm text-gray-600">Funding Amount Requested:</label>
                    <input {...register("fundingAmount", { required: true, pattern: /^\d*$/ })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                    {errors.fundingAmount && <span className='text-sm text-red-600 leading-8'>This field is required and must be in digits</span>}    
                </div>
                <input type="submit" value="Submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" />
            </form>
            </div>
        </div>
    );
}