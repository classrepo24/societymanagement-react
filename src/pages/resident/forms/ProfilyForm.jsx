import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addResident } from '../../../store/residentStore/residentSlice';

export const ProfilyForm = ({
    residentData,
    setResidentData,
    preview,
    setPreview,
}) => {
    const dispatch = useDispatch();
    const [resident, setResident] = useState({
        profileImage: "",
        fullName: "",
        email: "",
        mobile: "",
        flatNumber: "",
        residentType: "",
        moveInDate: "",
        towerWing: "",
        floor: "",
        societyName: "",
        registrationDate: "",
    });
    const [image, setImage] = useState(null);
    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);

            setPreview(imageUrl);

            setResidentData({
                ...residentData,
                profile: {
                    ...residentData.profile,
                    profileImage: imageUrl,
                },
            });
        }
    };
    const handleChange = (e) => {
        setResidentData({
            ...residentData,
            profile: {
                ...residentData.profile,
                [e.target.name]: e.target.value,
            },
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addResident({
            id: Date.now(),
            ...residentData,
            image: preview,
        }));

        setResidentData({
            profileImage: "",
            fullName: "",
            email: "",
            mobile: "",
            flatNumber: "",
            residentType: "",
            moveInDate: "",
            towerWing: "",
            floor: "",
            societyName: "",
            registrationDate: "",
        });
        setImage(null);
        setPreview("");
    };
    const inputClass =
        "w-full h-[45px] px-3 border border-gray-300 rounded-md"
    return (
        <div className="w-full bg-white p-6">
            <div className="w-full bg-white rounded-xl shadow-sm p-4 md:p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
                    Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="col-span-3 flex flex-col items-center justify-center mb-8">
                        <label
                            htmlFor="profileImage"
                            className="cursor-pointer"
                        >
                            <div className="w-32 h-32 border-2 border-dashed border-gray-400 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm text-center">
                                        Click To
                                        <br />
                                        Upload
                                    </span>
                                )}
                            </div>
                        </label>

                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="hidden"
                        />

                        <p className="mt-3 text-sm text-gray-600">
                            Profile Photo
                        </p>
                    </div>
                    {/* Full Name */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={residentData.profile.fullName || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={residentData.profile.email || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            value={residentData.profile.mobile || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Flat Number */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Flat Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="flatNumber"
                            value={residentData.profile.flatNumber || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Resident Type */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Resident Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="residentType"
                            value={residentData.profile.residentType || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Owner">Owner</option>
                            <option value="Tenant">Tenant</option>
                        </select>
                    </div>

                    {/* Move In Date */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Move In Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="moveInDate"
                            value={residentData.profile.moveInDate || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Tower/Wing */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Tower / Wing <span className="text-red-500">*</span>
                        </label>
                        <select
                            type="text"
                            name="towerWing"
                            value={residentData.profile.towerWing || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select Tower</option>
                            <option value="A">Tower A</option>
                            <option value="B">Tower B</option>
                            <option value="C">Tower C</option>
                        </select>
                    </div>

                    {/* Floor */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Floor <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="floor"
                            value={residentData.profile.floor || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Society Name */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Society Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="societyName"
                            value={residentData.profile.societyName || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Registration Date */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Registration Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="registrationDate"
                            value={residentData.profile.registrationDate || ""}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
