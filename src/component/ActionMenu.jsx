import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ActionMenu = ({
  isOpen,
  onToggle,
  onClose,

  onView,
  onDelete,
  onEdit,

  editOnly = false,
  showDelete = true,
  payrollMenu = false,


}) => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  useEffect(() => {
  if (isOpen && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();

    const actualMenuHeight =
      menuRef.current?.offsetHeight ||
      (payrollMenu ? 100 : editOnly ? 110 : 160);

    const spaceBelow = window.innerHeight - rect.bottom;

    let topPosition;

    if (spaceBelow >= actualMenuHeight + 10) {
      // Open below
      topPosition = rect.bottom + 8;
    } else {
      // Open above
      topPosition = rect.top - actualMenuHeight - 8;
    }

    if (topPosition < 10) topPosition = 10;

    setPosition({
      top: topPosition,
      right: window.innerWidth - rect.right,
    });
  }
}, [isOpen, editOnly, payrollMenu]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [onClose]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="border rounded-md p-2 hover:bg-gray-100"
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>

      {isOpen &&
        createPortal(

          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: position.top,
              right: position.right,
              zIndex: 99999,
            }}
            className="w-48 bg-white rounded-xl shadow-xl border overflow-hidden"
          >
            {payrollMenu ? (
              <>
                <button
                  onClick={() => {
                    onView?.();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                >
                  <i className="bi bi-receipt text-blue-600"></i>
                  View Payslip
                </button>

                
              </>
            ) : (
              <>
                {!editOnly && (
                  <button
                    onClick={() => {
                      onView?.();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    <i className="bi bi-eye text-blue-600"></i>
                    View Profile
                  </button>
                )}

                <button
                  onClick={() => {
                    onEdit?.();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                >
                  <i className="bi bi-pencil-square text-yellow-600"></i>
                  Edit
                </button>

                {showDelete && (
                  <button
                    onClick={() => {
                      onDelete?.();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-left"
                  >
                    <i className="bi bi-trash"></i>
                    Delete
                  </button>

                )}
              </>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default ActionMenu;