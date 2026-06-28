import React, {useState} from "react";
import { useNavigate } from "react-router-dom";



const RaiseComplaint = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
const [priority, setPriority] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [flat, setFlat] = useState("");
const [errors, setErrors] = useState({});
const [success, setSuccess] = useState(false);

  const [attachments, setAttachments] = useState([]);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const uploadedFiles = files.map((file) => ({
    file,
    preview: file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null,
  }));

  setAttachments((prev) => [...prev, ...uploadedFiles]);
};

const removeAttachment = (index) => {
  setAttachments((prev) => prev.filter((_, i) => i !== index));
};
const handleSubmit = () => {
  let newErrors = {};

  if (!category) newErrors.category = "Please select category";
  if (!priority) newErrors.priority = "Please select priority";
  if (!title.trim()) newErrors.title = "Please enter title";
  if (!description.trim())
    newErrors.description = "Please enter description";
  if (!flat) newErrors.flat = "Please select flat";

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }
};
  return (
    <div className="min-h-screen bg-[#f7f9fd] p-6">
    

      {/* Heading */}
      <h1 className="text-[33px] font-bold text-[#0f172a]">
        Raise New Complaint
      </h1>

      <p className="text-[#64748b] mt-1 mb-6">
        Provide details about the issue you are facing.
      </p>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}
        <div className="col-span-9">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6">
            {/* SECTION 1 */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white text-sm flex items-center justify-center font-medium">
                1
              </div>
              <h3 className="font-semibold text-[#0f172a]">
                Complaint Details
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-medium">
                  Complaint Category *
                </label>

               <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className={`w-full mt-2 h-12 rounded-lg px-4 outline-none border ${
    errors.category ? "border-red-500" : "border-[#dbe2ef]"
  }`}
>
  {errors.category && (
  <p className="text-red-500 text-xs mt-1">
    {errors.category}
  </p>
)}
  <option value="">Select Category</option>
  <option value="plumbing">Plumbing</option>
  <option value="electrical">Electrical</option>
  <option value="water-leakage">Water Leakage</option>
  <option value="cleaning">Cleaning & Housekeeping</option>
  <option value="security">Security</option>
  <option value="lift">Lift / Elevator</option>
  <option value="parking">Parking</option>
  <option value="gardening">Gardening</option>
  <option value="common-area">Common Area Maintenance</option>
  <option value="street-light">Street Light</option>
  <option value="waste-management">Waste Management</option>
  <option value="pest-control">Pest Control</option>
  <option value="amenities">Amenities</option>
  <option value="noise">Noise Complaint</option>
  <option value="other">Other</option>
</select>
</div>
              <div>
                <label className="text-sm font-medium">
                  Sub Category (Optional)
                </label>

                <select className="w-full mt-2 h-12 border border-[#dbe2ef] rounded-lg px-4 outline-none">
  <option value="">Select Sub Category</option>

  {/* Plumbing */}
  <option value="tap-leakage">Tap Leakage</option>
  <option value="pipe-leakage">Pipe Leakage</option>
  <option value="blocked-drain">Blocked Drain</option>
  <option value="low-water-pressure">Low Water Pressure</option>
  <option value="water-supply">Water Supply Issue</option>

  {/* Electrical */}
  <option value="power-failure">Power Failure</option>
  <option value="switch-board">Switch Board Issue</option>
  <option value="light-not-working">Light Not Working</option>
  <option value="wiring">Wiring Problem</option>

  {/* Lift */}
  <option value="lift-not-working">Lift Not Working</option>
  <option value="lift-noise">Lift Noise</option>
  <option value="lift-cleanliness">Lift Cleanliness</option>

  {/* Security */}
  <option value="visitor-issue">Visitor Issue</option>
  <option value="security-staff">Security Staff Complaint</option>
  <option value="gate-access">Gate Access Problem</option>

  {/* Parking */}
  <option value="parking-allocation">Parking Allocation</option>
  <option value="unauthorized-parking">Unauthorized Parking</option>
  <option value="parking-cleanliness">Parking Area Cleaning</option>

  {/* Cleaning */}
  <option value="garbage-collection">Garbage Collection</option>
  <option value="common-area-cleaning">Common Area Cleaning</option>
  <option value="washroom-cleaning">Washroom Cleaning</option>

  {/* Other */}
  <option value="other">Other</option>
</select>
</div>

              <div>
  <label className="text-sm font-medium">Priority *</label>

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className={`w-full mt-2 h-12 rounded-lg px-4 outline-none border ${
      errors.priority ? "border-red-500" : "border-[#dbe2ef]"
    }`}
  >
    <option value="">Select Priority</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
    <option value="urgent">Urgent</option>
  </select>

  {errors.priority && (
    <p className="text-red-500 text-xs mt-1">
      {errors.priority}
    </p>
  )}
</div>
</div>
            

            <div className="mt-5">
              <label className="text-sm font-medium">
                Title / Subject *
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Enter a short title for your complaint"
                className={`w-full mt-2 h-12 rounded-lg px-4 outline-none border ${errors.title ? "border-red-500" : "border-[#dbe2ef]"
                  }`}
              />

              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title}
                </p>
              )}
            </div>

       <div className="mt-5">
  <label className="text-sm font-medium">
    Description *
  </label>

  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows="5"
    placeholder="Please describe the issue in detail..."
    className={`w-full mt-2 rounded-lg p-4 outline-none resize-none border ${
      errors.description ? "border-red-500" : "border-[#dbe2ef]"
    }`}
  ></textarea>

  {errors.description && (
    <p className="text-red-500 text-xs mt-1">
      {errors.description}
    </p>
  )}

  <div className="text-right text-xs text-[#64748b]">
    {description.length}/1000
  </div>
</div>

            {/* SECTION 2 */}
            <div className="flex items-center gap-3 mt-8 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white text-sm flex items-center justify-center font-medium">
                2
              </div>

              <h3 className="font-semibold text-[#0f172a]">
                Location Details
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div>
  <label className="text-sm font-medium">
    Flat / Unit *
  </label>

  <select
    value={flat}
    onChange={(e) => setFlat(e.target.value)}
    className={`w-full mt-2 h-12 rounded-lg px-4 border ${
      errors.flat ? "border-red-500" : "border-[#dbe2ef]"
    }`}
  >
    <option value="">Select Flat / Unit</option>

    <option value="A-101">A-101</option>
    <option value="A-102">A-102</option>
    <option value="A-103">A-103</option>
    <option value="A-104">A-104</option>

    <option value="B-101">B-101</option>
    <option value="B-102">B-102</option>
    <option value="B-103">B-103</option>
    <option value="B-104">B-104</option>

    <option value="C-101">C-101</option>
    <option value="C-102">C-102</option>
    <option value="C-103">C-103</option>
    <option value="C-104">C-104</option>

    <option value="D-101">D-101</option>
    <option value="D-102">D-102</option>
    <option value="D-103">D-103</option>
    <option value="D-104">D-104</option>
  </select>

  {errors.flat && (
    <p className="text-red-500 text-xs mt-1">
      {errors.flat}
    </p>
  )}
</div>

              <div>
                <label className="text-sm font-medium">
                  Area / Landmark (Optional)
                </label>

                <input
                  type="text"
                  placeholder="E.g. Kitchen, Bathroom, Parking Area"
                  className="w-full mt-2 h-12 border border-[#dbe2ef] rounded-lg px-4"
                />
              </div>
            </div>



            {/* SECTION 3 */}
            <div className="flex items-center gap-3 mt-8 mb-5">
  <div className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white text-sm flex items-center justify-center font-medium">
    3
  </div>

  <h3 className="font-semibold text-[#0f172a]">
    Add Attachments (Optional)
  </h3>
</div>

<div className="relative border border-dashed border-[#cbd5e1] rounded-xl h-40 flex flex-col items-center justify-center hover:bg-gray-50 transition">
  <input
    type="file"
    multiple
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={handleFileChange}
    className="absolute inset-0 opacity-0 cursor-pointer"
  />

  <i className="bi bi-cloud-upload text-3xl text-[#1d4ed8]"></i>

  <p className="font-medium mt-3">
    Drag and drop files here or click to upload
  </p>

  <p className="text-sm text-[#64748b]">
    JPG, PNG, PDF up to 5MB each
  </p>
</div>

{attachments.length > 0 && (
  <div className="flex flex-wrap gap-4 mt-4">
    {attachments.map((item, index) => (
      <div
        key={index}
        className="w-44 border border-[#e5e7eb] rounded-lg p-2 flex gap-2 relative bg-white"
      >
        <button
          type="button"
          onClick={() => removeAttachment(index)}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
        >
          ×
        </button>

        {item.preview ? (
          <img
            src={item.preview}
            alt="preview"
            className="w-12 h-12 rounded object-cover border"
          />
        ) : (
          <div className="w-12 h-12 rounded bg-red-100 flex items-center justify-center">
            <i className="bi bi-file-earmark-pdf text-red-600"></i>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-medium truncate">
            {item.file.name}
          </p>

          <p className="text-xs text-[#64748b]">
            {(item.file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>
    ))}
  </div>
)}

            {/* SECTION 4 */}
            <div className="flex items-center gap-3 mt-8 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white text-sm flex items-center justify-center font-medium">
                4
              </div>

              <h3 className="font-semibold text-[#0f172a]">
                Preferred Time (Optional)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">
                  Preferred Date
                </label>

                <input
                  type="date"
                  className="w-full mt-2 h-12 border border-[#dbe2ef] rounded-lg px-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Preferred Time
                </label>

                <input
                  type="time"
                  className="w-full mt-2 h-12 border border-[#dbe2ef] rounded-lg px-4"
                />
              </div>
            </div>

            {/* BUTTONS */}
          <div className="flex justify-between mt-10 border-t pt-5">
  <button
    onClick={() => navigate("/complaints")}
    className="px-6 h-11 border border-[#dbe2ef] rounded-lg font-medium"
  >
    Cancel
  </button>

  <button
    onClick={handleSubmit}
    className="px-8 h-11 bg-[#2563eb] text-white rounded-lg font-medium flex items-center gap-2"
  >
    <i className="bi bi-send"></i>
    Submit Complaint
  </button>
</div>

{success && (
  <div className="mt-4 p-3 rounded-lg bg-green-100 text-green-700">
    Complaint Submitted Successfully!
  </div>
)}

            </div>
          </div>
        

        {/* RIGHT */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#eef4ff] rounded-full flex items-center justify-center">
                <i className="bi bi-lightbulb text-[#2563eb]"></i>
              </div>

              <h3 className="font-bold text-lg">Guidelines</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#eef4ff] rounded-lg flex items-center justify-center">
                  <i className="bi bi-file-earmark-text"></i>
                </div>

                <div>
                  <p className="font-medium text-sm">
                    Provide clear and accurate details
                  </p>

                  <p className="text-xs text-[#64748b]">
                    Helps resolve issues faster.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#eef4ff] rounded-lg flex items-center justify-center">
                  <i className="bi bi-images"></i>
                </div>

                <div>
                  <p className="font-medium text-sm">
                    Add photos or documents
                  </p>

                  <p className="text-xs text-[#64748b]">
                    Attachments help identify issues.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#eef4ff] rounded-lg flex items-center justify-center">
                  <i className="bi bi-clipboard-check"></i>
                </div>

                <div>
                  <p className="font-medium text-sm">
                    Track your complaint
                  </p>

                  <p className="text-xs text-[#64748b]">
                    Get notified on updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#eef4ff] rounded-lg flex items-center justify-center">
                  <i className="bi bi-bullseye"></i>
                </div>

                <div>
                  <p className="font-medium text-sm">
                    Be respectful
                  </p>

                  <p className="text-xs text-[#64748b]">
                    Please be polite and cooperative.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#fdecec] rounded-full flex items-center justify-center">
                <i className="bi bi-telephone text-red-500"></i>
              </div>

              <h3 className="font-bold text-lg">
                Need Immediate Help?
              </h3>
            </div>

            <hr className="mb-5" />

            <p className="text-[#64748b] text-sm mb-4">
              For urgent issues, please contact
            </p>

            <p className="font-semibold">
              Security / Maintenance Team
            </p>

            <p className="text-[#2563eb] font-bold mt-3">
              +91 121212121212
            </p>

            <p className="text-sm text-[#64748b] mt-4">
              Available 24 x 7
            </p>
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default RaiseComplaint;