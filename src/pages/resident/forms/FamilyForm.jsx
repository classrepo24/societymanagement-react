import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addFamily } from '../store/familySlice';


export const FamilyForm = ({
    residentData,
    setResidentData,
}) => {
    const dispatch = useDispatch();
    const [family, setFamily] = useState({
        name: "",
        relation: "",
        age: "",
        gender: "",
        mobileNum: "",
    });
    const addFamilyMember = () => {
        const updatedFamily = [
            ...residentData.family,
            {
                id: Date.now(),
                ...family,
            },
        ];

        setResidentData({
            ...residentData,
            family: updatedFamily,
        });

        console.log(updatedFamily);

        setFamily({
            name: "",
            relation: "",
            age: "",
            gender: "",
            mobileNum: "",
        });
    };

    const handleChange = (e) => {
        setFamily({
            ...family,
            [e.target.name]: e.target.value,
        });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     dispatch(addFamily({
    //         id: Date.now(),
    //         ...family,
    //     }));

    //     setFamily({
    //         fullName: "",
    //         relation: "",
    //         age: "",
    //         mobileNum: "",
    //         gender: "",
    //     });
    // };
    const inputClass =
        "w-full h-[45px] px-3 border border-gray-300 rounded-md";
    return (
        <div className="w-full bg-white p-6 ">
            <div className="w-full bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
                    Family Members
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* Full Name */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Full Name 
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={family.name}
                            onChange={handleChange}
                            className={inputClass}
                            
                        />
                    </div>

                    {/* Relation */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Relation 
                        </label>
                        <input
                            type="text"
                            name="relation"
                            value={family.relation}
                            onChange={handleChange}
                            className={inputClass}
            
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Age 
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={family.age}
                            onChange={handleChange}
                            className={inputClass}
                            
                        />
                    </div>

                    {/* Flat Number */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Gender 
                        </label>
                        <select name="gender"
                            value={family.gender}
                            onChange={handleChange}
                            className={inputClass}
                             >
                            <option value="">Select Relation</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="transgender">Transgender</option>
                        </select>
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Mobile Number 
                        </label>
                        <input
                            type="tele"
                            name="mobileNum"
                            value={family.mobileNum}
                            onChange={handleChange}
                            className={inputClass}
                            
                        />
                    </div>


                    {/* Button */}
                    <div className="lg:col-span-3 mt-4">
                        <button
                            type="button"
                            onClick={addFamilyMember}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                        >
                            Add Family
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
