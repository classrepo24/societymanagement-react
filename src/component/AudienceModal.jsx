import React from "react";
import audienceData from "../data/audience.json";

const AudienceModal = ({
    show,
    onClose,
    audience,
    selectedTowers,
    setSelectedTowers,
    selectedFlats,
    setSelectedFlats,
}) => {

    if (!show) return null;

    const handleFlatSelect = (name) => {
        setSelectedFlats((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name]
        );
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[450px] rounded-xl p-6 shadow-lg">


                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-semibold">
                        {
                            audience === "tower"
                                ? "Select Towers"
                                : "Select Flats"
                        }
                    </h2>


                    <button
                        onClick={onClose}
                        className="text-gray-500 text-xl"
                    >
                        ✕
                    </button>

                </div>



                {/* Tower Checkbox */}

                {
                    audience === "tower" && (

                        <div className="space-y-3">

                            {
                                audienceData.towers.map((tower) => (

                                    <label
                                        key={tower.id}
                                        className="flex items-center gap-3"
                                    >

                                        <input
                                            type="checkbox"
                                            value={tower.name}
                                            checked={selectedTowers.includes(tower.name)}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                setSelectedTowers((prev) =>
                                                    prev.includes(value)
                                                        ? prev.filter((item) => item !== value)
                                                        : [...prev, value]
                                                );
                                            }}
                                        />

                                        <span>
                                            {tower.name}
                                        </span>

                                    </label>

                                ))
                            }

                        </div>

                    )
                }




                {/* Flat Checkbox */}

                {
                    audience === "flat" && (

                        <div className="grid grid-cols-2 gap-3">

                            {
                                audienceData.flats.map((flat) => (

                                    <label
                                        key={flat.id}
                                        className="flex items-center gap-2"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedFlats.includes(flat.name)
                                            }
                                            onChange={() =>
                                                handleFlatSelect(flat.name)
                                            }
                                        />

                                        {flat.name}

                                    </label>

                                ))
                            }

                        </div>

                    )
                }



                <button
                    onClick={onClose}
                    className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg w-full"
                >
                    Done
                </button>


            </div>

        </div>
    );
};

export default AudienceModal;