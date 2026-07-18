import Breadcrumb from "../../component/Breadcrumb";
import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import AudienceModal from "../../component/AudienceModal";

const CreateNotices = () => {

  const location = useLocation();
const { setNotices,getStatusStyle } = useApp();
  const navigate = useNavigate();

  const duplicateNotice = location.state?.duplicateNotice;
  const editNotice = location.state?.editNotice;
  
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({});
  const [audience, setAudience] = useState("");
  const [selectedTowers, setSelectedTowers] = useState([]);
  const [selectedFlats, setSelectedFlats] = useState([]);
  const [showAudienceModal, setShowAudienceModal] = useState(false);

  const [publishOption, setPublishOption] = useState("now"); // now | schedule | draft

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const [publishOn, setPublishOn] = useState(getCurrentDateTime());
  const [expiryDate, setExpiryDate] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  //validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!category) {
      newErrors.category = "Category is required";
    }

    if (!content || content === "<p><br></p>") {
      newErrors.content = "Notice content is required";
    }

    if (!audience) {
      newErrors.audience = "Please select audience";
    }

    if (publishOption === "schedule" && !publishOn) {
      newErrors.publishOn = "Publish date & time is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //save notice
  const saveNotice = async (option = publishOption) => {

    if (!validateForm()) return;

    let attachment = editNotice?.attachment || null;

    if (selectedFile instanceof File) {
      attachment = {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        data: await fileToBase64(selectedFile),
      };
    } else if (selectedFile) {
      attachment = selectedFile;
    }

    const publishDateObj = new Date(publishOn);
    const now = new Date();

    let finalStatus = "Draft";

    if (option === "now") {
      finalStatus = "Published";
    } else if (option === "schedule") {
      finalStatus = "Scheduled";
    } else if (option === "draft") {
      finalStatus = "Draft";
    }
    const newNotice = {
      id: Date.now(),
      title,
      category,
      priority,
      description: content,
      status: finalStatus,
      audience,
      selectedTowers,
      selectedFlats,

      publishDate: publishDateObj.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      publishTime: publishDateObj.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),

      createdAt: new Date().toISOString(),

      scheduledAt: publishDateObj.toISOString(),

      expiryAt: expiryDate
        ? new Date(expiryDate).toISOString()
        : null,

      author: {
        name: "Rahul Mehta",
        role: "Admin",
      },
      attachment,
    };

    if (editNotice) {
      setNotices((prev) => [
        { ...newNotice, id: editNotice.id },
        ...prev.filter((n) => n.id !== editNotice.id),
      ]);
    } else {
      setNotices((prev) => [newNotice, ...prev]);
    }

    navigate("/notices");
  };

  useEffect(() => {
    const noticeData = editNotice || duplicateNotice;
    console.log(noticeData);
    if (!noticeData) return;

    setTitle(noticeData.title || "");
    setCategory(noticeData.category || "");
    setStatus(noticeData.status || "Draft");
    setPriority(noticeData.priority || "");
    setContent(noticeData.description || "");
    setAudience(noticeData.audience || "");
    setSelectedTowers(noticeData.selectedTowers || []);
    setSelectedFlats(noticeData.selectedFlats || []);
    setSelectedTowers(noticeData.selectedTowers || []);
    setSelectedFlats(noticeData.selectedFlats || []);

    // Publish date load
    if (noticeData.createdAt) {
      const date = new Date(noticeData.createdAt);

      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

      setPublishOn(date.toISOString().slice(0, 16));
    }
    // Edit mode radio selection
    if (noticeData.status === "Draft") {
      setPublishOption("draft");
    }
    else if (noticeData.status === "Scheduled") {
      setPublishOption("schedule");
    }
    else {
      setPublishOption("now");
    }
    //  File load
    if (noticeData.attachment) {
      setSelectedFile(noticeData.attachment);
    } else {
      setSelectedFile(null);
    }

    if (quillRef.current) {
      quillRef.current.root.innerHTML = noticeData.description || "";
    }
  }, [editNotice, duplicateNotice]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });


  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: "Write your notice content here...",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link"],
          ["clean"],
        ],
      },
    });

    quill.root.style.minHeight = "200px";


    // Duplicate content load
    const noticeData = editNotice || duplicateNotice;

    if (noticeData?.description) {
      quill.root.innerHTML = noticeData.description;

      setContent(noticeData.description);

      const text = quill.getText().trim();
      setCharCount(text.length);
    }


    quill.on("text-change", () => {
      const html = quill.root.innerHTML;

      setContent(html);

      const text = quill.getText().trim();
      setCharCount(text.length);

      setErrors((prev) => ({
        ...prev,
        content: "",
      }));
    });


    quillRef.current = quill;

  }, [editNotice, duplicateNotice]);


  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Notices", path: "/notices" },
          { label: "Create New Notice" }
        ]}
      />

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          <h1 className="text-3xl font-bold">
            {editNotice
              ? "Edit Notice"
              : duplicateNotice
                ? "Duplicate Notice"
                : "Create New Notice"}
          </h1>
        </h1>
        <p className="text-gray-500 mt-1">
          Create and publish a new notice for society members.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Form */}
        <div className="xl:col-span-2 bg-white rounded-xl border p-6 space-y-6">

          {/* Title */}
          <div>
            <label className="font-medium">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: "" });
              }}
              placeholder="Enter notice title (e.g., Water Supply Interruption)"
              className={`w-full mt-2 px-4 py-3 rounded-lg outline-none ${errors.title
                ? "border border-red-500"
                : "border focus:ring-2 focus:ring-blue-500"
                }`}
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category + Priority */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors({ ...errors, category: "" });
                }}
                className={`w-full mt-2 px-4 py-3 rounded-lg ${errors.category ? "border border-red-500" : "border"
                  }`}
              >
                <option value="">Select Category</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Event">Event</option>
                <option value="Emergency">Emergency</option>
                <option value="General">General</option>
                <option value="Meeting">Meeting</option>
                <option value="Parking">Parking</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Priority</label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full mt-2 border rounded-lg px-4 py-3"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

          </div>

          {/* Notice Content */}
          <div>
            <label className="block font-medium mb-2">
              Notice Content <span className="text-red-500">*</span>
            </label>

            <div ref={editorRef} />
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs ${charCount >= 2000 ? "text-red-500" : "text-gray-500"
                  }`}
              >
                {charCount}/2000 characters
              </span>

            </div>
            {errors.content && (
              <p className="text-red-500 text-sm ">
                {errors.content}
              </p>
            )}
          </div>
          {/* Upload */}
          {/* Attach Files */}
          <div>
            <label className="font-medium">
              Attach Files (Optional)
            </label>

            <label className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
              <i className="bi bi-cloud-arrow-up text-4xl text-blue-600"></i>

              <p className="mt-3 font-medium text-gray-700">
                Click to upload or drag & drop
              </p>

              <p className="text-sm text-gray-500 mt-1">
                PDF, DOC, DOCX, JPG, PNG (Max 10 MB)
              </p>

              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>

            {selectedFile && (
              <div className="mt-4 flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  <i className="bi bi-file-earmark-text text-xl text-blue-600"></i>

                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedFile?.size
                        ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                        : ""}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="bi bi-trash text-lg"></i>
                </button>
              </div>
            )}
          </div>

          {/* Audience + Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Audience */}
            <div>
              <label className="font-medium">
                Audience <span className="text-red-500">*</span>
              </label>

              <div className="mt-4 space-y-4">

                {/* All Residents */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="audience"
                    value="all"
                    checked={audience === "all"}
                    onChange={(e) => {
                      setAudience(e.target.value);
                      setSelectedTowers([]);
                      setSelectedFlats([]);
                      setErrors({ ...errors, audience: "" });
                    }}
                  />

                  <div>
                    <p className="font-medium">All Residents</p>
                    <p className="text-sm text-gray-500">
                      Visible to all residents
                    </p>
                  </div>
                </label>


                {/* Tower */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="audience"
                    value="tower"
                    checked={audience === "tower"}
                    onChange={(e) => {
                      setAudience(e.target.value);
                      setSelectedFlats([]);
                      setErrors({ ...errors, audience: "" });
                      setShowAudienceModal(true);
                    }}
                  />

                  <div>
                    <p className="font-medium">
                      Specific Towers / Blocks
                    </p>

                    <p className="text-sm text-gray-500">
                      Select specific towers or blocks
                    </p>
                  </div>
                </label>


                {/* Flat */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="audience"
                    value="flat"
                    checked={audience === "flat"}
                    onChange={(e) => {
                      setAudience(e.target.value);
                      setSelectedTowers([]);
                      setErrors({ ...errors, audience: "" });
                      setShowAudienceModal(true);
                    }}
                  />

                  <div>
                    <p className="font-medium">
                      Specific Flats
                    </p>

                    <p className="text-sm text-gray-500">
                      Select specific flats
                    </p>
                  </div>
                </label>

              </div>


              {errors.audience && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.audience}
                </p>
              )}


              {/* Selected value show */}

              {audience === "tower" && (
                <button
                  type="button"
                  onClick={() => setShowAudienceModal(true)}
                  className="text-sm text-blue-600 mt-2 hover:underline"
                >
                  {selectedTowers.length > 0
                    ? `${selectedTowers.length} Tower Selected`
                    : "Select Towers"}
                </button>
              )}


              {audience === "flat" && (
                <button
                  type="button"
                  onClick={() => setShowAudienceModal(true)}
                  className="text-sm text-blue-600 mt-2 hover:underline"
                >
                  {selectedFlats.length > 0
                    ? `${selectedFlats.length} Flat Selected`
                    : "Select Flats"}
                </button>
              )}

            </div>
            {/* Publish & Expiry */}


            <div className="space-y-6">

              {/* Publish Now */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <i className="bi bi-send"></i>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Publish Now
                    </h4>
                    <p className="text-sm text-gray-500">
                      Make this notice visible immediately
                    </p>
                  </div>
                </div>

                <input
                  type="radio"
                  name="publishOption"
                  checked={publishOption === "now"}
                  onChange={() => setPublishOption("now")}
                  className="w-5 h-5 accent-blue-600"
                />
              </label>



              {/* Schedule */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <i className="bi bi-clock"></i>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Schedule for Later
                    </h4>
                    <p className="text-sm text-gray-500">
                      Choose when this notice should be published
                    </p>
                  </div>
                </div>

                <input
                  type="radio"
                  name="publishOption"
                  checked={publishOption === "schedule"}
                  onChange={() => setPublishOption("schedule")}
                  className="w-5 h-5 accent-blue-600"
                />
              </label>



              {publishOption === "schedule" && (
                <>
                  <div>
                    <label className="font-medium">
                      Publish On <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="datetime-local"
                      value={publishOn}
                      onChange={(e) => {
                        setPublishOn(e.target.value);
                        setErrors({ ...errors, publishOn: "" });
                      }}
                      className={`w-full mt-2 px-4 py-3 rounded-lg ${errors.publishOn ? "border border-red-500" : "border"
                        }`}
                    />

                    {errors.publishOn && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.publishOn}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium">
                      Expiry Date (Optional)
                    </label>

                    <input
                      type="datetime-local"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full mt-2 border rounded-lg px-4 py-3"
                    />
                  </div>
                </>
              )}

            </div>

          </div>
          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            <button
              onClick={() => saveNotice(publishOption)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              <i className="bi bi-send"></i> Publish Notice
            </button>

            <button
              onClick={() => saveNotice("draft")}
              className="border px-6 py-3 rounded-lg"
            >
              <i className="bi bi-floppy"></i> Save as Draft
            </button>

            <button
              onClick={() => navigate("/notices")}
              className="px-6 py-3"
            >
              Cancel
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-6">

          {/* Preview */}
          <div className="bg-white border rounded-2xl shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4">Notice Preview</h2>

            <div className="border rounded-xl p-5">

              {/* Badge */}
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-md">
                NOTICE
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mt-4">
                {title || "Notice Title Will Appear Here"}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                <i className="bi bi-calendar-event"></i>
                <span>
                  {new Date(publishOn).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  {" , "}
                  {new Date(publishOn).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

              {/* Category */}
              <div className="mt-4">
                <span
  className={`inline-block text-xs font-medium px-3 py-1 rounded-md ${getStatusStyle(
    category
  )}`}
>
  {category || "Category Name"}
</span>
              </div>

              <hr className="my-5" />

              {/* Content */}
              <div
                className="text-gray-600 text-sm leading-7 min-h-[120px]"
                dangerouslySetInnerHTML={{
                  __html: content || "<p>Notice content will appear here...</p>",
                }}
              />

              <hr className="my-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="bi bi-person-fill text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Rahul Mehta
                  </h4>

                  <p className="text-sm text-gray-500">
                    Admin
                  </p>
                </div>
              </div>

            </div>
          </div>



        </div>

      </div>
      <AudienceModal
        show={showAudienceModal}
        onClose={() => setShowAudienceModal(false)}
        audience={audience}
        setAudience={setAudience}
        selectedTowers={selectedTowers}
        setSelectedTowers={setSelectedTowers}
        selectedFlats={selectedFlats}
        setSelectedFlats={setSelectedFlats}
      />
    </div>
  );
};

export default CreateNotices;