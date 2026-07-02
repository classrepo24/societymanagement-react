import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addNotes } from '../../../store/residentStore/notesSlice';

export const NotesForm = ({
  residentData,
  setResidentData,
}) => {
  const dispatch = useDispatch();

  // const [notes, setNotes] = useState({
  //   notes: "",
  // });

  const handleChange = (e) => {
  setResidentData({
    ...residentData,
    notes: e.target.value,
  });
};
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     addNotes({
  //       id: Date.now(),
  //       notes: residentData.notes,
  //     })
  //   );

  //   setResidentData({
  //     notes: "",
  //   });
  // };


  return (
    <div className="w-full bg-white p-6">
            <div className="w-full bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
                    Additional Notes
                </h2>

      <div
        // onSubmit={handleSubmit}
        className="bg-white p-6 space-y-4"
      >
        {/* Textarea */}
        <textarea
          name="notes"
          value={residentData.notes || ""}
          onChange={handleChange}
          placeholder="Enter Additional Notes..."
          className="w-full h-[120px] border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Button aligned right */}
        {/* <div className="lg:col-span-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Add Notes
          </button>
        </div> */}
      </div>
    </div>
    </div>
  )
}
